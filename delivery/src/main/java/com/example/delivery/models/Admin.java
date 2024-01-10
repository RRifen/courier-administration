package com.example.delivery.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "login")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;
}
