package com.passwordreminder.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordReminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account name must not be blank")
    @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "Account name must contain only letters and be at least 3 characters long")
    private String accountName;

    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date cannot be in the future")
    private LocalDate lastPasswordChangeDate;

    @Min(value = 1, message = "Interval must be at least 1 day")
    private int changeIntervalDays;

    @Email(message = "Invalid email")
    private String userEmail;
}
