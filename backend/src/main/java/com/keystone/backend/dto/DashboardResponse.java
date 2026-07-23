package com.keystone.backend.dto;

public class DashboardResponse {

    private long totalCustomers;
    private long totalEmployees;
    private long totalSites;
    private long totalAttendance;
    private long totalLeaves;
    private long totalWorkOrders;
    private long totalSalaries;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalCustomers, long totalEmployees,
                             long totalSites, long totalAttendance,
                             long totalLeaves, long totalWorkOrders,
                             long totalSalaries) {
        this.totalCustomers = totalCustomers;
        this.totalEmployees = totalEmployees;
        this.totalSites = totalSites;
        this.totalAttendance = totalAttendance;
        this.totalLeaves = totalLeaves;
        this.totalWorkOrders = totalWorkOrders;
        this.totalSalaries =totalSalaries;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getTotalSites() {
        return totalSites;
    }

    public void setTotalSites(long totalSites) {
        this.totalSites = totalSites;
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public long getTotalLeaves() {
        return totalLeaves;
    }

    public void setTotalLeaves(long totalLeaves) {
        this.totalLeaves = totalLeaves;
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