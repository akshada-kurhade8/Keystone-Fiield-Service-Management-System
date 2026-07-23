import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [role, setRole] = useState("");


const handleLogin = async (e) => {

  e.preventDefault();

  try {
    const response = await API.post("/auth/login", {
      email,
      password,
      role
    });

    console.log("SUCCESS:", response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("fullName", response.data.fullName);

    navigate("/dashboard");

  } catch (error) {

    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("FULL:", error);

    alert("Login Failed");
  }
};

  return (
  //  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0c1c46, #c5cad9, #132346)",
  }}
>
      <div
 className="card mx-auto shadow-lg p-4 border-0"
  style={{
  width: "100%",
  maxWidth: "520px",
  borderRadius: "18px",
  padding: "20px"
}}
>
        <div className="text-center mb-4" >

  <h1 className="fw-bold mb-1" style={{ color: "#0d3a7a", letterSpacing: "2px" }}>
    KEYSTONE
  </h1>

  <p className="text-muted mb-3">
    Field Service Management Platform
  </p>

  <h4 className="fw-semibold">
    Welcome Back 👋
  </h4>

  <small className="text-muted">
   Access your workspace securely.
  </small>

</div>

     <form onSubmit={handleLogin}>

  <input
    type="email"
    className="form-control mb-3"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <div className="input-group mb-3">

  <input
    type={showPassword ? "text" : "password"}
    className="form-control"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className="btn btn-outline-secondary"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>

</div>

<div className="mb-3">
  <select
    className="form-select"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
  >
    <option value="">Select Role</option>
    <option value="MANAGER">👑 Manager</option>
    <option value="DISPATCHER">🧑‍💼 Dispatcher</option>
    <option value="TECHNICIAN">🛠 Technician</option>
    <option value="CUSTOMER">👤 Customer</option>
  </select>
</div>

  <button
    type="submit"
    className="btn btn-primary w-100 py-2 fw-semibold"  style={{ backgroundColor: "#144fa3", letterSpacing: "2px" }}
  >
    Login
  </button>

</form>
      </div>
    </div>
  );
}

export default Login;