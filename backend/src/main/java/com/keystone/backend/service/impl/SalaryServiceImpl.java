package com.keystone.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.SalaryRequest;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.entity.Salary;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.SalaryRepository;
import com.keystone.backend.service.SalaryService;

@Service
public class SalaryServiceImpl implements SalaryService {

    private final SalaryRepository salaryRepository;
    private final EmployeeRepository employeeRepository;

    public SalaryServiceImpl(SalaryRepository salaryRepository,
                             EmployeeRepository employeeRepository) {
        this.salaryRepository = salaryRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String addSalary(SalaryRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Salary salary = new Salary();

        salary.setBasicSalary(request.getBasicSalary());
        salary.setBonus(request.getBonus());
        salary.setDeduction(request.getDeduction());

        double netSalary = request.getBasicSalary()
                + request.getBonus()
                - request.getDeduction();

        salary.setNetSalary(netSalary);
        salary.setSalaryDate(request.getSalaryDate());
        salary.setEmployee(employee);

        salaryRepository.save(salary);

        return "Salary added successfully";
    }

    @Override
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    @Override
    public Salary getSalaryById(Long id) {
        return salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));
    }

    @Override
    public String updateSalary(Long id, SalaryRequest request) {

        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        salary.setBasicSalary(request.getBasicSalary());
        salary.setBonus(request.getBonus());
        salary.setDeduction(request.getDeduction());

        double netSalary = request.getBasicSalary()
                + request.getBonus()
                - request.getDeduction();

        salary.setNetSalary(netSalary);
        salary.setSalaryDate(request.getSalaryDate());
        salary.setEmployee(employee);

        salaryRepository.save(salary);

        return "Salary updated successfully";
    }

    @Override
    public String deleteSalary(Long id) {

        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));

        salaryRepository.delete(salary);

        return "Salary deleted successfully";
    }
}