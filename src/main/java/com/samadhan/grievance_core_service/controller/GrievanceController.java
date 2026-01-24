package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.dto.GrievanceDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatsDto;
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
    GrievanceStatsDto status =grievanceService.getGrievanceCountByStatus(123L);
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




}
