package com.samadhan.grievance_core_service.dto;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class AssignGrievanceRequestDto {
	private Long authorityId;
	private GrievanceStatus status;
	private String message;
}
