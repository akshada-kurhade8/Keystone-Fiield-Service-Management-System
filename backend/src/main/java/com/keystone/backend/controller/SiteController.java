package com.keystone.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.backend.dto.SiteRequest;
import com.keystone.backend.entity.Site;
import com.keystone.backend.service.SiteService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public String addSite(@RequestBody SiteRequest request) {
        return siteService.addSite(request);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping
    public List<Site> getAllSites() {
        return siteService.getAllSites();
    }
    
    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public String deleteSite(@PathVariable Long id) {
        return siteService.deleteSite(id);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public String updateSite(@PathVariable Long id,
                             @RequestBody SiteRequest request) {
        return siteService.updateSite(id, request);
    }
}