package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.EmployeeRequest;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.service.EmployeeService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public String addEmployee(@RequestBody EmployeeRequest request) {
        return employeeService.addEmployee(request);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public String updateEmployee(@PathVariable Long id,
                                 @RequestBody EmployeeRequest request) {
        return employeeService.updateEmployee(id, request);
    }

    @PreAuthorize("hasAnyRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        return employeeService.deleteEmployee(id);
    }
}