
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Sites() {

  const [sites, setSites] = useState([]);

  const [siteName, setSiteName] = useState("");
  const [address, setAddress] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
  fetchCustomers();
  fetchSites();
}, []);

const fetchCustomers = async () => {
  try {
    const response = await API.get("/customers");
    setCustomers(response.data);
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

const addSite = async () => {

  try {

    if (isEditing) {

      await API.put(`/sites/${editId}`, {
        siteName,
        address,
        customerId,
      });

      alert("Site Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/sites", {
        siteName,
        address,
        customerId,
      });

      alert("Site Added Successfully");
    }

    fetchSites();

    setSiteName("");
    setAddress("");
    setCustomerId("");

  } catch (error) {
    console.log(error);
  }
};

const deleteSite = async (id) => {
  try {
    await API.delete(`/sites/${id}`);

    alert("Site Deleted Successfully");

    fetchSites();
  } catch (error) {
    console.log(error);
  }
};
const editSite = (site) => {

  setSiteName(site.siteName);
  setAddress(site.address);
  setCustomerId(site.customer.id);

  setEditId(site.id);
  setIsEditing(true);
};


  return (
    <DashboardLayout>
      <h2>Sites</h2>


      <div className="card p-3 mt-3">

  <h4>Add Site</h4>

  <input
    type="text"
    className="form-control mb-2"
    placeholder="Site Name"
    value={siteName}
    onChange={(e) => setSiteName(e.target.value)}
  />

  <input
    type="text"
    className="form-control mb-2"
    placeholder="Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

  <select
    className="form-control mb-2"
    value={customerId}
    onChange={(e) => setCustomerId(e.target.value)}
  >
    <option value="">Select Customer</option>

    {customers.map((customer) => (
      <option key={customer.id} value={customer.id}>
        {customer.companyName}
      </option>
    ))}

  </select>
<button
  className="btn btn-success"
  onClick={addSite}
>
  {isEditing ? "Update Site" : "Save Site"}
</button>

</div>

<table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>ID</th>
      <th>Site Name</th>
      <th>Address</th>
      <th>Customer</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {sites.map((site) => (
      <tr key={site.id}>
        <td>{site.id}</td>
        <td>{site.siteName}</td>
        <td>{site.address}</td>
        <td>{site.customer?.companyName}</td>

        <td>
          <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editSite(site)}
>
  Edit
</button>

          <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteSite(site.id)}
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

export default Sites;

