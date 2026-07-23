import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function WorkOrders() {

  const [workOrders, setWorkOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sites, setSites] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [siteId, setSiteId] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  fetchWorkOrders();
  fetchEmployees();
  fetchSites();
}, []);

const fetchWorkOrders = async () => {
  try {
    const response = await API.get("/workorders");
    setWorkOrders(response.data);
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

const fetchSites = async () => {
  try {
    const response = await API.get("/sites");
    setSites(response.data);
  } catch (error) {
    console.log(error);
  }
};

const addWorkOrder = async () => {
  try {

    if (isEditing) {

      await API.put(`/workorders/${editId}`, {
        title,
        description,
        status,
        employeeId: Number(employeeId),
        siteId: Number(siteId),
      });

      alert("Work Order Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/workorders", {
        title,
        description,
        status,
        employeeId: Number(employeeId),
        siteId: Number(siteId),
      });

      alert("Work Order Added Successfully");
    }

    fetchWorkOrders();

    setTitle("");
    setDescription("");
    setStatus("");
    setEmployeeId("");
    setSiteId("");

  } catch (error) {
    console.log(error);
  }
};
const editWorkOrder = (workOrder) => {

  setTitle(workOrder.title);
  setDescription(workOrder.description);
  setStatus(workOrder.status);

  setEmployeeId(workOrder.employee.id);
  setSiteId(workOrder.site.id);

  setEditId(workOrder.id);
  setIsEditing(true);

};
const deleteWorkOrder = async (id) => {

  try {

    await API.delete(`/workorders/${id}`);

    alert("Work Order Deleted Successfully");

    fetchWorkOrders();

  } catch(error) {
    console.log(error);
  }

};

return (
  <DashboardLayout>

    <h2>Work Orders</h2>

    <div className="card p-3 mt-3">
      <h4>Add Work Order</h4>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="form-control mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
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
  onClick={addWorkOrder}
>
        {isEditing ? "Update Work Order" : "Save Work Order"}
      </button>

    </div>
    <table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Status</th>
      <th>Employee</th>
      <th>Site</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {workOrders.map((workOrder) => (
      <tr key={workOrder.id}>
        <td>{workOrder.id}</td>
        <td>{workOrder.title}</td>
        <td>{workOrder.description}</td>
        <td>{workOrder.status}</td>
        <td>{workOrder.employee?.fullName}</td>
        <td>{workOrder.site?.siteName}</td>

        <td>
          <button
 className="btn btn-warning btn-sm me-2"
 onClick={() => editWorkOrder(workOrder)}
>
 Edit
</button>

          <button
 className="btn btn-danger btn-sm"
 onClick={() => deleteWorkOrder(workOrder.id)}
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

export default WorkOrders;