package com.samadhan.notification.controller;

import com.samadhan.notification.entity.Feedback;
import com.samadhan.notification.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackService.submitFeedback(feedback);
    }
}
