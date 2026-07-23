import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Leaves() {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
   const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  fetchLeaves();
  fetchEmployees();
}, []);

const fetchLeaves = async () => {
  try {
    const response = await API.get("/leaves");
    setLeaves(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchEmployees = async () => {
  try {
    const response = await API.get("/employees");
    setEmployees(response.data);
  } catch (error) {
    console.log(error);
  }
};

const addLeave = async () => {
  console.log("Button Clicked");
console.log("isEditing:", isEditing);
console.log("editId:", editId);
  try {

    if (isEditing) {
      console.log("editId =", editId);
console.log(`URL = /leaves/${editId}`);

      await API.put(`/leaves/${editId}`, {
        fromDate,
        toDate,
        reason,
        status,
        employeeId: Number(employeeId),
      });

      alert("Leave Updated Successfully");

      setIsEditing(false);
      setEditId(null);

      fetchLeaves();

setFromDate("");
setToDate("");
setReason("");
setStatus("");
setEmployeeId("");

    } else {

      await API.post("/leaves", {
  fromDate,
  toDate,
  reason,
  status,
  employeeId,
});
      alert("Leave Added Successfully");
    }

    fetchLeaves();

    setFromDate("");
    setToDate("");
    setReason("");
    setStatus("");
    setEmployeeId("");

  } catch (error) {
    console.log(error);
  }
};

const editLeave = (leave) => {

  setFromDate(leave.fromDate);
  setToDate(leave.toDate);
  setReason(leave.reason);
  setStatus(leave.status);
  setEmployeeId(leave.employee.id);

  setEditId(leave.id);
  setIsEditing(true);

};

const deleteLeave = async (id) => {
  try {

    await API.delete(`/leaves/${id}`);

    alert("Leave Deleted Successfully");

    fetchLeaves();

  } catch (error) {
    console.log(error);
  }
};

return (
  <DashboardLayout>
    <h2>Leaves</h2>
    <div className="card p-3 mt-3">

  <h4>Add Leave</h4>
  <label>From Date</label>
<input
  type="date"
  className="form-control mb-2"
  value={fromDate}
  onChange={(e) => setFromDate(e.target.value)}
/>

<label>To Date</label>
<input
  type="date"
  className="form-control mb-2"
  value={toDate}
  onChange={(e) => setToDate(e.target.value)}
/>

 

  <input
    type="text"
    className="form-control mb-2"
    placeholder="Reason"
    value={reason}
    onChange={(e) => setReason(e.target.value)}
  />

  <select
    className="form-control mb-2"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="">Select Status</option>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
  </select>

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
  onClick={addLeave}
>
  {isEditing ? "Update Leave" : "Save Leave"}
</button>

</div>

<table className="table table-bordered mt-4">

  <thead>
    <tr>
      <th>ID</th>
      <th>From Date</th>
<th>To Date</th>
      <th>Reason</th>
      <th>Status</th>
      <th>Employee</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>

    {leaves.map((leave) => (
      <tr key={leave.id}>

        <td>{leave.id}</td>
<td>{leave.fromDate}</td>
<td>{leave.toDate}</td>
<td>{leave.reason}</td>
<td>{leave.status}</td>
<td>{leave.employee?.fullName}</td>

        <td>

          <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editLeave(leave)}
>
  Edit
</button>

          <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteLeave(leave.id)}
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

export default Leaves;