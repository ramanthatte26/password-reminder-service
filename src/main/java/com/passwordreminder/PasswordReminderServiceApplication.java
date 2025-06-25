package com.passwordreminder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PasswordReminderServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(PasswordReminderServiceApplication.class, args);
	}
}
