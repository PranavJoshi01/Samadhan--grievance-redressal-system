package com.samadhan.grievance_core_service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // PUBLIC (if any)
                .requestMatchers(HttpMethod.GET, "/category/**").permitAll()

                //  LOGGED-IN USERS (User + Admin + Authority)
                .requestMatchers(HttpMethod.GET, "/grievance/**").authenticated()

                //  ADMIN ONLY — MASTER DATA
                .requestMatchers("/category/**").hasRole("ADMIN")
                .requestMatchers("/department/**").hasRole("ADMIN")
                .requestMatchers("/authority/**").hasRole("ADMIN")
                .requestMatchers("/admin/**").hasRole("ADMIN")

                //  ADMIN ONLY — ASSIGN / STATUS UPDATE
                .requestMatchers(HttpMethod.PUT, "/grievance/*/assign").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/grievance/*/status").hasRole("ADMIN")

                // AUTHORITY ROLE — WORK ON ASSIGNED GRIEVANCES
                .requestMatchers("/authority/grievances/**").hasRole("AUTHORITY")

                //  EVERYTHING ELSE
                .anyRequest().authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

