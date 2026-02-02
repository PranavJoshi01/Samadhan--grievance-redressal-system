package com.samadhan.auth.controller;

import com.samadhan.auth.dto.AuthResponse;
import com.samadhan.auth.dto.LoginRequest;
import com.samadhan.auth.dto.RegisterRequest;
import com.samadhan.auth.entity.User;
import com.samadhan.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create-authority")
    public ResponseEntity<?> createAuthority(@RequestBody RegisterRequest request) {
        try {
            request.setRole("AUTHORITY");
            return ResponseEntity.ok(authService.register(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/authorities")
    public ResponseEntity<List<User>> getAllAuthorities() {
        return ResponseEntity.ok(authService.getAllAuthorities());
    }
}
