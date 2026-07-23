package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}