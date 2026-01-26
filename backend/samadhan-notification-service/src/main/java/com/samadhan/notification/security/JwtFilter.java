package com.samadhan.notification.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // No Authorization header → skip JWT logic
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            // Extract email safely
            String email = jwtUtil.extractEmail(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                //  Validate token
                if (jwtUtil.validateToken(token)) {

                    String role = jwtUtil.extractRole(token);

                    System.out.println("JWT FILTER HIT");
                    System.out.println("Email: " + email);
                    System.out.println("Role from token: " + role);

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority("ROLE_" + role);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(authority)
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    System.out.println("Authorities set: "
                            + authToken.getAuthorities());
                }
            }

        } catch (Exception e) {
            // Don't let jwt error crash the app
            System.out.println(" JWT ERROR: " + e.getMessage());
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
