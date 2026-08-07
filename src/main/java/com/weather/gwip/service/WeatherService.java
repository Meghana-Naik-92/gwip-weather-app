package com.weather.gwip.service;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.weather.gwip.dto.response.WeatherResponseDTO;
import com.weather.gwip.entity.SearchHistory;
import com.weather.gwip.entity.User;
import com.weather.gwip.repository.SearchHistoryRepository;
import com.weather.gwip.repository.UserRepository;

@Service
public class WeatherService {

    @Value("${weather.api.key:your_api_key_here}")
    private String apiKey;

    private static final String WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric";

    private final RestTemplate restTemplate;
    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    public WeatherService(RestTemplate restTemplate, SearchHistoryRepository searchHistoryRepository, UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.searchHistoryRepository = searchHistoryRepository;
        this.userRepository = userRepository;
    }

    public WeatherResponseDTO getWeatherForCity(String cityName, String username) {
        Map<String, Object> response;
        try {
            // FIX: Pass parameters via a Map so {city} and {key} bind correctly
            Map<String, String> uriParams = Map.of("city", cityName, "key", apiKey);

            response = restTemplate.getForObject(WEATHER_URL, Map.class, uriParams);

            // Optional debug log to check terminal output for each city search
            System.out.println("OWM API Response for " + cityName + ": " + response);

        } catch (Exception e) {
            throw new RuntimeException("Could not fetch weather for city: " + cityName, e);
        }

        if (response == null) {
            throw new RuntimeException("Weather service returned empty response");
        }

        Map<String, Object> main = (Map<String, Object>) response.get("main");
        java.util.List<Map<String, Object>> weatherList = (java.util.List<Map<String, Object>>) response.get("weather");
        Map<String, Object> wind = (Map<String, Object>) response.get("wind");

        BigDecimal temp = new BigDecimal(main.get("temp").toString());
        BigDecimal humidity = new BigDecimal(main.get("humidity").toString());
        BigDecimal windSpeed = new BigDecimal(wind.get("speed").toString());
        String condition = weatherList.get(0).get("main").toString();
        String description = weatherList.get(0).get("description").toString();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SearchHistory history = SearchHistory.builder()
                .user(user)
                .cityName(cityName)
                .temperature(temp)
                .weatherCondition(condition)
                .build();

        searchHistoryRepository.save(history);

        return WeatherResponseDTO.builder()
                .cityName(cityName)
                .temperature(temp)
                .weatherCondition(condition)
                .description(description)
                .humidity(humidity)
                .windSpeed(windSpeed)
                .build();
    }

    public Page<SearchHistory> getUserSearchHistory(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(user.getId(), pageable);
    }
}
