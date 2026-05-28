package com.injagang.repository;

import com.injagang.domain.notification.Notification;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    @Query("select n from Notification n join fetch n.actor where n.recipient.id = :recipientId " +
            "and n.actor.id != :recipientId and n.readAt = null order by n.createdTime")
    List<Notification> findAllByRecipientId(Long recipientId);

    @Modifying(clearAutomatically = true)
    @Query("update Notification n " +
            "set n.readAt = current_timestamp " +
            "where n.recipient.id = :userId")
    void readAll(@Param("userId") Long userId);

}
