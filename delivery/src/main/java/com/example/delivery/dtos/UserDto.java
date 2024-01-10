package com.example.delivery.dtos;

import com.example.delivery.models.Admin;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;

    public UserDto(Admin admin) {
        this.id = admin.getAdminId();
        this.username = admin.getUsername();
    }
}
