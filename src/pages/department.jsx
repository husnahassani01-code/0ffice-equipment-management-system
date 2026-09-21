import React, { useMemo, useState } from "react";
import {
  BsBuilding,
  BsPlus,
  BsSearch,
  BsFilter,
  BsArrowClockwise,
  BsTrash,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsPeople,
  BsBoxSeam,
  BsPersonCheck,
  BsX,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsEye,
  BsChevronDown,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
  BsShieldCheck,
} from "react-icons/bs";
import "./department.css";

const initialDepartments = [
  {
    id: 1,
    name: "Information Technology",
    code: "IT",
    manager: "John Smith",
    email: "john.smith@company.com",
    phone: "+255 712 345 678",
    location: "Head Office - Floor 2",
    employees: 12,
    assets: 48,
    status: "Active",
    description: "Manages company technology, computers, networking and IT infrastructure.",
  },
  {
    id: 2,
    name: "Human Resources",
    code: "HR",
    manager: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+255 713 456 789",
    location: "Head Office - Floor 1",
    employees: 8,
    assets: 21,
    status: "Active",
    description: "Responsible for employee administration, recruitment and staff welfare.",
  },
  {
    id: 3,
    name: "Finance",
    code: "FIN",
    manager: "Michael Brown",
    email: "michael.brown@company.com",
    phone: "+255 714 567 890",
    location: "Head Office - Floor 2",
    employees: 10,
    assets: 25,
    status: "Active",
    description: "Handles financial operations, accounting and company budgeting.",
  },
  {
    id: 4,
    name: "Operations",
    code: "OPS",
    manager: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+255 715 678 901",
    location: "Head Office - Ground Floor",
    employees: 15,
    assets: 36,
    status: "Active",
    description: "Coordinates daily business operations and office activities.",
  },
  {
    id: 5,
    name: "Administration",
    code: "ADMIN",
    manager: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+255 716 789 012",
    location: "Head Office - Ground Floor",
    employees: 7,
    assets: 18,
    status: "Active",
    description: "Manages office administration, facilities and general support.",
  },
  {
    id: 6,
    name: "Procurement",
    code: "PROC",
    manager: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+255 717 890 123",
    location: "Head Office - Floor 1",
    employees: 6,
    assets: 14,
    status: "Active",
    description: "Handles purchasing, suppliers and equipment procurement.",
  },
  {
    id: 7,
    name: "Logistics",
    code: "LOG",
    manager: "James Anderson",
    email: "james.anderson@company.com",
    phone: "+255 718 901 234",
    location: "Warehouse",
    employees: 9,
    assets: 31,
    status: "Inactive",
    description: "Responsible for transportation, storage and equipment movement.",
  },
];

const emptyForm = {
  name: "",
  code: "",
  manager: "",
  email: "",
  phone: "",
  location: "",
  description: "",
  status: "Active",
};

