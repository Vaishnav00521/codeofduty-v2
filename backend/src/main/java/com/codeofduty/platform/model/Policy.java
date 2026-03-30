package com.codeofduty.platform.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Entity representing a parametric insurance policy.
 */
@Entity
@Table(name = "policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private Worker worker;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Double weeklyPremiumAmount;

    @Builder.Default
    private Boolean isActive = true;

    @PrePersist
    @PreUpdate
    private void validateWeeklyDuration() {
        if (endDate == null) {
            this.endDate = startDate.plusDays(7);
        }
    }
}
