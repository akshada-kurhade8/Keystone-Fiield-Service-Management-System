import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Salary() {

  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [basicSalary, setBasicSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [deduction, setDeduction] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  fetchSalaries();
  fetchEmployees();
}, []);

const fetchEmployees = async () => {
  try {
    const response = await API.get("/employees");
    setEmployees(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchSalaries = async () => {
  try {
    const response = await API.get("/salaries");
    setSalaries(response.data);
  } catch (error) {
    console.log(error);
  }
};
const addSalary = async () => {
  try {

    if (isEditing) {

      await API.put(`/salaries/${editId}`, {
        basicSalary,
        bonus,
        deduction,
        employeeId: Number(employeeId),
      });

      alert("Salary Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/salaries", {
        basicSalary,
        bonus,
        deduction,
        employeeId: Number(employeeId),
      });

      alert("Salary Added Successfully");
    }

    fetchSalaries();

    setBasicSalary("");
    setBonus("");
    setDeduction("");
    setEmployeeId("");

  } catch (error) {
    console.log(error);
  }
};
const editSalary = (salary) => {

  setBasicSalary(salary.basicSalary);
  setBonus(salary.bonus);
  setDeduction(salary.deduction);
  setEmployeeId(salary.employee.id);

  setEditId(salary.id);
  setIsEditing(true);
};
const deleteSalary = async (id) => {
  try {

    await API.delete(`/salaries/${id}`);

    alert("Salary Deleted Successfully");

    fetchSalaries();

  } catch (error) {
    console.log(error);
  }
};

return (
    <DashboardLayout>

      <h2>Salary</h2>

      <div className="card p-3 mt-3">

        <h4>Add Salary</h4>

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Basic Salary"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Bonus"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Deduction"
          value={deduction}
          onChange={(e) => setDeduction(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.fullName}
            </option>
          ))}
        </select>

        <button
          className="btn btn-success"
          onClick={addSalary}
        >
          {isEditing ? "Update Salary" : "Save Salary"}
        </button>

      </div>
      <table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>ID</th>
      <th>Basic Salary</th>
      <th>Bonus</th>
      <th>Deduction</th>
      <th>Employee</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {salaries.map((salary) => (
      <tr key={salary.id}>
        <td>{salary.id}</td>
        <td>{salary.basicSalary}</td>
        <td>{salary.bonus}</td>
        <td>{salary.deduction}</td>
        <td>{salary.employee?.fullName}</td>

        <td>
          <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editSalary(salary)}
>
  Edit
</button>

         <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteSalary(salary.id)}
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

export default Salary;