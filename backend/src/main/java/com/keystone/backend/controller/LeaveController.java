package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.LeaveRequest;
import com.keystone.backend.entity.Leave;
import com.keystone.backend.service.LeaveService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public String addLeave(@RequestBody LeaveRequest request) {
        return leaveService.addLeave(request);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping
    public List<Leave> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping("/{id}")
    public Leave getLeaveById(@PathVariable Long id) {
        return leaveService.getLeaveById(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public String updateLeave(@PathVariable Long id,
                              @RequestBody LeaveRequest request) {
        return leaveService.updateLeave(id, request);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteLeave(@PathVariable Long id) {
        return leaveService.deleteLeave(id);
    }
}