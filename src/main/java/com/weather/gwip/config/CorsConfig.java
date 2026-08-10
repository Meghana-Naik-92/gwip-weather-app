package com.weather.gwip.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow credentials (like Authorization headers with JWT tokens)
        config.setAllowCredentials(true);

        // Allow all origins (you can restrict this to your frontend URL later if needed)
        config.setAllowedOriginPatterns(Arrays.asList("*"));

        // Allow standard HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers (including Authorization)
        config.setAllowedHeaders(Arrays.asList("*"));

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
