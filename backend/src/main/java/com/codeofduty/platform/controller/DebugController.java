package com.codeofduty.platform.controller;

import com.codeofduty.platform.model.Policy;
import com.codeofduty.platform.model.Worker;
import com.codeofduty.platform.model.Claim;
import com.codeofduty.platform.repository.PolicyRepository;
import com.codeofduty.platform.repository.WorkerRepository;
import com.codeofduty.platform.repository.ClaimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

/**
 * Debugging endpoint for the hackathon integration phase.
 */
@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor

public class DebugController {

    private final WorkerRepository workerRepository;
    private final PolicyRepository policyRepository;
    private final ClaimRepository claimRepository;

    @GetMapping("/dump")
    public Map<String, Object> dumpAll() {
        Map<String, Object> dump = new HashMap<>();
        dump.put("workers", workerRepository.findAll());
        dump.put("policies", policyRepository.findAll());
        dump.put("claims", claimRepository.findAll());
        return dump;
    }

    /**
     * Helper to manually re-bootstrap if needed.
     */
    @PostMapping("/reset")
    public String reset() {
        claimRepository.deleteAll();
        policyRepository.deleteAll();
        workerRepository.deleteAll();
        return "Database cleared. Please restart or wait for auto-bootstrap.";
    }
}
