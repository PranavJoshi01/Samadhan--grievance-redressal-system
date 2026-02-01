package com.samadhan.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    //  Generate signing key safely
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    //  Generate token
    public String generateToken(String email, String role, Long userId, Long deptId, String deptName) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role.trim()) // ensure no whitespace
                .claim("userId", userId)
                .claim("deptId", deptId)
                .claim("deptName", deptName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //  Extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //  Extract email (subject)
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    //  Extract role safely
    public String extractRole(String token) {
        String role = extractAllClaims(token).get("role", String.class);
        return role != null ? role.trim() : "";
    }

    //  Validate token only (used in filter)
    public boolean isTokenValid(String token) {
        try {
            return !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    //  Validate with email (optional)
    public boolean isTokenValid(String token, String email) {
        return extractUsername(token).equals(email) && !isTokenExpired(token);
    }

    //  Expiry check
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
