import React, { useMemo, useState } from "react";
import {
  BsPersonPlus,
  BsPeople,
  BsPersonCheck,
  BsPersonX,
  BsClockHistory,
  BsSearch,
  BsFunnel,
  BsArrowClockwise,
  BsTrash3,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsEye,
  BsX,
  BsTelephone,
  BsEnvelope,
  BsBuilding,
  BsBriefcase,
  BsCalendar3,
  BsShieldCheck,
  BsCheckCircleFill,
  BsXCircleFill,
  BsChevronDown,
} from "react-icons/bs";
import "./employee.css";

const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP-0001",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+255 712 345 678",
    department: "Information Technology",
    position: "IT Administrator",
    status: "Active",
    joined: "05 Jan 2026",
    location: "Head Office",
    assignedAssets: 8,
  },
  {
    id: 2,
    employeeId: "EMP-0002",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+255 713 456 789",
    department: "Human Resources",
    position: "HR Manager",
    status: "Active",
    joined: "12 Jan 2026",
    location: "Head Office",
    assignedAssets: 4,
  },
  {
    id: 3,
    employeeId: "EMP-0003",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    phone: "+255 714 567 890",
    department: "Finance",
    position: "Accountant",
    status: "Active",
    joined: "20 Jan 2026",
    location: "Head Office",
    assignedAssets: 5,
  },
  {
    id: 4,
    employeeId: "EMP-0004",
    name: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+255 715 678 901",
    department: "Operations",
    position: "Operations Manager",
    status: "Inactive",
    joined: "27 Jan 2026",
    location: "Warehouse",
    assignedAssets: 3,
  },
  {
    id: 5,
    employeeId: "EMP-0005",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+255 716 789 012",
    department: "Administration",
    position: "Administrator",
    status: "Active",
    joined: "03 Feb 2026",
    location: "Head Office",
    assignedAssets: 2,
  },
  {
    id: 6,
    employeeId: "EMP-0006",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+255 717 890 123",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
    joined: "08 Feb 2026",
    location: "Head Office",
    assignedAssets: 6,
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  status: "Active",
  joined: "",
  location: "",
};

