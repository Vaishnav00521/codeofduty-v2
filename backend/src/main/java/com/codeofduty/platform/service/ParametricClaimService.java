package com.codeofduty.platform.service;

import com.codeofduty.platform.model.Claim;
import com.codeofduty.platform.model.Policy;
import com.codeofduty.platform.model.Notification;
import com.codeofduty.platform.repository.ClaimRepository;
import com.codeofduty.platform.repository.PolicyRepository;
import com.codeofduty.platform.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Core business logic for parametric insurance triggers.
 * Automatically generates claims based on external events.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ParametricClaimService {

    private final PolicyRepository policyRepository;
    private final ClaimRepository claimRepository;
    private final NotificationRepository notificationRepository;

    /**
     * Base hourly rate used for payout estimation (e.g., 200 INR/hour).
     */
    private static final double BASE_HOURLY_RATE = 200.0;

    /**
     * Processes an external parametric trigger (e.g., Weather API, Google Traffic).
     *
     * @param zone The geographical zone affected (e.g., "Koramangala, Bengaluru").
     * @param eventType The type of event (e.g., "Severe Flooding").
     * @param severity The severity level (1-5), used to simulate lost hours.
     */
    @Transactional
    public void processTrigger(String zone, String eventType, int severity) {
        log.info("Processing external trigger: event={}, zone={}, severity={}", eventType, zone, severity);

        // a) Find all active policies in that specific zone
        List<Policy> activePolicies = policyRepository.findByIsActiveTrueAndWorker_OperatingZone(zone);
        log.info("Found {} active policies in zone {}", activePolicies.size(), zone);

        if (activePolicies.isEmpty()) {
            return;
        }

        // b) Calculate simulated payouts and c) Automatically generate new Claims
        List<Claim> claims = activePolicies.stream()
                .map(policy -> {
                    int simulatedLostHours = severity * 2; 
                    double payoutAmount = simulatedLostHours * BASE_HOURLY_RATE;

                    return Claim.builder()
                            .policy(policy)
                            .triggerEvent(eventType)
                            .lostHours(simulatedLostHours)
                            .payoutAmount(payoutAmount)
                            .status("APPROVED") // Zero-touch automation
                            .build();
                })
                .collect(Collectors.toList());

        // Save all generated claims
        if (!claims.isEmpty()) {
            claimRepository.saveAll(claims);
            log.info("Successfully generated {} approved claims for zone {}", claims.size(), zone);
            
            // Add Notification
            notificationRepository.save(Notification.builder()
                .title("Trigger Detected: " + eventType)
                .message("Parametric engine detected " + eventType + " in " + zone + ". Claim approved.")
                .timestamp(LocalDateTime.now())
                .build());
        } else {
            log.warn("No claims generated for zone {} despite logic finishing.", zone);
        }
    }
}
