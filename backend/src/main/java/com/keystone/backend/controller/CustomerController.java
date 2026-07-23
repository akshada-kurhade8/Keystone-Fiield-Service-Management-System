package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.CustomerRequest;
import com.keystone.backend.entity.Customer;
import com.keystone.backend.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public String addCustomer(@RequestBody CustomerRequest request) {
        return customerService.addCustomer(request);
    }
    
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }
    
    @PutMapping("/{id}")
    public String updateCustomer(@PathVariable Long id,
                                 @RequestBody CustomerRequest request) {
        return customerService.updateCustomer(id, request);
    }
    
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        return customerService.deleteCustomer(id);
    }
}