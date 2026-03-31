package com.codeofduty.platform.service;

import com.codeofduty.platform.model.Policy;
import com.codeofduty.platform.model.Worker;
import com.codeofduty.platform.repository.PolicyRepository;
import com.codeofduty.platform.repository.WorkerRepository;
import com.codeofduty.platform.repository.ClaimRepository;
import com.codeofduty.platform.model.Claim;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Bootstraps initial data for the hackathon.
 * Ensures a worker and an active policy exist for testing.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataBootstrap implements CommandLineRunner {

    private final WorkerRepository workerRepository;
    private final PolicyRepository policyRepository;
    private final ClaimRepository claimRepository;

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking hackathon test data...");

        // Ensure the standard test worker exists
        Worker worker = workerRepository.findAll().stream()
                .filter(w -> "Koramangala, BLR".equals(w.getOperatingZone()))
                .findFirst()
                .orElseGet(() -> {
                    log.info("Creating default test worker in Koramangala, BLR...");
                    return workerRepository.save(Worker.builder()
                            .fullName("Hackathon Rider")
                            .platform("Zepto")
                            .operatingZone("Koramangala, BLR")
                            .upiId("rider@upi")
                            .build());
                });

        // Ensure the worker has at least one active policy
        boolean hasActivePolicy = policyRepository.findByIsActiveTrueAndWorker_OperatingZone(worker.getOperatingZone())
                .stream().anyMatch(p -> p.getWorker().getId().equals(worker.getId()));

        if (!hasActivePolicy) {
            log.info("Creating active policy for worker: {}", worker.getFullName());
            policyRepository.save(Policy.builder()
                    .worker(worker)
                    .startDate(LocalDate.now().minusDays(5))
                    .endDate(LocalDate.now().plusDays(2))
                    .weeklyPremiumAmount(50.0)
                    .isActive(true)
                    .build());
        }

        if (claimRepository.findAll().isEmpty() && worker != null) {
            log.info("Creating initial APPROVED claim to show instant payout balance...");
            Policy p = policyRepository.findAll().get(0);
            claimRepository.save(Claim.builder()
                    .policy(p)
                    .triggerEvent("Heavy Flooding (AI Confirmed)")
                    .lostHours(3)
                    .payoutAmount(450.0)
                    .description("Automated payout triggered by environmental satellite hazard API.")
                    .status("APPROVED")
                    .build());
        }

        log.info("Hackathon data check complete. Readiness: OK.");
    }
}
