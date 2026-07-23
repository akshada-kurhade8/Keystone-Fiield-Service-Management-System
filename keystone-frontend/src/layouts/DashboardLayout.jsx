import { Link, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const navigate = useNavigate();

const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    localStorage.clear();
    navigate("/");
  }
};
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-2 bg-dark text-white vh-100 p-3 d-flex flex-column">
         <h4 className="mb-4">KEYSTONE</h4>

<Link to="/dashboard" className="d-block text-white text-decoration-none mb-3">
  Dashboard
</Link>

{["MANAGER", "DISPATCHER"].includes(role) && (
  <Link to="/customers" className="d-block text-white text-decoration-none mb-3">
    Customers
  </Link>
)}

<Link to="/sites" className="d-block text-white text-decoration-none mb-3">
  Sites
</Link>

{role === "MANAGER" && (
  <Link to="/employees" className="d-block text-white text-decoration-none mb-3">
    Employees
  </Link>
)}
{role === "MANAGER" && (
  <Link
    to="/users"
    className="d-block text-white text-decoration-none mb-3"
  >
    Users
  </Link>
)}

{["MANAGER", "TECHNICIAN"].includes(role) && (
  <Link to="/attendance" className="d-block text-white text-decoration-none mb-3">
    Attendance
  </Link>
)}

{["MANAGER", "TECHNICIAN"].includes(role) && (
  <Link to="/leaves" className="d-block text-white text-decoration-none mb-3">
    Leaves
  </Link>
)}

{role === "MANAGER" && (
  <Link to="/salary" className="d-block text-white text-decoration-none mb-3">
    Salary
  </Link>
)}

{["MANAGER", "DISPATCHER", "TECHNICIAN"].includes(role) && (
  <Link to="/workorders" className="d-block text-white text-decoration-none mb-3">
    Work Orders
  </Link>
)}

{role === "MANAGER" && (
  <Link to="/reports" className="d-block text-white text-decoration-none mb-3">
    Reports
  </Link>
)}
<div className="mt-auto border-top pt-3" > 

  <div className="mb-3">
    <h6 className="mb-1">👤 {fullName}</h6>
    <small className="text-light">
      🛡️ {role}
    </small>
  </div>

  <button
    className="btn btn-outline-light w-100"
    onClick={handleLogout}
  >
    🚪 Logout
  </button>

</div>




        </div>

        <div className="col-10 p-4">
          {children}
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;