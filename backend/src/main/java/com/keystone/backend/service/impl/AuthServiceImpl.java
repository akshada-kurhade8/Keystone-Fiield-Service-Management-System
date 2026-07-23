package com.keystone.backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keystone.backend.dto.LoginRequest;
import com.keystone.backend.dto.LoginResponse;
import com.keystone.backend.dto.RegisterRequest;
import com.keystone.backend.entity.User;
import com.keystone.backend.repository.UserRepository;

import com.keystone.backend.service.AuthService;
import com.keystone.backend.service.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public String register(RegisterRequest request) {
    	if (userRepository.findByEmail(request.getEmail()).isPresent()) {
    	    throw new RuntimeException("Email already exists");
    	}

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User registered successfully";
    }
    
    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

//        return "Login successful";
//        return jwtService.generateToken(user.getEmail());
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                "Login Successful",
                user.getRole().name(),
                user.getFullName()
        );
    }
}