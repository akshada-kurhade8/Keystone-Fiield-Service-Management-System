import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Reports() {

  const [reports, setReports] = useState({});

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await API.get("/reports");
      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h2>Reports</h2>
      <div className="row mt-4">

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Customers</h5>
      <h2>{reports.totalCustomers}</h2>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Sites</h5>
      <h2>{reports.totalSites}</h2>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Employees</h5>
      <h2>{reports.totalEmployees}</h2>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Attendance</h5>
      <h2>{reports.totalAttendance}</h2>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Work Orders</h5>
      <h2>{reports.totalWorkOrders}</h2>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card p-3">
      <h5>Total Salaries</h5>
      <h2>{reports.totalSalaries}</h2>
    </div>
  </div>

</div>

    </DashboardLayout>
  );
}

export default Reports;