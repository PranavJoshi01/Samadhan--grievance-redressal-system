package com.samadhan.auth.service;

import com.samadhan.auth.dto.AuthResponse;
import com.samadhan.auth.dto.LoginRequest;
import com.samadhan.auth.dto.RegisterRequest;
import com.samadhan.auth.entity.Role;
import com.samadhan.auth.entity.User;
import com.samadhan.auth.repository.UserRepository;
import com.samadhan.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Register new user
    public String register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return "User registered successfully";
    }

    // Login user
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(),user.getUserId());


        return new AuthResponse(token, user.getRole().name());
    }
}
