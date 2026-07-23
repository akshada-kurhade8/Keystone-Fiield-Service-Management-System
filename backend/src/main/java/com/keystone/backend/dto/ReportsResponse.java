package com.keystone.backend.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class ReportsResponse {

    private long totalCustomers;
    private long totalSites;
    private long totalEmployees;
    private long totalAttendance;
    private long totalWorkOrders;
    private long totalSalaries;

    public ReportsResponse() {
    }

    public ReportsResponse(long totalCustomers, long totalSites,
                           long totalEmployees, long totalAttendance,
                           long totalWorkOrders, long totalSalaries) {
        this.totalCustomers = totalCustomers;
        this.totalSites = totalSites;
        this.totalEmployees = totalEmployees;
        this.totalAttendance = totalAttendance;
        this.totalWorkOrders = totalWorkOrders;
        this.totalSalaries = totalSalaries;
    }

    // Generate getters and setters
    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalSites() {
        return totalSites;
    }

    public void setTotalSites(long totalSites) {
        this.totalSites = totalSites;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public long getTotalWorkOrders() {
        return totalWorkOrders;
    }

    public void setTotalWorkOrders(long totalWorkOrders) {
        this.totalWorkOrders = totalWorkOrders;
    }

    public long getTotalSalaries() {
        return totalSalaries;
    }

    public void setTotalSalaries(long totalSalaries) {
        this.totalSalaries = totalSalaries;
    }
}