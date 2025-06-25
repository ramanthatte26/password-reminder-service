package com.passwordreminder.repository;

import com.passwordreminder.model.PasswordReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordReminderRepository extends JpaRepository<PasswordReminder, Long> {

    // 👤 This method will be used to fetch reminders for a specific user
    List<PasswordReminder> findByUserEmailIgnoreCase(String email);
}
