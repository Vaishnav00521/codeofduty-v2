package com.codeofduty.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherPoint {
    private Double lat;
    private Double lon;
    private String condition;
    private Double temp;
    private String alert;
}
