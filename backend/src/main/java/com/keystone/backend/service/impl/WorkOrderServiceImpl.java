package com.keystone.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.WorkOrderRequest;
import com.keystone.backend.entity.Employee;
import com.keystone.backend.entity.Site;
import com.keystone.backend.entity.WorkOrder;
import com.keystone.backend.repository.EmployeeRepository;
import com.keystone.backend.repository.SiteRepository;
import com.keystone.backend.repository.WorkOrderRepository;
import com.keystone.backend.service.WorkOrderService;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final EmployeeRepository employeeRepository;
    private final SiteRepository siteRepository;

    public WorkOrderServiceImpl(WorkOrderRepository workOrderRepository,
                                EmployeeRepository employeeRepository,
                                SiteRepository siteRepository) {
        this.workOrderRepository = workOrderRepository;
        this.employeeRepository = employeeRepository;
        this.siteRepository = siteRepository;
    }

    @Override
    public String addWorkOrder(WorkOrderRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setAssignedDate(request.getAssignedDate());
        workOrder.setStatus(request.getStatus());
        workOrder.setEmployee(employee);
        workOrder.setSite(site);

        workOrderRepository.save(workOrder);

        return "Work Order added successfully";
    }

    @Override
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    @Override
    public WorkOrder getWorkOrderById(Long id) {
        return workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work Order not found"));
    }

    @Override
    public String updateWorkOrder(Long id, WorkOrderRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work Order not found"));

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setAssignedDate(request.getAssignedDate());
        workOrder.setStatus(request.getStatus());
        workOrder.setEmployee(employee);
        workOrder.setSite(site);

        workOrderRepository.save(workOrder);

        return "Work Order updated successfully";
    }

    @Override
    public String deleteWorkOrder(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work Order not found"));

        workOrderRepository.delete(workOrder);

        return "Work Order deleted successfully";
    }
}