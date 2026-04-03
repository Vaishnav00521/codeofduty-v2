package com.codeofduty.platform.controller;

import com.codeofduty.platform.model.Worker;
import com.codeofduty.platform.model.Policy;
import com.codeofduty.platform.repository.WorkerRepository;
import com.codeofduty.platform.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Controller to fetch worker profile and status.
 */
@RestController
@RequestMapping("/api/workers")
@RequiredArgsConstructor
@Slf4j

public class WorkerController {

    private final WorkerRepository workerRepository;
    private final PolicyRepository policyRepository;

    /**
     * Get the current active worker summary.
     */
    @GetMapping("/summary")
    public Worker getActiveWorker() {
        List<Worker> workers = workerRepository.findAll();
        return workers.isEmpty() ? null : workers.get(workers.size() - 1);
    }

    /**
     * Create a new worker and their first policy.
     */
    @PostMapping("/onboard")
    public Worker onboard(@RequestBody Worker worker) {
        log.info("Onboarding new worker: {}", worker.getFullName());
        Worker saved = workerRepository.save(worker);
        
        // Auto-create active policy
        policyRepository.save(Policy.builder()
                .worker(saved)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(7))
                .weeklyPremiumAmount(65.0)
                .isActive(true)
                .build());
                
        return saved;
    }

    /**
     * Update worker's payment method.
     */
    @PutMapping("/{id}/payment")
    public Worker updatePayment(@PathVariable UUID id, @RequestBody Map<String, String> payload) {
        Worker worker = workerRepository.findById(id).orElseThrow();
        worker.setUpiId(payload.get("upiId"));
        return workerRepository.save(worker);
    }

    /**
     * Update worker settings (Operating Zone and Platform).
     */
    @PutMapping("/{id}/settings")
    public Worker updateSettings(@PathVariable UUID id, @RequestBody Map<String, String> payload) {
        Worker worker = workerRepository.findById(id).orElseThrow();
        if (payload.containsKey("operatingZone")) worker.setOperatingZone(payload.get("operatingZone"));
        if (payload.containsKey("platform")) worker.setPlatform(payload.get("platform"));
        return workerRepository.save(worker);
    }
}
