package com.codeofduty.platform.controller;

import com.codeofduty.platform.dto.SmartRouteResponse;
import com.codeofduty.platform.dto.RouteData;
import com.codeofduty.platform.dto.WeatherPoint;
import com.codeofduty.platform.service.LogisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controller for navigation and logistical data using TomTom & OpenWeather.
 */
@RestController
@RequestMapping("/api/logistics")
@RequiredArgsConstructor
@Slf4j

public class NavigationController {

    private final LogisticsService logisticsService;

    @GetMapping("/smart-route")
    public SmartRouteResponse getSmartRoute(
            @RequestParam Double sLat, @RequestParam Double sLon,
            @RequestParam Double eLat, @RequestParam Double eLon) {
        
        log.info("TomTom Smart Route from {},{} to {},{}", sLat, sLon, eLat, eLon);
        
        // 1. Fetch Traffic-aware Route (TomTom)
        RouteData routeData = logisticsService.getOptimizedRoute(sLat, sLon, eLat, eLon);
        
        // 2. Fetch Weather Alerts (Midpoint or End point)
        List<WeatherPoint> weatherAlerts = logisticsService.getWeatherAlongRoute(eLat, eLon);
        
        // 3. Generate Recommendation based on Traffic Delay
        String recommendation = generateRecommendation(routeData, weatherAlerts);
        
        return SmartRouteResponse.builder()
                .route(routeData)
                .weatherAlerts(weatherAlerts)
                .recommendation(recommendation)
                .build();
    }

    private String generateRecommendation(RouteData route, List<WeatherPoint> weather) {
        if (route == null) return "Route unavailable. Check TomTom API keys.";
        
        boolean isRainy = weather.stream().anyMatch(w -> w.getCondition().contains("Rain") || w.getCondition().contains("Thunderstorm"));
        
        // Threshold: 300 seconds (5 mins) of traffic delay
        boolean isHeavyTraffic = route.getTrafficDelaySeconds() != null && route.getTrafficDelaySeconds() > 300;

        if (isRainy && isHeavyTraffic) {
             return "CAUTION: Heavy rain and " + (route.getTrafficDelaySeconds()/60) + "m traffic delay. Proceed with caution.";
        } else if (isRainy) {
             return "WEATHER ALERT: Rain detected at destination. Payout safeguards active.";
        } else if (isHeavyTraffic) {
             return "TRAFFIC ALERT: High congestion identified (" + (route.getTrafficDelaySeconds()/60) + " min delay).";
        }
        return "Route clear. Expected arrival in " + Math.round(route.getTravelTimeSeconds()/60) + " mins.";
    }
}
