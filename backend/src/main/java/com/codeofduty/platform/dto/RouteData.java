package com.codeofduty.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Data representing a single route result from TomTom.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteData {
    private List<Coordinate> points;
    private Double travelTimeSeconds;
    private Double trafficDelaySeconds;
    private Double lengthMeters;
}
