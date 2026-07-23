package com.keystone.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.backend.dto.SiteRequest;
import com.keystone.backend.entity.Customer;
import com.keystone.backend.entity.Site;
import com.keystone.backend.repository.CustomerRepository;
import com.keystone.backend.repository.SiteRepository;
import com.keystone.backend.service.SiteService;

@Service
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;
    private final CustomerRepository customerRepository;

    public SiteServiceImpl(SiteRepository siteRepository,
                           CustomerRepository customerRepository) {
        this.siteRepository = siteRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public String addSite(SiteRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Site site = new Site();

        site.setSiteName(request.getSiteName());
        site.setAddress(request.getAddress());
        site.setCity(request.getCity());
        site.setState(request.getState());
        site.setPincode(request.getPincode());
        site.setCustomer(customer);

        siteRepository.save(site);

        return "Site added successfully";
    }
    @Override
    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }
    
    @Override
    public String deleteSite(Long id) {

        siteRepository.deleteById(id);

        return "Site Deleted Successfully";
    }
    @Override
    public String updateSite(Long id, SiteRequest request) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        site.setSiteName(request.getSiteName());
        site.setAddress(request.getAddress());
        site.setCity(request.getCity());
        site.setState(request.getState());
        site.setPincode(request.getPincode());
        site.setCustomer(customer);

        siteRepository.save(site);

        return "Site Updated Successfully";
    }
}