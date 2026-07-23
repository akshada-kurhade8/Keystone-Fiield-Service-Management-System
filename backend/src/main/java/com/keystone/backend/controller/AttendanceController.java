package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.AttendanceRequest;
import com.keystone.backend.entity.Attendance;
import com.keystone.backend.service.AttendanceService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public String addAttendance(@RequestBody AttendanceRequest request) {
        return attendanceService.addAttendance(request);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public String updateAttendance(@PathVariable Long id,
                                   @RequestBody AttendanceRequest request) {
        return attendanceService.updateAttendance(id, request);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteAttendance(@PathVariable Long id) {
        return attendanceService.deleteAttendance(id);
    }
}