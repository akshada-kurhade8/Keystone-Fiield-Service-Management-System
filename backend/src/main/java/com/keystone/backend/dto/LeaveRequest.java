package com.keystone.backend.dto;

import java.time.LocalDate;

public class LeaveRequest {

    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private String status;
    private Long employeeId;

    public LeaveRequest() {
    }

    public LeaveRequest(LocalDate fromDate, LocalDate toDate,
                        String reason, String status, Long employeeId) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status;
        this.employeeId = employeeId;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
}