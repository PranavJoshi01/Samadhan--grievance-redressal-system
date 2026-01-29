package com.samadhan.auth.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.samadhan.auth.dto.AuthResponse;
import com.samadhan.auth.dto.LoginRequest;
import com.samadhan.auth.dto.RegisterRequest;
import com.samadhan.auth.entity.User;
import com.samadhan.auth.service.AuthService;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/authorities")
    public ResponseEntity<List<User>> getAllAuthorities() {
        return ResponseEntity.ok(authService.getAllAuthorities());
    }
}
