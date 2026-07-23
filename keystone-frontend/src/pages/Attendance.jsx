import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Attendance() {

  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [attendanceDate, setAttendanceDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [status, setStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [editId, setEditId] = useState(null);
const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const fetchAttendance = async () => {
  try {
    const response = await API.get("/attendance");
    console.log(response.data);
    setAttendance(response.data);
  } catch (error) {
    console.log(error);
  }
};

const addAttendance = async () => {
  try {

    if (isEditing) {

      await API.put(`/attendance/${editId}`, {
        attendanceDate,
        checkInTime,
        checkOutTime,
        status,
        employeeId,
      });

      alert("Attendance Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/attendance", {
        attendanceDate,
        checkInTime,
        checkOutTime,
        status,
        employeeId,
      });

      alert("Attendance Added Successfully");
    }

    fetchAttendance();

    setAttendanceDate("");
    setCheckInTime("");
    setCheckOutTime("");
    setStatus("");
    setEmployeeId("");

  } catch (error) {
    console.log(error);
  }
};

const editAttendance = (item) => {

  setAttendanceDate(item.attendanceDate);
  setCheckInTime(item.checkInTime);
  setCheckOutTime(item.checkOutTime);
  setStatus(item.status);
  setEmployeeId(item.employee.id);

  setEditId(item.id);
  setIsEditing(true);
};

const deleteAttendance = async (id) => {
  try {

    await API.delete(`/attendance/${id}`);

    alert("Attendance Deleted Successfully");

    fetchAttendance();

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

  return (
    <DashboardLayout>
      <h2>Attendance</h2>

      <div className="card p-3 mt-3">

  <h4>Add Attendance</h4>

  <input
    type="date"
    className="form-control mb-2"
    value={attendanceDate}
    onChange={(e) => setAttendanceDate(e.target.value)}
  />

 <label className="mb-1">Check In Time</label>
<input
  type="time"
  className="form-control mb-2"
  value={checkInTime}
  onChange={(e) => setCheckInTime(e.target.value)}
/>

<label className="mb-1">Check Out Time</label>
<input
  type="time"
  className="form-control mb-2"
  value={checkOutTime}
  onChange={(e) => setCheckOutTime(e.target.value)}
/>

  <select
    className="form-control mb-2"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="">Select Status</option>
    <option value="Present">Present</option>
    <option value="Absent">Absent</option>
    <option value="Leave">Leave</option>
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
  onClick={addAttendance}
>
  {isEditing ? "Update Attendance" : "Save Attendance"}
</button>

</div>

<table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Check In</th>
      <th>Check Out</th>
      <th>Status</th>
      <th>Employee</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {attendance.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
       <td>{item.attendanceDate}</td>
<td style={{ color: "black" }}>{item.checkInTime}</td>
<td style={{ color: "black" }}>{item.checkOutTime}</td>
<td>{item.status}</td>
        <td>{item.employee?.fullName}</td>

        <td>
          <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editAttendance(item)}
>
  Edit
</button>

          <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteAttendance(item.id)}
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

export default Attendance;