package com.keystone.backend.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.AttendanceRequest;
import com.keystone.backend.entity.Attendance;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.repository.AttendanceRepository;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.service.AttendanceService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
                                 EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String addAttendance(AttendanceRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Attendance attendance = new Attendance();

        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setCheckInTime(request.getCheckInTime());
        attendance.setCheckOutTime(request.getCheckOutTime());
        attendance.setStatus(request.getStatus());
        attendance.setEmployee(employee);

        attendanceRepository.save(attendance);

        return "Attendance added successfully";
    }
    
    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
    }

    @Override
    public String updateAttendance(Long id, AttendanceRequest request) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setCheckInTime(request.getCheckInTime());
        attendance.setCheckOutTime(request.getCheckOutTime());
        attendance.setStatus(request.getStatus());
        attendance.setEmployee(employee);

        attendanceRepository.save(attendance);

        return "Attendance Updated Successfully";
    }

    @Override
    public String deleteAttendance(Long id) {

        attendanceRepository.deleteById(id);

        return "Attendance Deleted Successfully";
    }
}