package com.samadhan.grievance_core_service.client;

import com.samadhan.grievance_core_service.dto.FeedbackResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "feedback-service", url = "http://localhost:8083")
public interface FeedbackClient {

    @GetMapping("/feedback/grievance/{grievanceId}")
    FeedbackResponseDto getFeedbackByGrievanceId(@PathVariable("grievanceId") Long grievanceId);
}
