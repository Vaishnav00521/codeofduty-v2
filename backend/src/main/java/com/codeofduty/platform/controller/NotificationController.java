package com.codeofduty.platform.controller;

import com.codeofduty.platform.model.Notification;
import com.codeofduty.platform.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for fetching and managing system notifications.
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public List<Notification> getAll() {
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }

    @PostMapping("/{id}/read")
    public Notification markAsRead(@PathVariable UUID id) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setIsRead(true);
        return notificationRepository.save(n);
    }

    @DeleteMapping("/clear")
    public void clearAll() {
        notificationRepository.deleteAll();
    }
}
