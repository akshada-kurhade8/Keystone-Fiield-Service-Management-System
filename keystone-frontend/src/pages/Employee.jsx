import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [sites, setSites] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [siteId, setSiteId] = useState("");
  const [editId, setEditId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  fetchEmployees();
  fetchSites();
}, []);

const fetchEmployees = async () => {
  try {
    const response = await API.get("/employees");
    setEmployees(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchSites = async () => {
  try {
    const response = await API.get("/sites");
    setSites(response.data);
  } catch (error) {
    console.log(error);
  }
};

const addEmployee = async () => {
  try {

    if (isEditing) {

      await API.put(`/employees/${editId}`, {
        fullName,
        email,
        phone,
        designation,
        salary,
        siteId,
      });

      alert("Employee Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/employees", {
        fullName,
        email,
        phone,
        designation,
        salary,
        siteId,
      });

      alert("Employee Added Successfully");
    }

    fetchEmployees();

    setFullName("");
    setEmail("");
    setPhone("");
    setDesignation("");
    setSalary("");
    setSiteId("");

  } catch (error) {
    console.log(error);
  }
};
const deleteEmployee = async (id) => {
  try {

    await API.delete(`/employees/${id}`);

    alert("Employee Deleted Successfully");

    fetchEmployees();

  } catch (error) {
    console.log(error);
  }
};

const editEmployee = (employee) => {

  setFullName(employee.fullName);
  setEmail(employee.email);
  setPhone(employee.phone);
  setDesignation(employee.designation);
  setSalary(employee.salary);
  setSiteId(employee.site.id);

  setEditId(employee.id);
  setIsEditing(true);
};

  return (
    <DashboardLayout>
      <h2>Employees</h2>

      <div className="card p-3 mt-3">

  <h4>Add Employee</h4>

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
    type="text"
    className="form-control mb-2"
    placeholder="Designation"
    value={designation}
    onChange={(e) => setDesignation(e.target.value)}
  />

  <input
    type="number"
    className="form-control mb-2"
    placeholder="Salary"
    value={salary}
    onChange={(e) => setSalary(e.target.value)}
  />

  <select
    className="form-control mb-2"
    value={siteId}
    onChange={(e) => setSiteId(e.target.value)}
  >
    <option value="">Select Site</option>

    {sites.map((site) => (
      <option key={site.id} value={site.id}>
        {site.siteName}
      </option>
    ))}
  </select>

 <button
  className="btn btn-success"
  onClick={addEmployee}
>
  {isEditing ? "Update Employee" : "Save Employee"}
</button>

</div>
<table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Designation</th>
      <th>Salary</th>
      <th>Site</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.fullName}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.designation}</td>
        <td>{employee.salary}</td>
        <td>{employee.site?.siteName}</td>

        <td>
          <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editEmployee(employee)}
>
  Edit
</button>

          <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteEmployee(employee.id)}
>
  Delete
</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </DashboardLayout>
  );
}

export default Employees;