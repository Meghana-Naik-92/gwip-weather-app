package com.weather.gwip.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weather.gwip.dto.response.WeatherResponseDTO;
import com.weather.gwip.entity.SearchHistory;
import com.weather.gwip.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping({"", "/search"})
    public ResponseEntity<WeatherResponseDTO> getWeather(
            @RequestParam String city,
            @AuthenticationPrincipal UserDetails userDetails) {
        WeatherResponseDTO weather = weatherService.getWeatherForCity(city, userDetails.getUsername());
        return ResponseEntity.ok(weather);
    }

    @GetMapping("/history")
    public ResponseEntity<Page<SearchHistory>> getHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails userDetails) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SearchHistory> history = weatherService.getUserSearchHistory(userDetails.getUsername(), pageable);
        return ResponseEntity.ok(history);
    }
}
