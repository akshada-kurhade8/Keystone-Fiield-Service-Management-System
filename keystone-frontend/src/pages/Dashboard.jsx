import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Dashboard() {
  const fullName = localStorage.getItem("fullName");
const role = localStorage.getItem("role");

const today = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 17) {
  greeting = "Good Afternoon";
}

  return (
    <DashboardLayout>

      <h2>Dashboard</h2>
      <div className="card shadow border-0 p-4 mb-4">
        {/* <div
  className="card shadow border-0 p-4 mb-4 text-white"
  style={{
    background: "linear-gradient(135deg, #0d6efd, #6610f2)",
    borderRadius: "15px",
  }}
></div> */}
  <h3>{greeting}, {fullName} 👋</h3>

  <p className="text-muted">
    Welcome back to "KEYSTONE - Field Service Management Platform".
  </p>

  <hr />

  <p className="mb-1">
    <strong>🛡️ Role:</strong> {role}
  </p>

  <p className="mb-0">
    <strong>📅 Today:</strong> {today}
  </p>
</div>

      <div className="row mt-4">

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Customers</h5>
            <h2>{dashboard.totalCustomers}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Employees</h5>
            <h2>{dashboard.totalEmployees}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Sites</h5>
            <h2>{dashboard.totalSites}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Attendance</h5>
            <h2>{dashboard.totalAttendance}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Leaves</h5>
            <h2>{dashboard.totalLeaves}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Work Orders</h5>
            <h2>{dashboard.totalWorkOrders}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 shadow">
            <h5>Total Salaries</h5>
            <h2>{dashboard.totalSalaries}</h2>
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;