import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Users() {
    const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");

const saveUser = async () => {

  try {

    await API.post("/auth/register", {
      fullName,
      email,
      phone,
      password,
      role
    });

    alert("User Added Successfully");

    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");

  } catch (error) {

    alert(
      error.response?.data || error.message
    );

    console.log(error);
  }
};
  return (
    <DashboardLayout>
      <h2>Users</h2>

      <div className="card p-3 mt-3">
        <h4>Add User</h4>

       <input
  type="text"
  className="form-control mb-2"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>

        <input
  type="email"
  className="form-control mb-2"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

       <input
  type="text"
  className="form-control mb-2"
  placeholder="Phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

       <input
  type="password"
  className="form-control mb-2"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>



       <select
  className="form-control mb-2"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="">Select Role</option>
  <option value="MANAGER">Manager</option>
  <option value="DISPATCHER">Dispatcher</option>
  <option value="TECHNICIAN">Technician</option>
  <option value="CUSTOMER">Customer</option>
</select>

        <button
  className="btn btn-success"
  onClick={saveUser}
>
  Save User
</button>
      </div>
    </DashboardLayout>
  );
}

export default Users;