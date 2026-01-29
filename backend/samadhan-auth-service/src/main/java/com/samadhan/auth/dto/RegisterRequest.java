package com.samadhan.auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // "USER", "ADMIN", or "AUTHORITY"
    private Long deptId; // For AUTHORITY role
    private String deptName; // For AUTHORITY role
}
