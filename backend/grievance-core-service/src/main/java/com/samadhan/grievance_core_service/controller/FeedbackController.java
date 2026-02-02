package com.samadhan.grievance_core_service.controller;

import com.samadhan.grievance_core_service.dto.FeedbackRequestDTO;
import com.samadhan.grievance_core_service.security.JwtUtil;
import com.samadhan.grievance_core_service.service.FeedbackService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<String> submitFeedback(@Valid @RequestBody FeedbackRequestDTO dto,
                                                 HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        Long userId = jwtUtil.extractUserId(token);
        String email = jwtUtil.extractEmail(token);
        Long deptId = jwtUtil.extractDeptId(token);

        String response = feedbackService.submitFeedback(dto, userId, email, deptId);

        return ResponseEntity.ok(response);
    }
}
