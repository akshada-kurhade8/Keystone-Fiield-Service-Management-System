package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Long> {

}