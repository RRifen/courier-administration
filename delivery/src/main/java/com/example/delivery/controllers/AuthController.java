package com.example.delivery.controllers;

import com.example.delivery.dtos.JwtRequest;
import com.example.delivery.dtos.RegistrationUserDto;
import com.example.delivery.dtos.TokenRequest;
import com.example.delivery.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        return authService.createAuthToken(authRequest);
    }

    @PostMapping("/registration")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        return authService.createNewUser(registrationUserDto);
    }

    @PostMapping("/check")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> checkJwt(@RequestBody TokenRequest token) {
        return authService.validate(token);
    }

}
