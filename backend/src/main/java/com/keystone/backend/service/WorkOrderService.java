package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.WorkOrderRequest;
import com.keystone.backend.entity.WorkOrder;

public interface WorkOrderService {

    String addWorkOrder(WorkOrderRequest request);

    List<WorkOrder> getAllWorkOrders();

    WorkOrder getWorkOrderById(Long id);

    String updateWorkOrder(Long id, WorkOrderRequest request);

    String deleteWorkOrder(Long id);
}