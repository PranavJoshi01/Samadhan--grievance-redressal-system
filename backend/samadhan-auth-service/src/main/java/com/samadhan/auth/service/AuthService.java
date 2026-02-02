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

    // ================= REGISTER USER / AUTHORITY =================
    public String register(RegisterRequest request) {

        if (request.getName() == null || request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Name, Email and Password are required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Role role;
        try {
            role = request.getRole() != null
                    ? Role.valueOf(request.getRole().toUpperCase())
                    : Role.USER;
        } catch (Exception e) {
            throw new RuntimeException("Invalid role provided");
        }

        if (role == Role.AUTHORITY) {
            if (request.getDeptId() == null || request.getDeptName() == null || request.getDeptName().isBlank()) {
                throw new RuntimeException("Department is required for Authority");
            }
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .deptId(role == Role.AUTHORITY ? request.getDeptId() : null)
                .deptName(role == Role.AUTHORITY ? request.getDeptName() : null)

               
                .phoneNumber(null)


                .build();

        userRepository.save(user);

        return role == Role.AUTHORITY
                ? "Authority created successfully"
                : "User registered successfully";
    }


    // ================= LOGIN =================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name(),
                user.getUserId(),
                user.getDeptId(),
                user.getDeptName()
        );

        return new AuthResponse(token, user.getRole().name(), user.getDeptId(), user.getDeptName());
    }

    // ================= GET ALL AUTHORITIES =================
    public List<User> getAllAuthorities() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.AUTHORITY)
                .collect(Collectors.toList());
    }
}
