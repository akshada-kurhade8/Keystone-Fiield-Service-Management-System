package com.keystone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.backend.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}