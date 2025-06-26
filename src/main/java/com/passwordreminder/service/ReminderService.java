package com.passwordreminder.service;

import com.passwordreminder.model.PasswordReminder;
import com.passwordreminder.repository.PasswordReminderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService {

    private final PasswordReminderRepository reminderRepository;
    private final JavaMailSender mailSender;

    public List<PasswordReminder> getRemindersByEmail(String email) {
        return reminderRepository.findByUserEmailIgnoreCase(email);
    }

    public List<PasswordReminder> getUpcomingRemindersForUser(String email) {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return reminderRepository.findByUserEmailIgnoreCase(email).stream()
                .filter(r -> {
                    LocalDate dueDate = r.getLastPasswordChangeDate().plusDays(r.getChangeIntervalDays());
                    return dueDate.isEqual(tomorrow);
                }).toList();
    }

    public PasswordReminder createReminder(PasswordReminder reminder, String email) {
        reminder.setUserEmail(email);
        return reminderRepository.save(reminder);
    }

    @Transactional
    public PasswordReminder updateReminder(Long id, PasswordReminder updated, String email) {
        PasswordReminder existing = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id " + id));

        if (!existing.getUserEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Unauthorized update attempt by: " + email);
        }

        existing.setAccountName(updated.getAccountName());
        existing.setLastPasswordChangeDate(updated.getLastPasswordChangeDate());
        existing.setChangeIntervalDays(updated.getChangeIntervalDays());

        return reminderRepository.save(existing);
    }

    @Transactional
    public void deleteReminder(Long id, String email) {
        PasswordReminder existing = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id " + id));

        if (!existing.getUserEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Unauthorized delete attempt by: " + email);
        }

        reminderRepository.delete(existing);
    }

    public PasswordReminder getReminderForUserById(Long id, String email) {
        PasswordReminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id " + id));

        if (!reminder.getUserEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Unauthorized access attempt by: " + email);
        }

        return reminder;
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void sendUpcomingEmailsScheduled() {
        System.out.println("⏰ Scheduler triggered at: " + LocalDateTime.now());
        sendUpcomingEmails();
    }

    public void sendUpcomingEmails() {
        System.out.println("📬 Sending upcoming emails...");
        reminderRepository.findAll().forEach(r -> {
            LocalDate due = r.getLastPasswordChangeDate().plusDays(r.getChangeIntervalDays());
            if (due.isEqual(LocalDate.now().plusDays(1))) {
                sendReminderEmail(r.getUserEmail(), List.of(r));
            }
        });
    }

    public void sendRemindersForUser(String userEmail) {
        List<PasswordReminder> userReminders = getUpcomingRemindersForUser(userEmail);
        if (userReminders.isEmpty()) {
            System.out.println("✅ No reminders due for user: " + userEmail);
            return;
        }
        sendReminderEmail(userEmail, userReminders);
    }

    private void sendReminderEmail(String toEmail, List<PasswordReminder> reminders) {
        try {
            StringBuilder body = new StringBuilder("Hello 👋,\n\nHere are your upcoming password reminders:\n\n");

            for (PasswordReminder r : reminders) {
                body.append("🔐 Account: ").append(r.getAccountName()).append("\n")
                        .append("📅 Due Date: ").append(r.getLastPasswordChangeDate().plusDays(r.getChangeIntervalDays()))
                        .append("\n\n");
            }

            body.append("Stay safe and secure online!\n— Password Reminder Service");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("🔐 Your Password Change Reminders (Due Tomorrow)");
            message.setText(body.toString());

            mailSender.send(message);
            System.out.println("✅ Email sent to: " + toEmail);

        } catch (Exception e) {
            System.err.println("❌ Failed to send email to: " + toEmail);
            e.printStackTrace();
        }
    }

    public PasswordReminder markAsChanged(Long id, String email) {
        PasswordReminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id " + id));

        if (!reminder.getUserEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Unauthorized markAsChanged attempt by: " + email);
        }

        reminder.setLastPasswordChangeDate(LocalDate.now());
        return reminderRepository.save(reminder);
    }
}
