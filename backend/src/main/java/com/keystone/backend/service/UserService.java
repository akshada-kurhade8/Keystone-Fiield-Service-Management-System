

package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

}