package com.keystone.backend.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.DashboardResponse;
import com.keystone.backend.repository.AttendanceRepository;
import com.keystone.backend.repository.CustomerRepository;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.LeaveRepository;
import com.keystone.backend.repository.SiteRepository;
import com.keystone.backend.repository.WorkOrderRepository;
import com.keystone.backend.service.DashboardService;
import com.keystone.backend.repository.SalaryRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final SiteRepository siteRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final WorkOrderRepository workOrderRepository;
    private final SalaryRepository salaryRepository;

    public DashboardServiceImpl(
            CustomerRepository customerRepository,
            EmployeeRepository employeeRepository,
            SiteRepository siteRepository,
            AttendanceRepository attendanceRepository,
            LeaveRepository leaveRepository,
            WorkOrderRepository workOrderRepository,
            SalaryRepository salaryRepository) {

        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.siteRepository = siteRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
        this.workOrderRepository = workOrderRepository;
        this.salaryRepository = salaryRepository;
    }

    @Override
    public DashboardResponse getDashboardData() {

    	return new DashboardResponse(
    	        customerRepository.count(),
    	        employeeRepository.count(),
    	        siteRepository.count(),
    	        attendanceRepository.count(),
    	        leaveRepository.count(),
    	        workOrderRepository.count(),
    	        salaryRepository.count()
    	);
    }
}