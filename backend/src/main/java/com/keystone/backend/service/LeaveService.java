package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.LeaveRequest;
import com.keystone.backend.entity.Leave;

public interface LeaveService {

    String addLeave(LeaveRequest request);
    
    List<Leave> getAllLeaves();

    Leave getLeaveById(Long id);

    String updateLeave(Long id, LeaveRequest request);

    String deleteLeave(Long id);
}