package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.*;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.security.JwtUtil;
import com.samadhan.grievance_core_service.service.GrievanceService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/grievance")
@CrossOrigin(origins = "*")
public class GrievanceController {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceController.class);

    @Autowired
    private GrievanceService grievanceService;

    @Autowired
    private  JwtUtil jwtUtil;

    // Global Exception hanlder
    // centralised Logger
    //JWT
    // To create a new grevience
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createGrievance(@Valid @RequestPart("data") GrievanceDto grievanceDto,
                                             @RequestPart(value = "media", required = false) MultipartFile[] media,
                                             @RequestHeader("Authorization") String authHeader
                                             ){
    String token = authHeader.substring(7);
    Long userId = jwtUtil.extractUserId(token);
    String role = jwtUtil.extractRole(token);
    logger.info("in grievance create controller");
      grievanceService.createGrievance(grievanceDto,media,userId);
    return  ResponseEntity.ok(
             "Grievance created successfully"

    );
}

@GetMapping("/count")
    public ResponseEntity<?> getGrievanceCountByStatus(@RequestHeader("Authorization") String authHeader){


    String token = authHeader.substring(7);
    Long userId = jwtUtil.extractUserId(token);
    String role = jwtUtil.extractRole(token);

    logger.info("Entered in count API for user");
    GrievanceStatsDto status =grievanceService.getGrievanceCountByStatus(userId,role,1L);
    return ResponseEntity.ok().body(status);

}


@GetMapping
public ResponseEntity<Page<GrievanceResponseDto>> getAllGrievancesByRole(
		@RequestParam int page,
		@RequestParam int size,
		@RequestParam(required = false) String status,
        @RequestHeader("Authorization") String authHeader
) {

    String token = authHeader.substring(7);
    Long userId = jwtUtil.extractUserId(token);
    String role = jwtUtil.extractRole(token);
    Long deptId = 1L;
    // Will be fetched from JWT token later
	
    Page<GrievanceResponseDto> grievances =
            grievanceService.getAllGrievancesByRoleWithDTO(
                    page, size, userId, role, deptId, status
            );

    return ResponseEntity.ok(grievances);
}

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGrievance(@Valid @RequestBody GrievanceDto grievanceDto, @PathVariable Long id){
        logger.info("Updating grievance with id: {}", id);
        grievanceService.updateGrievance(grievanceDto, id);
        logger.info("Grievance {} updated successfully", id);
        return ResponseEntity.ok("Grievance updated successfully");
    }

    @PutMapping("/statusChange")
    public ResponseEntity<?> settingStatus(@RequestBody GrievanceStatusChangedRequestDto grievanceStatusChangedRequestDto,
                                           @RequestHeader("Authorization") String authHeader
                                           ){
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        String role = jwtUtil.extractRole(token);
        Long deptId = 1L;
        // Will be fetched from
    grievanceService.settingStatus(grievanceStatusChangedRequestDto,userId,role);
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