function Employee() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [openMenu, setOpenMenu] = useState(null);
  const [notification, setNotification] = useState("");

  const departments = [
    "All",
    ...new Set(employees.map((employee) => employee.department)),
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        employee.name.toLowerCase().includes(searchValue) ||
        employee.email.toLowerCase().includes(searchValue) ||
        employee.employeeId.toLowerCase().includes(searchValue) ||
        employee.phone.toLowerCase().includes(searchValue) ||
        employee.position.toLowerCase().includes(searchValue);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const totalAssets = employees.reduce(
    (total, employee) => total + Number(employee.assignedAssets || 0),
    0
  );

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setEditingId(employee.id);

    setForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      status: employee.status,
      joined: employee.joined,
      location: employee.location,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.department ||
      !form.position
    ) {
      showNotification("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      setEmployees((previous) =>
        previous.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...form,
                assignedAssets: employee.assignedAssets,
              }
            : employee
        )
      );

      showNotification("Employee updated successfully.");
    } else {
      const newEmployee = {
        id: Date.now(),
        employeeId: `EMP-${String(employees.length + 1).padStart(4, "0")}`,
        ...form,
        joined: form.joined || "20 Sep 2026",
        location: form.location || "Head Office",
        assignedAssets: 0,
      };

      setEmployees((previous) => [...previous, newEmployee]);
      showNotification("Employee added successfully.");
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteEmployee = (id) => {
    const employee = employees.find((item) => item.id === id);

    if (!employee) return;

    const confirmed = window.confirm(
      `Delete ${employee.name} from the employee list?`
    );

    if (!confirmed) return;

    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );

    setOpenMenu(null);
    showNotification("Employee deleted successfully.");
  };

  const viewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setStatusFilter("All");
  };

  const refreshEmployees = () => {
    setEmployees([...employees]);
    showNotification("Employee list refreshed.");
  };

  return (
    <div className="employee-page">
      {notification && (
        <div className="employee-notification">
          <BsCheckCircleFill />
          <span>{notification}</span>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="employee-header">
        <div className="employee-title-section">
          <div className="employee-title-icon">
            <BsPeople />
          </div>

          <div>
            <h1>Employees</h1>
            <p>
              Manage employees, departments and equipment assignments.
            </p>
          </div>
        </div>

        <div className="employee-header-actions">
          <button
            className="employee-btn employee-btn-light"
            onClick={clearFilters}
          >
            <BsTrash3 />
            Clear
          </button>

          <button
            className="employee-btn employee-btn-light"
            onClick={refreshEmployees}
          >
            <BsArrowClockwise />
            Refresh
          </button>

          <button
            className="employee-btn employee-btn-primary"
            onClick={openAddModal}
          >
            <BsPersonPlus />
            Add New Employee
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="employee-stats">
        <div className="employee-stat-card">
          <div className="employee-stat-icon blue">
            <BsPeople />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
            <small>All registered employees</small>
          </div>
        </div>

        <div className="employee-stat-card">
          <div className="employee-stat-icon green">
            <BsPersonCheck />
          </div>

          <div>
            <span>Active Employees</span>
            <strong>{activeEmployees}</strong>
            <small>Currently working</small>
          </div>
        </div>

        <div className="employee-stat-card">
          <div className="employee-stat-icon orange">
            <BsPersonX />
          </div>

          <div>
            <span>Inactive Employees</span>
            <strong>{inactiveEmployees}</strong>
            <small>Access disabled</small>
          </div>
        </div>

        <div className="employee-stat-card">
          <div className="employee-stat-icon purple">
            <BsBriefcase />
          </div>

          <div>
            <span>Assigned Equipment</span>
            <strong>{totalAssets}</strong>
            <small>Currently assigned</small>
          </div>
        </div>
      </div>

      {/* EMPLOYEE TABLE CARD */}
      <div className="employee-table-card">
        <div className="employee-table-top">
          <div>
            <h2>Employee Directory</h2>
            <p>View and manage all employees in the organization.</p>
          </div>

          <div className="employee-result-count">
            {filteredEmployees.length} employees
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="employee-filter-bar">
          <div className="employee-search">
            <BsSearch />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="employee-search-clear"
                onClick={() => setSearch("")}
              >
                <BsX />
              </button>
            )}
          </div>

          <div className="employee-filter">
            <BsBuilding />

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === "All"
                    ? "All Departments"
                    : department}
                </option>
              ))}
            </select>

            <BsChevronDown />
          </div>

          <div className="employee-filter">
            <BsFunnel />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <BsChevronDown />
          </div>

          <button
            className="employee-filter-clear"
            onClick={clearFilters}
          >
            <BsX />
            Reset
          </button>
        </div>

        {/* DESKTOP TABLE */}
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Position</th>
                <th>Equipment</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-person">
                        <div className="employee-avatar">
                          {employee.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.employeeId}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="employee-contact">
                        <span>
                          <BsEnvelope />
                          {employee.email}
                        </span>

                        <span>
                          <BsTelephone />
                          {employee.phone}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="employee-department">
                        <BsBuilding />
                        {employee.department}
                      </span>
                    </td>

                    <td>
                      <span className="employee-position">
                        {employee.position}
                      </span>
                    </td>

                    <td>
                      <span className="equipment-count">
                        <BsBriefcase />
                        {employee.assignedAssets}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`employee-status ${
                          employee.status.toLowerCase()
                        }`}
                      >
                        {employee.status === "Active" ? (
                          <BsCheckCircleFill />
                        ) : (
                          <BsXCircleFill />
                        )}

                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <span className="employee-joined">
                        <BsCalendar3 />
                        {employee.joined}
                      </span>
                    </td>

                    <td>
                      <div className="employee-action-wrapper">
                        <button
                          className="employee-action-btn"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === employee.id
                                ? null
                                : employee.id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {openMenu === employee.id && (
                          <div className="employee-action-menu">
                            <button
                              onClick={() => viewEmployee(employee)}
                            >
                              <BsEye />
                              View
                            </button>

                            <button
                              onClick={() => openEditModal(employee)}
                            >
                              <BsPencilSquare />
                              Edit
                            </button>

                            <button
                              className="danger"
                              onClick={() =>
                                deleteEmployee(employee.id)
                              }
                            >
                              <BsTrash3 />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="employee-empty">
                      <BsPeople />
                      <h3>No employees found</h3>
                      <p>
                        Try changing your search or filter options.
                      </p>

                      <button
                        className="employee-btn employee-btn-primary"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="employee-mobile-list">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div className="employee-mobile-card" key={employee.id}>
                <div className="employee-mobile-header">
                  <div className="employee-person">
                    <div className="employee-avatar">
                      {employee.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)}
                    </div>

                    <div>
                      <strong>{employee.name}</strong>
                      <span>{employee.employeeId}</span>
                    </div>
                  </div>

                  <button
                    className="employee-action-btn"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === employee.id
                          ? null
                          : employee.id
                      )
                    }
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>

                {openMenu === employee.id && (
                  <div className="employee-mobile-actions">
                    <button onClick={() => viewEmployee(employee)}>
                      <BsEye />
                      View
                    </button>

                    <button onClick={() => openEditModal(employee)}>
                      <BsPencilSquare />
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      <BsTrash3 />
                      Delete
                    </button>
                  </div>
                )}

                <div className="employee-mobile-info">
                  <div>
                    <span>Email</span>
                    <strong>{employee.email}</strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>{employee.phone}</strong>
                  </div>

                  <div>
                    <span>Department</span>
                    <strong>{employee.department}</strong>
                  </div>

                  <div>
                    <span>Position</span>
                    <strong>{employee.position}</strong>
                  </div>

                  <div>
                    <span>Equipment</span>
                    <strong>{employee.assignedAssets}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong
                      className={`mobile-status ${
                        employee.status.toLowerCase()
                      }`}
                    >
                      {employee.status}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="employee-empty">
              <BsPeople />
              <h3>No employees found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {showModal && (
        <div
          className="employee-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="employee-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="employee-modal-header">
              <div>
                <div className="employee-modal-icon">
                  {editingId ? <BsPencilSquare /> : <BsPersonPlus />}
                </div>

                <div>
                  <h2>
                    {editingId
                      ? "Edit Employee"
                      : "Add New Employee"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update employee information."
                      : "Enter employee information below."}
                  </p>
                </div>
              </div>

              <button
                className="employee-modal-close"
                onClick={() => setShowModal(false)}
              >
                <BsX />
              </button>
            </div>

            <form
              className="employee-form"
              onSubmit={handleSubmit}
            >
              <div className="employee-form-section">
                <h3>Personal Information</h3>

                <div className="employee-form-grid">
                  <div className="employee-form-group">
                    <label>
                      Full Name <span>*</span>
                    </label>

                    <div className="employee-input-icon">
                      <BsPeople />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>
                      Email Address <span>*</span>
                    </label>

                    <div className="employee-input-icon">
                      <BsEnvelope />
                      <input
                        type="email"
                        name="email"
                        placeholder="employee@company.com"
                        value={form.email}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>
                      Phone Number <span>*</span>
                    </label>

                    <div className="employee-input-icon">
                      <BsTelephone />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+255 7XX XXX XXX"
                        value={form.phone}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>Location</label>

                    <div className="employee-input-icon">
                      <BsBuilding />
                      <input
                        type="text"
                        name="location"
                        placeholder="Head Office"
                        value={form.location}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="employee-form-section">
                <h3>Employment Information</h3>

                <div className="employee-form-grid">
                  <div className="employee-form-group">
                    <label>
                      Department <span>*</span>
                    </label>

                    <div className="employee-input-icon">
                      <BsBuilding />

                      <select
                        name="department"
                        value={form.department}
                        onChange={handleInput}
                      >
                        <option value="">
                          Select department
                        </option>
                        {departments
                          .filter(
                            (department) => department !== "All"
                          )
                          .map((department) => (
                            <option
                              key={department}
                              value={department}
                            >
                              {department}
                            </option>
                          ))}

                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Human Resources">
                          Human Resources
                        </option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">
                          Operations
                        </option>
                        <option value="Administration">
                          Administration
                        </option>
                        <option value="Procurement">
                          Procurement
                        </option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>
                      Position <span>*</span>
                    </label>

                    <div className="employee-input-icon">
                      <BsBriefcase />

                      <input
                        type="text"
                        name="position"
                        placeholder="Job position"
                        value={form.position}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>Status</label>

                    <div className="employee-input-icon">
                      <BsShieldCheck />

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleInput}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">
                          Inactive
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="employee-form-group">
                    <label>Joining Date</label>

                    <div className="employee-input-icon">
                      <BsCalendar3 />

                      <input
                        type="date"
                        name="joined"
                        value={form.joined}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="employee-form-footer">
                <button
                  type="button"
                  className="employee-btn employee-btn-light"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="employee-btn employee-btn-primary"
                >
                  {editingId ? (
                    <>
                      <BsCheckCircleFill />
                      Update Employee
                    </>
                  ) : (
                    <>
                      <BsPersonPlus />
                      Add Employee
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW EMPLOYEE MODAL */}
      {showViewModal && selectedEmployee && (
        <div
          className="employee-modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="employee-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="employee-modal-header">
              <div>
                <div className="employee-modal-icon">
                  <BsEye />
                </div>

                <div>
                  <h2>Employee Details</h2>
                  <p>Complete employee information.</p>
                </div>
              </div>

              <button
                className="employee-modal-close"
                onClick={() => setShowViewModal(false)}
              >
                <BsX />
              </button>
            </div>

            <div className="employee-profile">
              <div className="employee-profile-avatar">
                {selectedEmployee.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)}
              </div>

              <h2>{selectedEmployee.name}</h2>
              <p>{selectedEmployee.position}</p>

              <span
                className={`employee-status ${
                  selectedEmployee.status.toLowerCase()
                }`}
              >
                {selectedEmployee.status === "Active" ? (
                  <BsCheckCircleFill />
                ) : (
                  <BsXCircleFill />
                )}

                {selectedEmployee.status}
              </span>
            </div>

            <div className="employee-details-grid">
              <div className="employee-detail-box">
                <span>Employee ID</span>
                <strong>{selectedEmployee.employeeId}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Department</span>
                <strong>{selectedEmployee.department}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Email</span>
                <strong>{selectedEmployee.email}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Phone</span>
                <strong>{selectedEmployee.phone}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Location</span>
                <strong>{selectedEmployee.location}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Joined</span>
                <strong>{selectedEmployee.joined}</strong>
              </div>

              <div className="employee-detail-box">
                <span>Assigned Equipment</span>
                <strong>
                  {selectedEmployee.assignedAssets} items
                </strong>
              </div>

              <div className="employee-detail-box">
                <span>Position</span>
                <strong>{selectedEmployee.position}</strong>
              </div>
            </div>

            <div className="employee-view-footer">
              <button
                className="employee-btn employee-btn-light"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="employee-btn employee-btn-primary"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedEmployee);
                }}
              >
                <BsPencilSquare />
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;