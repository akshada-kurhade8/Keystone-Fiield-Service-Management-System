package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.SalaryRequest;
import com.keystone.backend.entity.Salary;
import com.keystone.backend.service.SalaryService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public String addSalary(@RequestBody SalaryRequest request) {
        return salaryService.addSalary(request);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public List<Salary> getAllSalaries() {
        return salaryService.getAllSalaries();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{id}")
    public Salary getSalaryById(@PathVariable Long id) {
        return salaryService.getSalaryById(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    public String updateSalary(@PathVariable Long id,
                               @RequestBody SalaryRequest request) {
        return salaryService.updateSalary(id, request);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteSalary(@PathVariable Long id) {
        return salaryService.deleteSalary(id);
    }
}