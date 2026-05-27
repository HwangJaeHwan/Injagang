package com.injagang.controller;

import com.injagang.domain.notification.Notification;
import com.injagang.exception.NotificationNotFoundException;
import com.injagang.repository.NotificationRepository;
import com.injagang.resolver.data.UserSession;
import com.injagang.response.NotificationResponse;
import com.injagang.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationResponse> list(UserSession userSession) {

        return notificationService.list(userSession.getUserId());
    }

    @PatchMapping("/{notificationId}")
    public void readNotification(UserSession userSession, @PathVariable Long notificationId) {

        notificationService.read(notificationId,userSession.getUserId());
    }

    @PatchMapping("/read")
    public void readAll(UserSession userSession) {

        notificationService.readAll(userSession.getUserId());
    }

}
