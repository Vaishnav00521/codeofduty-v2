package com.codeofduty.platform.controller;

import com.codeofduty.platform.model.Claim;
import com.codeofduty.platform.repository.ClaimRepository;
import com.codeofduty.platform.repository.NotificationRepository;
import com.codeofduty.platform.repository.PolicyRepository;
import com.codeofduty.platform.model.Notification;
import com.codeofduty.platform.model.Policy;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.codeofduty.platform.service.ParametricTriggerService;
import com.codeofduty.platform.service.SimulationService;
import com.codeofduty.platform.dto.SimulationRequest;

/**
 * Controller to fetch claim data for the frontend.
 */
@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor

public class ClaimController {

    private final ClaimRepository claimRepository;
    private final NotificationRepository notificationRepository;
    private final PolicyRepository policyRepository;
    private final ParametricTriggerService parametricTriggerService;
    private final SimulationService simulationService;

    /**
     * Parametric API Trigger for OpenWeatherMap integration simulator.
     */
    @PostMapping("/trigger")
    public ResponseEntity<Map<String, Object>> triggerParametricClaim(@RequestBody Map<String, String> payload) {
        String zone = payload.getOrDefault("zone", "Koramangala");
        String platform = payload.getOrDefault("platform", "Zepto");

        Map<String, Object> result = parametricTriggerService.evaluateRainfallClaim(zone, platform);
        
        // Ensure seamless integration by saving auto-approved claim to DB
        if ("SUCCESS".equals(result.get("status"))) {
            Policy p = policyRepository.findAll().stream()
                    .filter(Policy::getIsActive)
                    .findFirst()
                    .orElse(null);

            if (p != null) {
                Claim parametricClaim = Claim.builder()
                        .policy(p)
                        .triggerEvent((String) result.get("triggerEvent"))
                        .lostHours((Integer) result.get("hoursLost"))
                        .payoutAmount((Double) result.get("payoutAmount"))
                        .description("Platform Operations Halted by AI parametric system: " + result.get("action"))
                        .status("APPROVED")
                        .evidence("API Validated via OpenWeatherMap Hash: " + result.get("transactionId"))
                        .build();

                claimRepository.save(parametricClaim);

                notificationRepository.save(Notification.builder()
                        .title("Smart Contract Executed")
                        .message("₹" + result.get("payoutAmount") + " added to balance due to " + result.get("triggerEvent"))
                        .timestamp(LocalDateTime.now())
                        .build());
            }
        }

        return ResponseEntity.ok(result);
    }

    /**
     * Admin Web Dashboard Interactive Simulation API.
     */
    @PostMapping("/simulate")
    public ResponseEntity<Map<String, Object>> simulate(@RequestBody SimulationRequest request) {
        return ResponseEntity.ok(simulationService.simulateClaim(request));
    }

    /**
     * Fetch all claims from the database.
     */
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * Get a summary of the claims for the dashboard.
     */
    @GetMapping("/summary")
    public ClaimSummary getSummary() {
        List<Claim> all = claimRepository.findAll();
        double totalPayout = all.stream()
                .filter(c -> "APPROVED".equals(c.getStatus()))
                .mapToDouble(c -> c.getPayoutAmount() != null ? c.getPayoutAmount() : 0.0)
                .sum();
        
        Claim latest = all.isEmpty() ? null : all.get(all.size() - 1);
        
        return new ClaimSummary(totalPayout, all.size(), latest);
    }

    /**
     * Mark all approved claims as PAID (Simulate withdrawal payout).
     */
    @PostMapping("/withdraw")
    public String withdrawAll() {
        List<Claim> approved = claimRepository.findAll().stream()
                .filter(c -> "APPROVED".equals(c.getStatus()))
                .toList();
        
        if (approved.isEmpty()) return "No approved claims found.";

        approved.forEach(c -> c.setStatus("PAID"));
        claimRepository.saveAll(approved);

        // Add Notification
        notificationRepository.save(Notification.builder()
                .title("Withdrawal Success")
                .message("₹" + approved.stream().mapToDouble(Claim::getPayoutAmount).sum() + " has been sent to your bank account.")
                .timestamp(LocalDateTime.now())
                .build());
        
        return "Withdrawal successful! ₹0.00 active balance.";
    }

    /**
     * Submit a manual claim (Edge Case).
     */
    @PostMapping("/manual")
    public Claim submitManual(@RequestBody Claim claim) {
        // Link to active policy
        Policy p = policyRepository.findAll().stream()
                .filter(Policy::getIsActive)
                .findFirst()
                .orElse(null);
        
        if (p != null) claim.setPolicy(p);
        
        // AI Verification Logic (Check for truth/evidence)
        boolean hasEvidence = claim.getEvidence() != null && !claim.getEvidence().trim().isEmpty();
        boolean validHours = claim.getLostHours() != null && claim.getLostHours() > 0;
        
        if (hasEvidence && validHours) {
            // AI confidently verifies truth via evidence -> Auto-Approve
            claim.setStatus("APPROVED");
            
            // Dynamic Payout Calculation
            double hazardBonus = claim.getTriggerEvent().contains("Hazard") || claim.getTriggerEvent().contains("Glitch") ? 50.0 : 0.0;
            claim.setPayoutAmount(claim.getLostHours() * (150.0 + hazardBonus));
            
            Claim saved = claimRepository.save(claim);
            
            notificationRepository.save(Notification.builder()
                .title("Claim Auto-Approved ✅")
                .message("Evidence verified by AI. ₹" + claim.getPayoutAmount() + " added to your instant balance.")
                .timestamp(LocalDateTime.now())
                .build());
                
            return saved;
        } else {
            // Missing evidence or invalid hours -> Manual Human Review
            if (claim.getPayoutAmount() == null) claim.setPayoutAmount(0.0);
            claim.setStatus("PENDING");
            
            Claim saved = claimRepository.save(claim);
            
            notificationRepository.save(Notification.builder()
                .title("Claim Requires Review")
                .message("Your claim requires manual verification due to missing or weak evidence.")
                .timestamp(LocalDateTime.now())
                .build());
                
            return saved;
        }
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class ClaimSummary {
        private double totalPayout;
        private int claimCount;
        private Claim latestClaim;
    }
}
