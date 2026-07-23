package com.keystone.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.EmployeeRequest;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.entity.Site;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.SiteRepository;
import com.keystone.backend.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final SiteRepository siteRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               SiteRepository siteRepository) {
        this.employeeRepository = employeeRepository;
        this.siteRepository = siteRepository;
    }

    @Override
    public String addEmployee(EmployeeRequest request) {

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        Employee employee = new Employee();

        employee.setFullName(request.getFullName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setSite(site);

        employeeRepository.save(employee);

        return "Employee added successfully";
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public String updateEmployee(Long id, EmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        employee.setFullName(request.getFullName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setSite(site);

        employeeRepository.save(employee);

        return "Employee Updated Successfully";
    }

    @Override
    public String deleteEmployee(Long id) {

        employeeRepository.deleteById(id);

        return "Employee Deleted Successfully";
    }
}