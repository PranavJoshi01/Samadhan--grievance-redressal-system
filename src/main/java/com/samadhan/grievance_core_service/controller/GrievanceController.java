package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.AssignGrievanceRequestDto;
import com.samadhan.grievance_core_service.dto.GrievanceDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatsDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatusChangedRequestDto;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.service.GrievanceService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grievance")


public class GrievanceController {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceController.class);

    @Autowired
    private GrievanceService grievanceService;

    // Global Exception hnalder
    // centralised Logger
    //JWT
    // To create a new grevience
@PostMapping
    public ResponseEntity<?> createGrievance(@Valid @RequestBody  GrievanceDto grievanceDto){
    logger.info("in grievance create controller");
      grievanceService.createGrievance(grievanceDto,123L);
    return ResponseEntity.ok().build();
}

@GetMapping("/count")
    public ResponseEntity<?> getGrievanceCountByStatus(){
    logger.info("Entered in count API for user");
    GrievanceStatsDto status =grievanceService.getGrievanceCountByStatus(124L,"ADMIN",1L);
    return ResponseEntity.ok().body(status);

}


@GetMapping
public ResponseEntity<Page<Grievances>> getAllGrievances(
@RequestParam int page,
@RequestParam int size
) {
return ResponseEntity.ok(
grievanceService.getAllGrievances(page, size)
);
}

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGrievance(@Valid @RequestBody  GrievanceDto grievanceDto,@PathVariable Long id){

        grievanceService.updateGrievance(grievanceDto,id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/statusChange")
    public ResponseEntity<?> settingStatus(@RequestBody GrievanceStatusChangedRequestDto grievanceStatusChangedRequestDto){
        grievanceService.settingStatus(grievanceStatusChangedRequestDto,123L,"ADMIN");
        return ResponseEntity.ok("Grievance status updated");
    }

@PutMapping("/{grievanceId}/assign")
public ResponseEntity<?> assignAuthorityAndUpdateStatus(
        @PathVariable Long grievanceId,
        @RequestBody AssignGrievanceRequestDto request
) {

    grievanceService.assignAuthorityAndUpdateStatus(
            grievanceId,
            request.getAuthorityId(),
            request.getStatus(),
            request.getMessage()
    );

    return ResponseEntity.ok().build();
}



}
