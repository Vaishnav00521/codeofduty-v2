package com.codeofduty.platform.repository;

import com.codeofduty.platform.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/**
 * Repository for system notifications.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
}
