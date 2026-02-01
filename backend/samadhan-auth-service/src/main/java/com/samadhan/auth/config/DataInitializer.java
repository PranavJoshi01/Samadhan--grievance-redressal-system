package com.samadhan.auth.config;

import com.samadhan.auth.entity.Role;
import com.samadhan.auth.entity.User;
import com.samadhan.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@samadhan.com";

        // Check if admin already exists
        if (userRepository.findByEmail(adminEmail).isEmpty()) {

        	User admin = User.builder()
        	        .name("System Admin")
        	        .email("admin@samadhan.com")
        	        .password(passwordEncoder.encode("admin123"))
        	        .role(Role.ADMIN)
        	        .phoneNumber("9999999999")   // ✅ ADD THIS
        	        .build();


            userRepository.save(admin);

            System.out.println(" ADMIN user created successfully");
        } else {
            System.out.println(" ADMIN already exists");
        }
    }
}
