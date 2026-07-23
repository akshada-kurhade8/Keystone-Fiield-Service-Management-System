package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

}