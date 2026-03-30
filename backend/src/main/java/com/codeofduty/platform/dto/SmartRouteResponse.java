package com.codeofduty.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Combined response for traffic-aware routing and weather forecasts.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SmartRouteResponse {
    private RouteData route;
    private List<WeatherPoint> weatherAlerts;
    private String recommendation;
}
