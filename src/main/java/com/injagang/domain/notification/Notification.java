package com.injagang.domain.notification;

import com.injagang.domain.Board;
import com.injagang.domain.base.Timestamp;
import com.injagang.domain.user.User;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Getter
@Entity
@ToString
@NoArgsConstructor(access = PROTECTED)
public class Notification extends Timestamp {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "recipient_id")
    private User recipient;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "actor_id")
    private User actor;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Enumerated(STRING)
    private NotificationType type;

    private Long anchorId;

    private LocalDateTime readAt;
    @Builder
    public Notification(User recipient, User actor, Board board, NotificationType type, Long anchorId, LocalDateTime readAt) {
        this.recipient = recipient;
        this.actor = actor;
        this.board = board;
        this.type = type;
        this.anchorId = anchorId;
        this.readAt = readAt;
    }

    public void read() {
        this.readAt = LocalDateTime.now();
    }
}
