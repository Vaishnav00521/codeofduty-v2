package com.codeofduty.platform.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Simple controller to provide backend status and API discovery.
 */
@RestController

public class StatusController {

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("platform", "CodeofDuty");
        status.put("status", "UP");
        status.put("version", "v1.0.0-hackathon");
        status.put("cors_allowed", "5173, 5174");
        status.put("endpoints", new String[]{
            "POST /api/triggers/external - External parametric webhook",
            "GET /api/claims - Fetch all claims",
            "GET /h2-console - Database console (local only)"
        });
        status.put("message", "Parametric Insurance for Q-Commerce Workers is Active.");
        return status;
    }
}
