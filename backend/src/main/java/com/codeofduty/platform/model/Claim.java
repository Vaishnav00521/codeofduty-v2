package com.codeofduty.platform.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import java.util.UUID;

/**
 * Entity representing an automated claim.
 * Generated via parametric triggers (e.g., severe flooding).
 */
@Entity
@Table(name = "claims")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * The policy the claim is under.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    /**
     * The parametric event type (e.g., "Severe Flooding").
     */
    @Column(nullable = false)
    private String triggerEvent;

    /**
     * Estimated lost hours due to the event.
     */
    @Column(nullable = false)
    private Integer lostHours;

    /**
     * Final payout amount.
     */
    @Column(nullable = false)
    private Double payoutAmount;

    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Supporting media URL or text proof submitted by driver.
     */
    @Column(columnDefinition = "TEXT")
    private String evidence;

    /**
     * Status of the claim (APPROVED, PENDING, PAID).
     */
    @Builder.Default
    private String status = "APPROVED";
}
