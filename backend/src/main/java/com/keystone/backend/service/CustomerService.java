package com.keystone.backend.service;

import java.util.List;

import com.keystone.backend.dto.CustomerRequest;
import com.keystone.backend.entity.Customer;

public interface CustomerService {

    String addCustomer(CustomerRequest request);
    List<Customer> getAllCustomers();
    Customer getCustomerById(Long id);
    String updateCustomer(Long id, CustomerRequest request);
    String deleteCustomer(Long id);

}