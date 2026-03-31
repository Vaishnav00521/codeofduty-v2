package com.codeofduty.platform.service;

import com.codeofduty.platform.dto.SimulationRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SimulationService {
    
    // Abstract Actuarial State Simulation
    private double riskPool = 1000000.0;
    private double basePremium = 65.0;

    public Map<String, Object> simulateClaim(SimulationRequest request) {
        Map<String, Object> response = new HashMap<>();

        /* 1. Fraud Guardian Execution */
        if (!request.isGpsMatch()) {
            response.put("status", "REJECTED");
            response.put("reason", "GPS_MISMATCH");
            response.put("message", "GPS Anomaly Detected");
            return response;
        }

        /* 2. Intelligent Threshold Evaluation */
        boolean breached = false;
        String triggerType = request.getTriggerType() != null ? request.getTriggerType() : "";
        double severity = request.getSeverityValue();
        
        switch (triggerType) {
            case "Heavy Rainfall":
                if (severity > 30.0) breached = true;
                break;
            case "Extreme Heat":
                if (severity > 42.0) breached = true;
                break;
            case "AQI Hazard":
                if (severity > 300.0) breached = true;
                break;
            case "Traffic Gridlock":
                if (severity < 5.0) breached = true;
                break;
            default:
                break;
        }

        if (!breached) {
            response.put("status", "REJECTED");
            response.put("reason", "THRESHOLD_NOT_MET");
            response.put("message", "Conditions normal");
            return response;
        }

        /* 3. Actuarial Math Implementation */
        double payoutAmount = 5230.0;
        riskPool -= payoutAmount;
        
        double penalty = 3.0; // Dynamic risk penalty increment
        double nextWeekPremium = basePremium + penalty;
        basePremium = nextWeekPremium; // Stateful update for successive triggers

        /* 4. Formatting exact specified JSON Success response */
        response.put("status", "SUCCESS");
        response.put("payoutAmount", payoutAmount);
        response.put("newPoolBalance", riskPool);
        response.put("nextWeekPremium", nextWeekPremium);
        response.put("actionTaken", "Zepto Operations Halted");

        return response;
    }
}
