package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.EmployeeRequest;
import com.keystone.backend.entity.Employee;

public interface EmployeeService {

    String addEmployee(EmployeeRequest request);

    List<Employee> getAllEmployees();
    
    Employee getEmployeeById(Long id);

    String updateEmployee(Long id, EmployeeRequest request);

    String deleteEmployee(Long id);
}