package com.passwordreminder.controller;

import com.passwordreminder.model.PasswordReminder;
import com.passwordreminder.service.ReminderService;
import com.passwordreminder.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "https://password-reminder-service-1.onrender.com", allowCredentials = "true")
@RequiredArgsConstructor
public class ReminderController {

    private final ReminderService reminderService;
    private final UserService userService;

    // ✅ TEMP: Public ping endpoint to test deployment
    @GetMapping("/ping")
    public String ping() {
        return "✅ Reminder service is up and running!";
    }

    @GetMapping
    public List<PasswordReminder> getAllReminders(Principal principal) {
        return reminderService.getRemindersByEmail(principal.getName());
    }

    @GetMapping("/{id}")
    public PasswordReminder getReminderById(@PathVariable("id") Long id, Principal principal) {
        return reminderService.getReminderForUserById(id, principal.getName());
    }

    @GetMapping("/upcoming")
    public List<PasswordReminder> getUpcomingReminders(Principal principal) {
        return reminderService.getUpcomingRemindersForUser(principal.getName());
    }

    @PostMapping
    public PasswordReminder createReminder(@RequestBody @Valid PasswordReminder reminder, Principal principal) {
        return reminderService.createReminder(reminder, principal.getName());
    }

    @PutMapping("/{id}")
    public PasswordReminder updateReminder(@PathVariable("id") Long id,
                                           @RequestBody @Valid PasswordReminder updated,
                                           Principal principal) {
        return reminderService.updateReminder(id, updated, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable("id") Long id, Principal principal) {
        reminderService.deleteReminder(id, principal.getName());
    }

    @PutMapping("/{id}/mark-changed")
    public PasswordReminder markAsChanged(@PathVariable("id") Long id, Principal principal) {
        return reminderService.markAsChanged(id, principal.getName());
    }

    @PostMapping("/send-for-user")
    public void sendRemindersForUser(@RequestParam("userEmail") String userEmail, Principal principal) {
        String loggedInEmail = principal.getName();
        if (!loggedInEmail.equalsIgnoreCase(userEmail)) {
            throw new RuntimeException("Unauthorized: You can only access your own reminders.");
        }

        reminderService.sendRemindersForUser(userEmail);
    }
}
