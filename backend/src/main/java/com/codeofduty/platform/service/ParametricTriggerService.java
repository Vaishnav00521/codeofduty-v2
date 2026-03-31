package com.codeofduty.platform.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;

/**
 * Validates external parametric inputs (e.g. OpenWeatherMap) against smart contract rules.
 */
@Service
@Slf4j
public class ParametricTriggerService {

    public Map<String, Object> evaluateRainfallClaim(String zone, String platform) {
        log.info("Polling OpenWeatherMap API for zone: {}", zone);
        
        // Simulating the API response
        double rainfall = 45.0; // Hardcoded mock response for this phase
        
        Map<String, Object> receipt = new HashMap<>();
        
        if (rainfall > 30.0) {
            log.info("Parametric Condition Met. >30mm/hr rainfall detected.");
            int hoursLost = 4;
            double hourlyWage = 112.5;
            double payout = hoursLost * hourlyWage; // Total = 450
            
            receipt.put("status", "SUCCESS");
            receipt.put("triggerEvent", "Heavy Rainfall Detected (>30mm)");
            receipt.put("action", platform + " Operations Halted");
            receipt.put("hoursLost", hoursLost);
            receipt.put("payoutAmount", payout);
            receipt.put("transactionId", UUID.randomUUID().toString());
        } else {
            receipt.put("status", "REJECTED");
            receipt.put("triggerEvent", "Condition not met (<30mm)");
            receipt.put("action", "Operations active");
            receipt.put("hoursLost", 0);
            receipt.put("payoutAmount", 0);
        }
        
        return receipt;
    }
}
