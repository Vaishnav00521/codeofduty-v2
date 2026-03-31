package com.codeofduty.platform.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class SimulationRequest {
    private String triggerType;
    private double severityValue;
    
    @JsonProperty("isGpsMatch")
    private boolean isGpsMatch;
}
