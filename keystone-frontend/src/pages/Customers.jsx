import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 const addCustomer = async () => {
  try {

    if (isEditing) {

      await API.put(`/customers/${editId}`, {
        companyName,
        contactPerson,
        email,
        phone,
      });

      alert("Customer Updated Successfully");

      setIsEditing(false);
      setEditId(null);

    } else {

      await API.post("/customers", {
        companyName,
        contactPerson,
        email,
        phone,
      });

      alert("Customer Added Successfully");
    }

    fetchCustomers();

    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");

  } catch (error) {
    console.log(error);
  }
};

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/customers/${id}`);

      alert("Customer Deleted Successfully");

      fetchCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  const editCustomer = (customer) => {

  setCompanyName(customer.companyName);
  setContactPerson(customer.contactPerson);
  setEmail(customer.email);
  setPhone(customer.phone);

  setEditId(customer.id);
  setIsEditing(true);
};

  return (
    <DashboardLayout>

      <div className="d-flex justify-content-between mb-3">
        <h2>Customers</h2>

        <button className="btn btn-primary">
          Add Customer
        </button>
      </div>

      <div className="card p-3 mb-4">
        <h4>Add Customer</h4>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
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

        <button
          className="btn btn-success"
          onClick={addCustomer}
        >
         {isEditing ? "Update Customer" : "Save Customer"}
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.companyName}</td>
              <td>{customer.contactPerson}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editCustomer(customer)}
>
  Edit
</button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCustomer(customer.id)}
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

export default Customers;