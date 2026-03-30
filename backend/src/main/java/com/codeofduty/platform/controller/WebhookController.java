package com.codeofduty.platform.controller;

import com.codeofduty.platform.service.ParametricClaimService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for external parametric triggers.
 */
@RestController
@RequestMapping("/api/triggers")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class WebhookController {

    private final ParametricClaimService parametricClaimService;

    /**
     * Webhook endpoint for external triggers.
     */
    @PostMapping("/external")
    public ResponseEntity<String> processExternalTrigger(@RequestBody TriggerRequest request) {
        log.info("Received external trigger webhook: {}", request);
        parametricClaimService.processTrigger(
                request.getZone(), 
                request.getEventType(), 
                request.getSeverity()
        );
        return ResponseEntity.accepted()
                .body("Parametric trigger processed. Zero-touch payouts initiated for zone: " + request.getZone());
    }

    @Data
    public static class TriggerRequest {
        private String zone;
        private String eventType;
        private int severity;
    }
}
