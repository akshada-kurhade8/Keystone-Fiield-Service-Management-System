package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.AttendanceRequest;
import com.keystone.backend.entity.Attendance;

public interface AttendanceService {

    String addAttendance(AttendanceRequest request);

    List<Attendance> getAllAttendance();
    
    Attendance getAttendanceById(Long id);

    String updateAttendance(Long id, AttendanceRequest request);

    String deleteAttendance(Long id);
}