package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.dto.GrievanceDto;

public interface GrievanceService {
    void createGrievance(GrievanceDto grievanceDto,Long userId);
}
