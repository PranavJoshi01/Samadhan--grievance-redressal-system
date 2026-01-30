package com.samadhan.grievance_core_service.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GrievanceDto {

    @NotBlank
    private String title;
    private String description;
    private int deptId;
    private String address;
    private GrievanceMediaDto media;
    private String userEmail;

}
