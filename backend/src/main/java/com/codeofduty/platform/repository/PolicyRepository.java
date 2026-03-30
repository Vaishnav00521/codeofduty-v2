package com.codeofduty.platform.repository;

import com.codeofduty.platform.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

/**
 * Standard CRUD operations for Policies with zone-based searching.
 */
@Repository
public interface PolicyRepository extends JpaRepository<Policy, UUID> {

    /**
     * Find all active policies in a specific operating zone.
     * Crucial for parametric trigger efficiency.
     */
    List<Policy> findByIsActiveTrueAndWorker_OperatingZone(String zone);
}
