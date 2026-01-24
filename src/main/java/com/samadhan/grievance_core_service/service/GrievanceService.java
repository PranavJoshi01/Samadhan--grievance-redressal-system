package com.samadhan.grievance_core_service.service;
import com.samadhan.grievance_core_service.entity.Grievances;
import org.springframework.data.domain.Page;

import com.samadhan.grievance_core_service.dto.GrievanceDto;

public interface GrievanceService {
    void createGrievance(GrievanceDto grievanceDto,Long userId);
    
    Page<Grievances> getAllGrievances(
            int page,
            int size
    );
}
