

import Customers from "./pages/Customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Employees from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Salary from "./pages/Salary";
import WorkOrders from "./pages/WorkOrders";
import Reports from "./pages/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER"]}>
  <Customers />
</ProtectedRoute>} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/employees" element={<ProtectedRoute allowedRoles={["MANAGER"]}>
  <Employees />
</ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute allowedRoles={["MANAGER", "TECHNICIAN"]}>
  <Attendance />
</ProtectedRoute>} />
        <Route path="/leaves" element={<ProtectedRoute allowedRoles={["MANAGER", "TECHNICIAN"]}>
  <Leaves />
</ProtectedRoute>} />
       <Route
  path="/salary"
  element={
    <ProtectedRoute allowedRoles={["MANAGER"]}>
      <Salary />
    </ProtectedRoute>
  }
/>
        <Route path="/workorders" element={<ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN"]}>
  <WorkOrders />
</ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={["MANAGER"]}>
  <Reports />
</ProtectedRoute>} />
<Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;