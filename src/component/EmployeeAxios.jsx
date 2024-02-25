import React, { useEffect, useState } from "react";
import axios from "axios";
export default function EmployeeAxios() {
  const [employeeData, setEmployeeData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editClicked, setEditClicked] = useState(false);
  const [editedEmpId, setEditedEmpId] = useState(null);

  const fetchEmployeeData = async () => {
    const response = await axios.get("http://localhost:4000/users");
    // console.log(response.data);
    setEmployeeData(response.data);
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleDeleteBtn = async (empId) => {
    try {
      await axios.delete(`http://localhost:4000/users/${empId}`);
      fetchEmployeeData();
    } catch (error) {
      console.log("Error While deleting employee", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editedEmpId) {
      await axios.put(`http://localhost:4000/users/${editedEmpId}`, formData);
    } else {
      await axios.post(`http://localhost:4000/users`, formData);
    }
    fetchEmployeeData();
    setFormData({});
    setEditClicked(false);
    setEditedEmpId(null);
  };
  const handleEditBtn = async (empDetail) => {
    setFormData(empDetail);
    setEditClicked(true);
    setEditedEmpId(empDetail.id);
  };
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-8 mt-4">
            <h1 className="text-center">Employee Data</h1>
            <table className="table table-bordered table table-striped">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Others</th>
                </tr>
                {employeeData.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.number}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm mx-2"
                          onClick={() => handleEditBtn(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteBtn(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-4 mt-4">
            {editClicked ? (
              <h1 className="text-center">Update Employee</h1>
            ) : (
              <h1 className="text-center">Add Employee</h1>
            )}
            <form
              className="bg-info p-4 rounded rounded-3"
              onSubmit={handleFormSubmit}
            >
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                onChange={handleInputChange}
                value={formData.name || ""}
                className="form-control mb-2"
                name="name"
              />
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                onChange={handleInputChange}
                value={formData.email || ""}
                className="form-control mb-2"
                name="email"
              />
              <label htmlFor="number" className="form-label">
                Number:
              </label>
              <input
                type="text"
                id="number"
                onChange={handleInputChange}
                value={formData.number || ""}
                className="form-control mb-2"
                name="number"
              />

              <div className="mt-3 text-center">
                {editClicked ? (
                  <button className="btn btn-success btn-sm">
                    Update Employee
                  </button>
                ) : (
                  <button className="btn btn-success btn-sm">
                    Add Employee
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
