package com.samadhan.grievance_core_service.service;




import com.samadhan.grievance_core_service.dto.AdminGrievanceListDto;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.repository.GrievanceRepository;
import com.samadhan.grievance_core_service.service.AdminGrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminGrievanceServiceImpl implements AdminGrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Override
    public List<AdminGrievanceListDto> getAllGrievances() {

        
        List<Grievances> grievances = grievanceRepository.findAll();

        List<AdminGrievanceListDto> response = new ArrayList<>();

        
        for (Grievances g : grievances) {

            AdminGrievanceListDto dto = new AdminGrievanceListDto();
            dto.setGrievanceId(g.getGrievanceId());     // grievances.grievance_id
            dto.setTitle(g.getTitle());                 // grievances.title
            dto.setStatus(g.getStatus().name());        // grievances.status
            dto.setAssignedAuthorityId(
                    g.getAssignedAuthorityId()         // grievances.assigned_authority_id
            );
            dto.setCreatedAt(g.getCreatedAt());         // grievances.created_at

            response.add(dto);
        }

        return response;
    }
}