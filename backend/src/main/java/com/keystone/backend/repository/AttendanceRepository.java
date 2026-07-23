package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}