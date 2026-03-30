package com.codeofduty.platform.repository;

import com.codeofduty.platform.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/**
 * Standard CRUD operations for Workers.
 */
@Repository
public interface WorkerRepository extends JpaRepository<Worker, UUID> {
}
