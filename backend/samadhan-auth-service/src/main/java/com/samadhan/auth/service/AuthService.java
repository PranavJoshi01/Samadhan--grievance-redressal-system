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

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Register new user
    public String register(RegisterRequest request) {

        // Determine role
        Role role = Role.USER; // Default role
        if (request.getRole() != null) {
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role: " + request.getRole());
            }
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .deptId(request.getDeptId())
                .deptName(request.getDeptName())
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

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(),user.getUserId(),user.getDeptId(), user.getDeptName());

        return new AuthResponse(token, user.getRole().name(), user.getDeptId(), user.getDeptName());
    }

    // Get all authorities
    public List<User> getAllAuthorities() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.AUTHORITY)
                .collect(Collectors.toList());
    }
}
