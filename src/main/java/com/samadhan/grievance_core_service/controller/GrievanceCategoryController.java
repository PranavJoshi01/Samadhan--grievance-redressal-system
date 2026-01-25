package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.service.GrievanceCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class GrievanceCategoryController {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceController.class);

    @Autowired
    private GrievanceCategoryService grievanceCategoryService;

    @GetMapping
    public ResponseEntity<List<GrievanceCategory>> getAllCategory(){
        return ResponseEntity.ok(grievanceCategoryService.getAllCategory());
    }









}
