package com.samadhan.notification.repository;

import com.samadhan.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserEmail(String userEmail);
    List<Notification> findByUserEmailOrderByCreatedAtDesc(String userEmail);

  
}
