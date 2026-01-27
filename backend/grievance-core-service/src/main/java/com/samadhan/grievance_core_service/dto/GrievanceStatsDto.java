package com.samadhan.grievance_core_service.dto;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class GrievanceStatsDto {
    private Long totalCount;

   private Map<GrievanceStatus,Long> statusWiseCount;
}
