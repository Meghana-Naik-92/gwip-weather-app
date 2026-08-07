package com.weather.gwip.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WeatherResponseDTO {

    private String cityName;
    private BigDecimal temperature;
    private String weatherCondition;
    private String description;
    private BigDecimal humidity;
    private BigDecimal windSpeed;
}
