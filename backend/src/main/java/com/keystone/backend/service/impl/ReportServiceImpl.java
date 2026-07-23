package com.keystone.backend.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.ReportsResponse;
import com.keystone.backend.repository.AttendanceRepository;
import com.keystone.backend.repository.CustomerRepository;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.SalaryRepository;
import com.keystone.backend.repository.SiteRepository;
import com.keystone.backend.repository.WorkOrderRepository;
import com.keystone.backend.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final SalaryRepository salaryRepository;
    private final WorkOrderRepository workOrderRepository;

    public ReportServiceImpl(
            CustomerRepository customerRepository,
            SiteRepository siteRepository,
            EmployeeRepository employeeRepository,
            AttendanceRepository attendanceRepository,
            SalaryRepository salaryRepository,
            WorkOrderRepository workOrderRepository) {

        this.customerRepository = customerRepository;
        this.siteRepository = siteRepository;
        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
        this.salaryRepository = salaryRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public ReportsResponse getReport() {

        return new ReportsResponse(
                customerRepository.count(),
                siteRepository.count(),
                employeeRepository.count(),
                attendanceRepository.count(),
                workOrderRepository.count(),
                salaryRepository.count()
        );
    }
}