const Department = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);

  const rowsPerPage = 6;

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const text = `
        ${department.name}
        ${department.code}
        ${department.manager}
        ${department.email}
        ${department.location}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / rowsPerPage)
  );

  const displayedDepartments = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const activeDepartments = departments.filter(
    (department) => department.status === "Active"
  ).length;

  const inactiveDepartments = departments.filter(
    (department) => department.status === "Inactive"
  ).length;

  const totalEmployees = departments.reduce(
    (total, department) => total + Number(department.employees || 0),
    0
  );

  const totalAssets = departments.reduce(
    (total, department) => total + Number(department.assets || 0),
    0
  );

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingDepartment(null);
    setForm(emptyForm);
    setShowModal(true);
    setOpenMenu(null);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);

    setForm({
      name: department.name,
      code: department.code,
      manager: department.manager,
      email: department.email,
      phone: department.phone,
      location: department.location,
      description: department.description,
      status: department.status,
    });

    setShowModal(true);
    setOpenMenu(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.code.trim() || !form.manager.trim()) {
      showNotification(
        "Department name, code and manager are required.",
        "error"
      );
      return;
    }

    if (editingDepartment) {
      setDepartments((previous) =>
        previous.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...form,
              }
            : department
        )
      );

      showNotification("Department updated successfully.");
    } else {
      const newDepartment = {
        id: Date.now(),
        ...form,
        employees: 0,
        assets: 0,
      };

      setDepartments((previous) => [newDepartment, ...previous]);

      showNotification("New department added successfully.");
    }

    closeModal();
  };

  const handleDelete = (department) => {
    const confirmed = window.confirm(
      `Delete "${department.name}" department?`
    );

    if (!confirmed) return;

    setDepartments((previous) =>
      previous.filter((item) => item.id !== department.id)
    );

    setOpenMenu(null);

    showNotification("Department deleted successfully.");
  };

  const handleClear = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    showNotification("Filters cleared.");
  };

  const handleRefresh = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setOpenMenu(null);

    showNotification("Department list refreshed.");
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setShowViewModal(true);
    setOpenMenu(null);
  };

  const toggleStatus = (department) => {
    const newStatus =
      department.status === "Active" ? "Inactive" : "Active";

    setDepartments((previous) =>
      previous.map((item) =>
        item.id === department.id
          ? { ...item, status: newStatus }
          : item
      )
    );

    setOpenMenu(null);

    showNotification(
      `${department.name} is now ${newStatus.toLowerCase()}.`
    );
  };

  const exportDepartments = () => {
    const headers = [
      "Department",
      "Code",
      "Manager",
      "Email",
      "Phone",
      "Location",
      "Employees",
      "Assets",
      "Status",
    ];

    const rows = departments.map((department) => [
      department.name,
      department.code,
      department.manager,
      department.email,
      department.phone,
      department.location,
      department.employees,
      department.assets,
      department.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "equipment-track-departments.csv";
    link.click();

    URL.revokeObjectURL(url);

    showNotification("Department data exported.");
  };

  return (
    <div className="department-page">
      {notification && (
        <div className={`department-notification ${notification.type}`}>
          {notification.type === "success" ? (
            <BsCheckCircleFill />
          ) : (
            <BsExclamationCircleFill />
          )}

          <span>{notification.message}</span>

          <button onClick={() => setNotification(null)}>
            <BsX />
          </button>
        </div>
      )}

      <div className="department-content">
        <div className="department-header">
          <div className="department-title-area">
            <div className="department-title-icon">
              <BsBuilding />
            </div>

            <div>
              <h1>Departments</h1>
              <p>
                Manage departments and track office equipment assigned
                to each department.
              </p>
            </div>
          </div>

          <div className="department-header-actions">
            <button
              className="department-btn department-btn-light"
              onClick={handleClear}
            >
              <BsTrash />
              <span>Clear</span>
            </button>

            <button
              className="department-btn department-btn-light"
              onClick={handleRefresh}
            >
              <BsArrowClockwise />
              <span>Refresh</span>
            </button>

            <button
              className="department-btn department-btn-primary"
              onClick={openAddModal}
            >
              <BsPlus />
              <span>Add Department</span>
            </button>
          </div>
        </div>

        <div className="department-stat-grid">
          <div className="department-stat-card">
            <div className="department-stat-icon blue">
              <BsBuilding />
            </div>

            <div>
              <span>Total Departments</span>
              <strong>{departments.length}</strong>
              <small>All registered departments</small>
            </div>
          </div>

          <div className="department-stat-card">
            <div className="department-stat-icon green">
              <BsCheckCircleFill />
            </div>

            <div>
              <span>Active Departments</span>
              <strong>{activeDepartments}</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="department-stat-card">
            <div className="department-stat-icon orange">
              <BsPeople />
            </div>

            <div>
              <span>Total Employees</span>
              <strong>{totalEmployees}</strong>
              <small>Across all departments</small>
            </div>
          </div>

          <div className="department-stat-card">
            <div className="department-stat-icon purple">
              <BsBoxSeam />
            </div>

            <div>
              <span>Assigned Equipment</span>
              <strong>{totalAssets}</strong>
              <small>Equipment by department</small>
            </div>
          </div>
        </div>

        <div className="department-table-card">
          <div className="department-table-top">
            <div>
              <h2>Department List</h2>
              <p>View and manage all departments in the system.</p>
            </div>

            <div className="department-table-actions">
              <div className="department-search">
                <BsSearch />

                <input
                  type="text"
                  placeholder="Search departments..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="department-filter">
                <BsFilter />

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <BsChevronDown />
              </div>

              <button
                className="department-export-btn"
                onClick={exportDepartments}
              >
                Export
              </button>
            </div>
          </div>

          <div className="department-table-wrapper">
            <table className="department-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>DEPARTMENT</th>
                  <th>CODE</th>
                  <th>MANAGER</th>
                  <th>CONTACT</th>
                  <th>EMPLOYEES</th>
                  <th>EQUIPMENT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {displayedDepartments.length > 0 ? (
                  displayedDepartments.map((department, index) => (
                    <tr key={department.id}>
                      <td>
                        <span className="department-number">
                          {String(
                            (currentPage - 1) * rowsPerPage + index + 1
                          ).padStart(2, "0")}
                        </span>
                      </td>

                      <td>
                        <div className="department-name-cell">
                          <div className="department-row-icon">
                            <BsBuilding />
                          </div>

                          <div>
                            <strong>{department.name}</strong>
                            <small>{department.location}</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="department-code">
                          {department.code}
                        </span>
                      </td>

                      <td>
                        <div className="department-manager">
                          <strong>{department.manager}</strong>
                          <small>Department Manager</small>
                        </div>
                      </td>

                      <td>
                        <div className="department-contact">
                          <span>
                            <BsEnvelope />
                            {department.email}
                          </span>

                          <span>
                            <BsTelephone />
                            {department.phone}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="department-count">
                          <BsPeople />
                          {department.employees}
                        </span>
                      </td>

                      <td>
                        <span className="department-count equipment">
                          <BsBoxSeam />
                          {department.assets}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`department-status ${
                            department.status.toLowerCase()
                          }`}
                        >
                          <span></span>
                          {department.status}
                        </span>
                      </td>

                      <td className="department-action-cell">
                        <button
                          className="department-more-btn"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === department.id
                                ? null
                                : department.id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {openMenu === department.id && (
                          <div className="department-action-menu">
                            <button
                              onClick={() => handleView(department)}
                            >
                              <BsEye />
                              View Details
                            </button>

                            <button
                              onClick={() => openEditModal(department)}
                            >
                              <BsPencilSquare />
                              Edit Department
                            </button>

                            <button
                              onClick={() => toggleStatus(department)}
                            >
                              <BsPersonCheck />
                              {department.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <div className="menu-divider"></div>

                            <button
                              className="danger"
                              onClick={() => handleDelete(department)}
                            >
                              <BsTrash />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
                      <div className="department-empty">
                        <BsBuilding />
                        <h3>No departments found</h3>
                        <p>
                          Try changing your search or add a new department.
                        </p>

                        <button
                          className="department-btn department-btn-primary"
                          onClick={openAddModal}
                        >
                          <BsPlus />
                          Add Department
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="department-table-footer">
            <span>
              Showing{" "}
              <strong>
                {filteredDepartments.length === 0
                  ? 0
                  : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage * rowsPerPage,
                  filteredDepartments.length
                )}
              </strong>{" "}
              of <strong>{filteredDepartments.length}</strong> departments
            </span>

            <div className="department-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((previous) => Math.max(1, previous - 1))
                }
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((previous) =>
                    Math.min(totalPages, previous + 1)
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="department-modal-overlay">
          <div className="department-modal">
            <div className="department-modal-header">
              <div>
                <div className="department-modal-icon">
                  <BsBuilding />
                </div>

                <div>
                  <h2>
                    {editingDepartment
                      ? "Edit Department"
                      : "Add New Department"}
                  </h2>

                  <p>
                    {editingDepartment
                      ? "Update department information."
                      : "Create a department for your equipment tracking system."}
                  </p>
                </div>
              </div>

              <button onClick={closeModal}>
                <BsX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="department-form-grid">
                <div className="department-form-group full">
                  <label>
                    Department Name <span>*</span>
                  </label>

                  <div className="department-input-icon">
                    <BsBuilding />

                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Information Technology"
                      value={form.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="department-form-group">
                  <label>
                    Department Code <span>*</span>
                  </label>

                  <input
                    name="code"
                    type="text"
                    placeholder="e.g. IT"
                    value={form.code}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="department-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="department-form-group">
                  <label>
                    Department Manager <span>*</span>
                  </label>

                  <div className="department-input-icon">
                    <BsPeople />

                    <input
                      name="manager"
                      type="text"
                      placeholder="Manager name"
                      value={form.manager}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="department-form-group">
                  <label>Phone Number</label>

                  <div className="department-input-icon">
                    <BsTelephone />

                    <input
                      name="phone"
                      type="text"
                      placeholder="+255 712 345 678"
                      value={form.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="department-form-group">
                  <label>Email Address</label>

                  <div className="department-input-icon">
                    <BsEnvelope />

                    <input
                      name="email"
                      type="email"
                      placeholder="department@company.com"
                      value={form.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="department-form-group">
                  <label>Location</label>

                  <div className="department-input-icon">
                    <BsGeoAlt />

                    <input
                      name="location"
                      type="text"
                      placeholder="e.g. Head Office - Floor 2"
                      value={form.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="department-form-group full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Enter department description..."
                    value={form.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="department-modal-footer">
                <button
                  type="button"
                  className="department-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="department-submit-btn"
                >
                  <BsCheckCircleFill />
                  {editingDepartment
                    ? "Update Department"
                    : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedDepartment && (
        <div className="department-modal-overlay">
          <div className="department-details-modal">
            <div className="department-modal-header">
              <div>
                <div className="department-modal-icon">
                  <BsBuilding />
                </div>

                <div>
                  <h2>{selectedDepartment.name}</h2>
                  <p>Department details and equipment information.</p>
                </div>
              </div>

              <button onClick={() => setShowViewModal(false)}>
                <BsX />
              </button>
            </div>

            <div className="department-detail-banner">
              <div className="department-large-icon">
                <BsBuilding />
              </div>

              <div>
                <h3>{selectedDepartment.name}</h3>

                <span>
                  Department Code: {selectedDepartment.code}
                </span>
              </div>

              <span
                className={`department-status ${selectedDepartment.status.toLowerCase()}`}
              >
                <span></span>
                {selectedDepartment.status}
              </span>
            </div>

            <div className="department-details-grid">
              <div className="department-detail-box">
                <BsPeople />
                <span>Employees</span>
                <strong>{selectedDepartment.employees}</strong>
              </div>

              <div className="department-detail-box">
                <BsBoxSeam />
                <span>Equipment</span>
                <strong>{selectedDepartment.assets}</strong>
              </div>

              <div className="department-detail-box">
                <BsShieldCheck />
                <span>Status</span>
                <strong>{selectedDepartment.status}</strong>
              </div>
            </div>

            <div className="department-information">
              <h3>Department Information</h3>

              <div className="department-info-grid">
                <div>
                  <label>Manager</label>
                  <strong>{selectedDepartment.manager}</strong>
                </div>

                <div>
                  <label>Email</label>
                  <strong>{selectedDepartment.email || "Not provided"}</strong>
                </div>

                <div>
                  <label>Phone</label>
                  <strong>{selectedDepartment.phone || "Not provided"}</strong>
                </div>

                <div>
                  <label>Location</label>
                  <strong>
                    {selectedDepartment.location || "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="department-description">
                <label>Description</label>
                <p>
                  {selectedDepartment.description ||
                    "No description available for this department."}
                </p>
              </div>
            </div>

            <div className="department-modal-footer">
              <button
                className="department-cancel-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="department-submit-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedDepartment);
                }}
              >
                <BsPencilSquare />
                Edit Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;