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

/**
 * Controller to fetch claim data for the frontend.
 */
@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ClaimController {

    private final ClaimRepository claimRepository;
    private final NotificationRepository notificationRepository;
    private final PolicyRepository policyRepository;

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
        if (claim.getPayoutAmount() == null) claim.setPayoutAmount(0.0);
        
        claim.setStatus("PENDING");
        Claim saved = claimRepository.save(claim);
        
        // Add Notification
        notificationRepository.save(Notification.builder()
                .title("Manual Claim Filed")
                .message("Your manual claim for '" + claim.getTriggerEvent() + "' is under AI review.")
                .timestamp(LocalDateTime.now())
                .build());
                
        return saved;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class ClaimSummary {
        private double totalPayout;
        private int claimCount;
        private Claim latestClaim;
    }
}
