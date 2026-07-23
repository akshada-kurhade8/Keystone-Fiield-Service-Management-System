package com.keystone.backend.service;

import com.keystone.backend.dto.LoginRequest;
import com.keystone.backend.dto.LoginResponse;
//import com.keystone.backend.dto.AuthResponse;
import com.keystone.backend.dto.RegisterRequest;

public interface AuthService {
	String register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}

