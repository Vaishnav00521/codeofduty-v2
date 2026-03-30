package com.codeofduty.platform.service;

import com.codeofduty.platform.dto.RouteData;
import com.codeofduty.platform.dto.Coordinate;
import com.codeofduty.platform.dto.WeatherPoint;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

/**
 * Service to orchestrate TomTom routing and OpenWeather forecasts.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LogisticsService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${tomtom.api.key}")
    private String tomtomKey;

    @Value("${openweather.api.key}")
    private String weatherKey;

    /**
     * Fetches a traffic-aware route from TomTom Routing API.
     */
    public RouteData getOptimizedRoute(Double sLat, Double sLon, Double eLat, Double eLon) {
        // TomTom format: {lat},{lon}:{lat},{lon}
        String url = String.format(
            "https://api.tomtom.com/routing/1/calculateRoute/%f,%f:%f,%f/json?key=%s&traffic=true&routeRepresentation=polyline",
            sLat, sLon, eLat, eLon, tomtomKey
        );

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode route = root.path("routes").get(0);
            JsonNode summary = route.path("summary");
            JsonNode pointsNode = route.path("legs").get(0).path("points");

            List<Coordinate> points = new ArrayList<>();
            for (JsonNode p : pointsNode) {
                points.add(Coordinate.builder()
                        .latitude(p.path("latitude").asDouble())
                        .longitude(p.path("longitude").asDouble())
                        .build());
            }

            return RouteData.builder()
                    .points(points)
                    .travelTimeSeconds(summary.path("travelTimeInSeconds").asDouble())
                    .trafficDelaySeconds(summary.path("trafficDelayInSeconds").asDouble())
                    .lengthMeters(summary.path("lengthInMeters").asDouble())
                    .build();
        } catch (Exception e) {
            log.error("TomTom Route Fetch Failed: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Fetches weather for the midpoint or destination of the route.
     */
    public List<WeatherPoint> getWeatherAlongRoute(Double lat, Double lon) {
        String url = String.format(
            "https://api.openweathermap.org/data/3.0/onecall?lat=%f&lon=%f&exclude=minutely,hourly&units=metric&appid=%s",
            lat, lon, weatherKey
        );

        List<WeatherPoint> weatherPoints = new ArrayList<>();
        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode current = root.path("current");

            weatherPoints.add(WeatherPoint.builder()
                    .lat(lat)
                    .lon(lon)
                    .condition(current.path("weather").get(0).path("main").asText())
                    .temp(current.path("temp").asDouble())
                    .alert(root.has("alerts") ? root.path("alerts").get(0).path("event").asText() : "Clear")
                    .build());
        } catch (Exception e) {
            log.error("Weather Fetch Failed: {}", e.getMessage());
        }
        return weatherPoints;
    }
}
