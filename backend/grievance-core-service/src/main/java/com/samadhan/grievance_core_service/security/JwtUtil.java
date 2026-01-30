package com.samadhan.grievance_core_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    // 🔐 SAME SECRET as Auth service
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ EXTRACT EMAIL (stored as subject in JWT)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ EXTRACT USER ID
    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    // ✅ EXTRACT ROLE
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public Long extractDeptId(String token) {
        return extractAllClaims(token).get("deptId", Long.class);
    }

    // 🔹 Validate token
    public boolean isTokenValid(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }


    // 🔹 Check expiration
    private boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    // 🔹 Parse all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
