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
        Map<String, Object> risk = new HashMap<>();
        risk.put("baseRate", 40.0);
        risk.put("zoneMultiplier", zone.contains("Koramangala") ? 10.0 : 5.0);
        risk.put("weatherSurcharge", 15.0);
        risk.put("totalWeekly", 65.0);
        risk.put("riskLevel", "HIGH");
        risk.put("message", "Predictive street flooding detected in " + zone);
        return risk;
    }
}
