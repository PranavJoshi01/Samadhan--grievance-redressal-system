package com.samadhan.grievance_core_service.dto;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class GrievanceStatusChangedRequestDto {
    private GrievanceStatus status;
    private Long grievanceId;
}
