package com.codeofduty.platform.repository;

import com.codeofduty.platform.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/**
 * Standard CRUD operations for Claims.
 */
@Repository
public interface ClaimRepository extends JpaRepository<Claim, UUID> {
}
