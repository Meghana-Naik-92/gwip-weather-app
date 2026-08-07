package com.weather.gwip.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weather.gwip.dto.request.LoginRequest;
import com.weather.gwip.dto.request.RegisterRequest;
import com.weather.gwip.dto.response.AuthResponse;
import com.weather.gwip.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        System.out.println(">>> LOGIN ENDPOINT HIT FOR: " + request.getUsernameOrEmail()); // <--- Add this
        return ResponseEntity.ok(authService.login(request));
    }
}
