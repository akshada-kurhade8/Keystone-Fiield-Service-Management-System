package com.keystone.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.LeaveRequest;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.entity.Leave;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.LeaveRepository;
import com.keystone.backend.service.LeaveService;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveServiceImpl(LeaveRepository leaveRepository,
                            EmployeeRepository employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String addLeave(LeaveRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Leave leave = new Leave();

        leave.setFromDate(request.getFromDate());
        leave.setToDate(request.getToDate());
        leave.setReason(request.getReason());
        leave.setStatus(request.getStatus());
        leave.setEmployee(employee);

        leaveRepository.save(leave);

        return "Leave applied successfully";
    }
    
    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public Leave getLeaveById(Long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
    }

    @Override
    public String updateLeave(Long id, LeaveRequest request) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        leave.setFromDate(request.getFromDate());
        leave.setToDate(request.getToDate());
        leave.setReason(request.getReason());
        leave.setStatus(request.getStatus());
        leave.setEmployee(employee);

        leaveRepository.save(leave);

        return "Leave updated successfully";
    }

    @Override
    public String deleteLeave(Long id) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        leaveRepository.delete(leave);

        return "Leave deleted successfully";
    }
}