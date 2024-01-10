package com.example.delivery.service;

import com.example.delivery.dtos.*;
import com.example.delivery.exceptions.AppError;
import com.example.delivery.models.Admin;
import com.example.delivery.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AdminService adminService;
    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(
                    new AppError(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Неправильный логин или пароль",
                            new Timestamp(new Date().getTime()).toString()
                    ),
                    HttpStatus.UNAUTHORIZED
            );
        }
        UserDetails userDetails = adminService.loadUserByUsername(authRequest.getUsername());
        Admin admin = adminService.findByUsername(authRequest.getUsername()).orElseThrow();
        String token = jwtTokenUtils.generateToken(userDetails, admin.getAdminId());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        if (adminService.findByUsername(registrationUserDto.getUsername()).isPresent()) {
            return new ResponseEntity<>(
                    new AppError(
                            HttpStatus.BAD_REQUEST.value(),
                            "Пользователь с указанным именем уже существует",
                            new Timestamp(new Date().getTime()).toString()
                    ),
                    HttpStatus.BAD_REQUEST
            );
        }
        Admin admin = adminService.createNewUser(registrationUserDto);
        return ResponseEntity.ok(new UserDto(admin));
    }

    public ResponseEntity<?> validate(TokenRequest tokenRequest) {
        try {
            List<String> roles = jwtTokenUtils.getRoles(tokenRequest.getToken());
            if (roles.get(0).equals("ROLE_USER")) {
                return ResponseEntity.ok(new TokenResponse(true, "ROLE_USER"));
            } else if (roles.get(0).equals("ROLE_ADMIN")) {
                return ResponseEntity.ok(new TokenResponse(true, "ROLE_ADMIN"));
            } else {
                return ResponseEntity.ok(new TokenResponse(false, ""));
            }
        }
        catch(Exception e) {
            return ResponseEntity.ok(new TokenResponse(false, ""));
        }
    }
}
