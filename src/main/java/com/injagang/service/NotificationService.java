package com.injagang.service;

import com.injagang.domain.notification.Notification;
import com.injagang.exception.NotificationNotFoundException;
import com.injagang.exception.UnauthorizedException;
import com.injagang.repository.NotificationRepository;
import com.injagang.response.NotificationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;


    public List<NotificationResponse> list(Long recipientId) {

        List<Notification> notifications = notificationRepository.findAllByRecipientId(recipientId);

        return notifications.stream().map(NotificationResponse::new).collect(Collectors.toList());


    }

    public void read(Long notificationId, Long userId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(NotificationNotFoundException::new);

        if (!notification.getRecipient().getId().equals(userId)) {
            throw new UnauthorizedException();
        }


        notification.read();
    }

    public void readAll(Long userId) {
        notificationRepository.readAll(userId);
    }
}
