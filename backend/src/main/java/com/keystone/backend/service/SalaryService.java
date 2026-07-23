package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.SalaryRequest;
import com.keystone.backend.entity.Salary;

public interface SalaryService {

    String addSalary(SalaryRequest request);

    List<Salary> getAllSalaries();

    Salary getSalaryById(Long id);

    String updateSalary(Long id, SalaryRequest request);

    String deleteSalary(Long id);
}