package com.samadhan.auth.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

 
    @Column(nullable = true)
    private String phoneNumber;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private Long deptId;

    private String deptName;
}
