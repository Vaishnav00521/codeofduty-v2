package com.codeofduty.platform.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for AI Risk Engine statistics.
 */
@RestController
@RequestMapping("/api/risk")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class RiskController {

    @GetMapping("/summary")
    public Map<String, Object> getRiskSummary(@RequestParam(defaultValue = "Koramangala, BLR") String zone) {
        long sec = System.currentTimeMillis() / 1000;
        int cycle = (int) ((sec / 15) % 3); // Cycles every 15 seconds
        
        String riskLevel;
        double surcharge;
        String message;
        
        if (cycle == 0) {
            riskLevel = "NORMAL";
            surcharge = 0.0;
            message = "Conditions are clear. Standard operations in effect.";
        } else if (cycle == 1) {
            riskLevel = "ELEVATED";
            surcharge = 8.5;
            message = "Minor traffic bottlenecks and light rain observed.";
        } else {
            riskLevel = "HIGH";
            surcharge = 15.0;
            message = "Hazard warning! Predictive street flooding detected in " + zone + ".";
        }
        
        double base = 40.0;
        double zoneMult = zone.contains("Koramangala") ? 10.0 : 5.0;

        Map<String, Object> risk = new HashMap<>();
        risk.put("baseRate", base);
        risk.put("zoneMultiplier", zoneMult);
        risk.put("weatherSurcharge", surcharge);
        risk.put("totalWeekly", base + zoneMult + surcharge);
        risk.put("riskLevel", riskLevel);
        risk.put("message", message);
        return risk;
    }
}
