package com.samadhan.grievance_core_service.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class AdminGrievanceListDto {
	 @NotBlank
	private Long grievanceId;
	private String title;
	private String status;
	private Long assignedAuthorityId; 
	private LocalDateTime createdAt;


	// getters & setters

}
