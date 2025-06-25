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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class ReminderController {

    private final ReminderService reminderService;
    private final UserService userService;

    // ✅ Return reminders only for the logged-in user
    @GetMapping
    public List<PasswordReminder> getAllReminders(Principal principal) {
        return reminderService.getRemindersByEmail(principal.getName());
    }

    // ✅ Get specific reminder if owned by user
    @GetMapping("/{id}")
    public PasswordReminder getReminderById(@PathVariable Long id, Principal principal) {
        return reminderService.getReminderForUserById(id, principal.getName());
    }

    // ✅ Get upcoming reminders for user
    @GetMapping("/upcoming")
    public List<PasswordReminder> getUpcomingReminders(Principal principal) {
        return reminderService.getUpcomingRemindersForUser(principal.getName());
    }

    // ✅ Create reminder for the logged-in user
    @PostMapping
    public PasswordReminder createReminder(@RequestBody @Valid PasswordReminder reminder, Principal principal) {
        return reminderService.createReminder(reminder, principal.getName());
    }

    // ✅ Update reminder if owned by user
    @PutMapping("/{id}")
    public PasswordReminder updateReminder(@PathVariable Long id,
                                           @RequestBody @Valid PasswordReminder updated,
                                           Principal principal) {
        return reminderService.updateReminder(id, updated, principal.getName());
    }

    // ✅ Delete reminder if owned by user
    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable Long id, Principal principal) {
        reminderService.deleteReminder(id, principal.getName());
    }

    // ✅ Mark password as changed (only if owned by user)
    @PutMapping("/{id}/mark-changed")
    public PasswordReminder markAsChanged(@PathVariable("id") Long id, Principal principal) {
        return reminderService.markAsChanged(id, principal.getName());
    }

    // ✅ Only allow sending email to self
    @PostMapping("/send-for-user")
    public void sendRemindersForUser(@RequestParam("userEmail") String userEmail, Principal principal) {
        String loggedInEmail = principal.getName();
        if (!loggedInEmail.equalsIgnoreCase(userEmail)) {
            throw new RuntimeException("Unauthorized: You can only access your own reminders.");
        }

        reminderService.sendRemindersForUser(userEmail);
    }


}
