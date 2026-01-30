package com.samadhan.grievance_core_service.controller;

import com.samadhan.grievance_core_service.dto.FeedbackRequestDTO;
import com.samadhan.grievance_core_service.security.JwtUtil;
import com.samadhan.grievance_core_service.service.FeedbackService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public String submitFeedback(@Valid @RequestBody FeedbackRequestDTO dto,
                                 HttpServletRequest request) {

        String token = request.getHeader("Authorization").substring(7);

        Long userId = jwtUtil.extractUserId(token);
        String email = jwtUtil.extractEmail(token);
        Long deptId = jwtUtil.extractDeptId(token);

        return feedbackService.submitFeedback(dto, userId, email, deptId);
    }
}
