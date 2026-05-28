package com.injagang.domain;

import com.injagang.domain.base.Timestamp;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class LoginHistory extends Timestamp {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_history_id")
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String eventType;

    @Column(nullable = false)
    private String ipAddress;

    private String userAgent;


    @Builder
    public LoginHistory(Long userId, String eventType, String ipAddress, String userAgent) {
        this.userId = userId;
        this.eventType = eventType;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
    }
}
