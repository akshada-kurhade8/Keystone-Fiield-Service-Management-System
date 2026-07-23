package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.WorkOrderRequest;
import com.keystone.backend.entity.WorkOrder;
import com.keystone.backend.service.WorkOrderService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public String addWorkOrder(@RequestBody WorkOrderRequest request) {
        return workOrderService.addWorkOrder(request);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping("/{id}")
    public WorkOrder getWorkOrderById(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public String updateWorkOrder(@PathVariable Long id,
                                  @RequestBody WorkOrderRequest request) {
        return workOrderService.updateWorkOrder(id, request);
    }
    
    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteWorkOrder(@PathVariable Long id) {
        return workOrderService.deleteWorkOrder(id);
    }
}