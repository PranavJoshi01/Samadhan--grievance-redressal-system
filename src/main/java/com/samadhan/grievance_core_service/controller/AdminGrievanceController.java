package com.samadhan.grievance_core_service.controller;

import com.samadhan.grievance_core_service.dto.AdminGrievanceListDto;
import com.samadhan.grievance_core_service.service.AdminGrievanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/grievances")
public class AdminGrievanceController {

    @Autowired
    private AdminGrievanceService adminGrievanceService;

    @GetMapping
    public ResponseEntity<List<AdminGrievanceListDto>> getAllGrievances() {
        return ResponseEntity.ok(adminGrievanceService.getAllGrievances());
    }
}
