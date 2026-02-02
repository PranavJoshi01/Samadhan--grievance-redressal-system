package com.samadhan.auth.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String name;

    private String email;

    private String password;

    // Optional — backend forces AUTHORITY when needed
    private String role;

    // Accept both deptId and departmentId from frontend
    @JsonAlias({"departmentId"})
    private Long deptId;

    // Accept both deptName and departmentName
    @JsonAlias({"departmentName"})
    private String deptName;
}
