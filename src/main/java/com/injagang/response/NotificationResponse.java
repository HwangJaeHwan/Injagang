package com.injagang.response;

import com.injagang.domain.notification.Notification;
import com.injagang.domain.notification.NotificationType;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
public class NotificationResponse {

    private Long id;
    private Long boardId;
    private Long anchorId;
    private NotificationType type;
    private String nickname;
    private LocalDateTime createAt;


    public NotificationResponse(Notification notification) {
        this.id = notification.getId();
        this.boardId = notification.getBoard().getId();
        this.anchorId = notification.getAnchorId();
        this.type = notification.getType();
        this.nickname = notification.getActor().getNickname();
        this.createAt = notification.getCreatedTime();
    }
}
