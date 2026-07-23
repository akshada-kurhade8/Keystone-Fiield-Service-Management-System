package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long> {

}