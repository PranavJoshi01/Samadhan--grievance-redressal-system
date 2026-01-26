package com.samadhan.notification.service;

import com.samadhan.notification.entity.Feedback;
import com.samadhan.notification.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
