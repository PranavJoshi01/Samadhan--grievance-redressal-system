package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.dto.GrievanceDto;
import com.samadhan.grievance_core_service.service.GrievanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grievance")


public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    // Global Exception hnalder
    // centralised Logger
    //JWT
@PostMapping
    public ResponseEntity<?> createGrievance(@Valid @RequestBody  GrievanceDto grievanceDto){
    System.out.println("in grievance create controller");
      grievanceService.createGrievance(grievanceDto,123L);
    return ResponseEntity.ok().build();
}


}
