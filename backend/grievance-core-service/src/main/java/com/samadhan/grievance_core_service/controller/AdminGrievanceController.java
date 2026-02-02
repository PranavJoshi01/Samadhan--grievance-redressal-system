package com.samadhan.grievance_core_service.controller;

import com.samadhan.grievance_core_service.dto.AdminGrievanceListDto;
import com.samadhan.grievance_core_service.security.JwtUtil;
import com.samadhan.grievance_core_service.service.AdminGrievanceService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/grievances")
@CrossOrigin(origins = "*")
public class AdminGrievanceController {

    @Autowired
    private AdminGrievanceService adminGrievanceService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<AdminGrievanceListDto>> getAllGrievances(
            HttpServletRequest request
    ) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        String role = jwtUtil.extractRole(token);

        if (!"ADMIN".equalsIgnoreCase(role)) {
            return ResponseEntity.status(403).build();
        }

        List<AdminGrievanceListDto> grievances =
                adminGrievanceService.getAllGrievances();

        return ResponseEntity.ok(grievances);
    }
}
