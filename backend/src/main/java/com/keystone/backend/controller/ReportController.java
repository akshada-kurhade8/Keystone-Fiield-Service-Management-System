package com.keystone.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.backend.dto.ReportsResponse;
import com.keystone.backend.service.ReportService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping
    public ReportsResponse getReport() {
        return reportService.getReport();
    }
}