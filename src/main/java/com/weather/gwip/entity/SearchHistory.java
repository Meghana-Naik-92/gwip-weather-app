package com.weather.gwip.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String cityName;

    @Column(precision = 5, scale = 2)
    private BigDecimal temperature;

    @Column(length = 50)
    private String weatherCondition;

    @Column(nullable = false)
    private LocalDateTime searchedAt;

    @PrePersist
    protected void onPersist() {
        searchedAt = LocalDateTime.now();
    }
}
