package com.passwordreminder.controller;

import com.passwordreminder.dto.AuthRequest;
import com.passwordreminder.dto.AuthResponse;
import com.passwordreminder.model.User;
import com.passwordreminder.repository.UserRepository;
import com.passwordreminder.security.JwtService;
import com.passwordreminder.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://password-reminder-service.onrender.com"
}, allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody @Valid User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("⚠️ Email already registered!");
        }

        User saved = userService.saveUser(user);
        String token = jwtService.generateToken(saved.getEmail());

        return ResponseEntity.ok().body(new AuthResponse(token));
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("🔐 Login endpoint hit"); // Force redeploy log

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not registered"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    // ✅ Dummy endpoint to trigger redeploy
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
