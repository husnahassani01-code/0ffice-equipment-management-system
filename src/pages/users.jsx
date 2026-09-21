
import React, { useMemo, useState } from "react";
import {
  BsPerson,
  BsPeople,
  BsPersonPlus,
  BsSearch,
  BsFilter,
  BsThreeDotsVertical,
  BsPencil,
  BsTrash,
  BsEye,
  BsX,
  BsCheck,
  BsChevronDown,
  BsClockHistory,
  BsChevronLeft,
  BsChevronRight,
  BsShieldLock,
  BsEnvelope,
  BsTelephone,
  BsBuilding,
  BsCalendar3,
  BsPersonCheck,
  BsPersonX,
  BsArrowClockwise,
  BsCheckCircle,
  BsExclamationTriangle,
} from "react-icons/bs";

import "./users.css";

const Users = () => {
  // =========================================================
  // USERS DATA
  // =========================================================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      username: "john.smith",
      email: "john.smith@company.com",
      phone: "+255 712 345 678",
      department: "Information Technology",
      role: "Administrator",
      status: "Active",
      joined: "05 Jan 2026",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "sarah.johnson",
      email: "sarah.johnson@company.com",
      phone: "+255 713 456 789",
      department: "Human Resources",
      role: "Manager",
      status: "Active",
      joined: "12 Jan 2026",
    },
    {
      id: 3,
      name: "Michael Brown",
      username: "michael.brown",
      email: "michael.brown@company.com",
      phone: "+255 714 567 890",
      department: "Finance",
      role: "Staff",
      status: "Active",
      joined: "20 Jan 2026",
    },
    {
      id: 4,
      name: "David Wilson",
      username: "david.wilson",
      email: "david.wilson@company.com",
      phone: "+255 715 678 901",
      department: "Operations",
      role: "Manager",
      status: "Inactive",
      joined: "27 Jan 2026",
    },
    {
      id: 5,
      name: "Emily Davis",
      username: "emily.davis",
      email: "emily.davis@company.com",
      phone: "+255 716 789 012",
      department: "Administration",
      role: "Staff",
      status: "Active",
      joined: "03 Feb 2026",
    },
    {
      id: 6,
      name: "Robert Taylor",
      username: "robert.taylor",
      email: "robert.taylor@company.com",
      phone: "+255 717 890 123",
      department: "Finance",
      role: "Staff",
      status: "Active",
      joined: "08 Feb 2026",
    },
    {
      id: 7,
      name: "Jessica Moore",
      username: "jessica.moore",
      email: "jessica.moore@company.com",
      phone: "+255 718 901 234",
      department: "Information Technology",
      role: "Staff",
      status: "Pending",
      joined: "15 Feb 2026",
    },
    {
      id: 8,
      name: "Daniel Anderson",
      username: "daniel.anderson",
      email: "daniel.anderson@company.com",
      phone: "+255 719 012 345",
      department: "Marketing",
      role: "Manager",
      status: "Active",
      joined: "21 Feb 2026",
    },
  ]);

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [showFilter, setShowFilter] = useState(false);

  const [showUserModal, setShowUserModal] =
    useState(false);

  const [showDetailsModal, setShowDetailsModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showClearModal, setShowClearModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [editingUser, setEditingUser] =
    useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    role: "Staff",
    status: "Active",
    password: "",
  });

  const itemsPerPage = 6;

  // =========================================================
  // DEPARTMENTS
  // =========================================================

  const departments = [
    "Information Technology",
    "Human Resources",
    "Finance",
    "Operations",
    "Administration",
    "Marketing",
    "Sales",
  ];

  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.username.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.department.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        user.department === departmentFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
    departmentFilter,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredUsers.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const pendingUsers = users.filter(
    (user) => user.status === "Pending"
  ).length;

  // =========================================================
  // FORM INPUT
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN ADD USER
  // =========================================================

  const openAddUser = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      department: "",
      role: "Staff",
      status: "Active",
      password: "",
    });

    setShowUserModal(true);
  };

  // =========================================================
  // OPEN EDIT USER
  // =========================================================

  const openEditUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: user.role,
      status: user.status,
      password: "",
    });

    setShowUserModal(true);
    setOpenMenu(null);
  };

  // =========================================================
  // SAVE USER
  // =========================================================

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.department
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!editingUser && !formData.password) {
      alert("Please enter a password.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
                role: formData.role,
                status: formData.status,
              }
            : user
        )
      );

      showMessage("User updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        role: formData.role,
        status: formData.status,
        joined: new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
      };

      setUsers((previous) => [
        newUser,
        ...previous,
      ]);

      showMessage("New user added successfully.");
    }

    setShowUserModal(false);
    setEditingUser(null);
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const openDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setOpenMenu(null);
  };

  const confirmDeleteUser = () => {
    if (!selectedUser) return;

    setUsers((previous) =>
      previous.filter(
        (user) => user.id !== selectedUser.id
      )
    );

    showMessage(
      `${selectedUser.name} was deleted successfully.`
    );

    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCurrentPage(1);

    showMessage("Filters cleared.");
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const clearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  // =========================================================
  // CLEAR ALL USERS
  // =========================================================

  const confirmClearUsers = () => {
    setUsers([]);
    setShowClearModal(false);
    showMessage("All users have been cleared.");
  };

  // =========================================================
  // VIEW USER
  // =========================================================

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
    setOpenMenu(null);
  };

  // =========================================================
  // TOGGLE USER STATUS
  // =========================================================

  const toggleUserStatus = (user) => {
    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );

    setOpenMenu(null);

    showMessage(
      `${user.name}'s status was updated.`
    );
  };

  // =========================================================
  // MESSAGE
  // =========================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================================================
  // RESET PAGE
  // =========================================================

  const handleReset = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCurrentPage(1);

    showMessage("User list refreshed.");
  };

  // =========================================================
  // AVATAR LETTERS
  // =========================================================

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="users-page">

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {message && (
        <div className="user-toast">
          <BsCheckCircle />
          <span>{message}</span>

          <button
            onClick={() => setMessage("")}
          >
            <BsX />
          </button>
        </div>
      )}

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="users-header">

        <div className="users-title">

          <div className="users-title-icon">
            <BsPeople />
          </div>

          <div>
            <h1>Users</h1>

            <p>
              Manage system users, roles and access
              permissions.
            </p>
          </div>

        </div>

        <div className="users-header-actions">

          <button
            className="clear-button"
            onClick={() => setShowClearModal(true)}
          >
            <BsTrash />
            Clear
          </button>

          <button
            className="refresh-button"
            onClick={handleReset}
          >
            <BsArrowClockwise />
            Refresh
          </button>

          <button
            className="add-user-button"
            onClick={openAddUser}
          >
            <BsPersonPlus />
            Add New User
          </button>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="user-statistics">

        <div className="user-stat-card">

          <div className="user-stat-icon blue">
            <BsPeople />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{totalUsers}</strong>
            <small>All registered users</small>
          </div>

        </div>

        <div className="user-stat-card">

          <div className="user-stat-icon green">
            <BsPersonCheck />
          </div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
            <small>Currently active</small>
          </div>

        </div>

        <div className="user-stat-card">

          <div className="user-stat-icon orange">
            <BsPersonX />
          </div>

          <div>
            <span>Inactive Users</span>
            <strong>{inactiveUsers}</strong>
            <small>Access disabled</small>
          </div>

        </div>

        <div className="user-stat-card">

          <div className="user-stat-icon purple">
            <BsClockHistory />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingUsers}</strong>
            <small>Awaiting activation</small>
          </div>

        </div>

      </div>

      {/* =====================================================
          USER TABLE CARD
      ====================================================== */}

      <div className="users-card">

        {/* TABLE HEADER */}

        <div className="users-card-header">

          <div>

            <h2>System Users</h2>

            <p>
              View and manage all registered users.
            </p>

          </div>

          <div className="users-tools">

            {/* SEARCH */}

            <div className="users-search">

              <BsSearch />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {search && (
                <button
                  onClick={clearSearch}
                >
                  <BsX />
                </button>
              )}

            </div>

            {/* FILTER */}

            <button
              className={`users-filter-button ${
                showFilter ? "active" : ""
              }`}
              onClick={() =>
                setShowFilter(!showFilter)
              }
            >
              <BsFilter />
              Filter
            </button>

          </div>

        </div>

        {/* =====================================================
            FILTER PANEL
        ====================================================== */}

        {showFilter && (
          <div className="users-filter-panel">

            <div className="user-filter-group">

              <label>Role</label>

              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All</option>
                <option>Administrator</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>

            </div>

            <div className="user-filter-group">

              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>

            </div>

            <div className="user-filter-group">

              <label>Department</label>

              <select
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All</option>

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                    >
                      {department}
                    </option>
                  )
                )}

              </select>

            </div>

            <button
              className="clear-filter-button"
              onClick={clearFilters}
            >
              <BsX />
              Clear Filters
            </button>

          </div>
        )}

        {/* =====================================================
            TABLE
        ====================================================== */}

        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>

              <tr>

                <th>#</th>

                <th>User</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Department</th>

                <th>Role</th>

                <th>Status</th>

                <th>Joined</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentUsers.length > 0 ? (

                currentUsers.map(
                  (user, index) => (

                    <tr key={user.id}>

                      <td>
                        {String(
                          startIndex + index + 1
                        ).padStart(2, "0")}
                      </td>

                      {/* USER */}

                      <td>

                        <div className="user-cell">

                          <div className="user-avatar">
                            {getInitials(
                              user.name
                            )}
                          </div>

                          <div className="user-info">

                            <strong>
                              {user.name}
                            </strong>

                            <span>
                              @{user.username}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}

                      <td>

                        <div className="email-cell">
                          <BsEnvelope />
                          {user.email}
                        </div>

                      </td>

                      {/* PHONE */}

                      <td>

                        <div className="phone-cell">
                          <BsTelephone />
                          {user.phone}
                        </div>

                      </td>

                      {/* DEPARTMENT */}

                      <td>

                        <div className="department-cell">
                          <BsBuilding />
                          {user.department}
                        </div>

                      </td>

                      {/* ROLE */}

                      <td>

                        <span
                          className={`role-badge ${user.role
                            .toLowerCase()
                            .replace(
                              " ",
                              "-"
                            )}`}
                        >
                          <BsShieldLock />
                          {user.role}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`user-status ${user.status.toLowerCase()}`}
                        >

                          <span className="status-dot"></span>

                          {user.status}

                        </span>

                      </td>

                      {/* JOINED */}

                      <td>

                        <div className="joined-cell">
                          <BsCalendar3 />
                          {user.joined}
                        </div>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="user-action-wrapper">

                          <button
                            className="user-action-button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  user.id
                                  ? null
                                  : user.id
                              )
                            }
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {openMenu === user.id && (

                            <div className="user-action-menu">

                              <button
                                onClick={() =>
                                  viewUser(user)
                                }
                              >
                                <BsEye />
                                View Details
                              </button>

                              <button
                                onClick={() =>
                                  openEditUser(
                                    user
                                  )
                                }
                              >
                                <BsPencil />
                                Edit User
                              </button>

                              <button
                                onClick={() =>
                                  toggleUserStatus(
                                    user
                                  )
                                }
                              >
                                {user.status ===
                                "Active" ? (
                                  <>
                                    <BsPersonX />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <BsPersonCheck />
                                    Activate
                                  </>
                                )}
                              </button>

                              <button
                                className="delete-action"
                                onClick={() =>
                                  openDeleteUser(
                                    user
                                  )
                                }
                              >
                                <BsTrash />
                                Delete User
                              </button>

                            </div>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="no-users"
                  >

                    <BsPeople />

                    <strong>
                      No users found
                    </strong>

                    <span>
                      Add a new user or change your
                      search filters.
                    </span>

                    <button
                      onClick={openAddUser}
                    >
                      <BsPersonPlus />
                      Add New User
                    </button>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        <div className="users-pagination">

          <span>
            Showing{" "}
            <strong>
              {filteredUsers.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + itemsPerPage,
                filteredUsers.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredUsers.length}
            </strong>{" "}
            users
          </span>

          <div className="pagination-controls">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              <BsChevronLeft />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>

            ))}

            <button
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              <BsChevronRight />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT USER MODAL
      ====================================================== */}

      {showUserModal && (

        <div
          className="user-modal-overlay"
          onClick={() =>
            setShowUserModal(false)
          }
        >

          <div
            className="user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="user-modal-header">

              <div className="user-modal-title">

                <div>
                  <BsPersonPlus />
                </div>

                <div>

                  <h2>
                    {editingUser
                      ? "Edit User"
                      : "Add New User"}
                  </h2>

                  <p>
                    {editingUser
                      ? "Update user account information."
                      : "Create a new system user account."}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowUserModal(false)
                }
              >
                <BsX />
              </button>

            </div>

            <form
              className="user-form"
              onSubmit={handleSaveUser}
            >

              {/* FULL NAME */}

              <div className="form-field">

                <label>
                  Full Name
                  <span>*</span>
                </label>

                <div className="input-with-icon">

                  <BsPerson />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                </div>

              </div>

              {/* USERNAME */}

              <div className="form-field">

                <label>
                  Username
                  <span>*</span>
                </label>

                <div className="input-with-icon">

                  <BsPerson />

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={
                      formData.username
                    }
                    onChange={handleInputChange}
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="form-field">

                <label>
                  Email Address
                  <span>*</span>
                </label>

                <div className="input-with-icon">

                  <BsEnvelope />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                </div>

              </div>

              {/* PHONE */}

              <div className="form-field">

                <label>Phone Number</label>

                <div className="input-with-icon">

                  <BsTelephone />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+255 700 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                </div>

              </div>

              {/* DEPARTMENT */}

              <div className="form-field">

                <label>
                  Department
                  <span>*</span>
                </label>

                <div className="select-with-icon">

                  <BsBuilding />

                  <select
                    name="department"
                    value={
                      formData.department
                    }
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select department
                    </option>

                    {departments.map(
                      (department) => (
                        <option
                          key={department}
                          value={department}
                        >
                          {department}
                        </option>
                      )
                    )}

                  </select>

                  <BsChevronDown />

                </div>

              </div>

              {/* ROLE */}

              <div className="form-field">

                <label>Role</label>

                <div className="select-with-icon">

                  <BsShieldLock />

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option>
                      Staff
                    </option>

                    <option>
                      Manager
                    </option>

                    <option>
                      Administrator
                    </option>

                  </select>

                  <BsChevronDown />

                </div>

              </div>

              {/* PASSWORD */}

              {!editingUser && (

                <div className="form-field">

                  <label>
                    Password
                    <span>*</span>
                  </label>

                  <div className="input-with-icon">

                    <BsShieldLock />

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={
                        formData.password
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                </div>

              )}

              {/* STATUS */}

              <div className="form-field">

                <label>Status</label>

                <div className="select-with-icon">

                  <BsPersonCheck />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option>
                      Active
                    </option>

                    <option>
                      Inactive
                    </option>

                    <option>
                      Pending
                    </option>

                  </select>

                  <BsChevronDown />

                </div>

              </div>

              {/* FORM ACTIONS */}

              <div className="user-form-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() =>
                    setShowUserModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-button"
                >
                  <BsCheck />
                  {editingUser
                    ? "Update User"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          USER DETAILS MODAL
      ====================================================== */}

      {showDetailsModal &&
        selectedUser && (

          <div
            className="user-modal-overlay"
            onClick={() =>
              setShowDetailsModal(false)
            }
          >

            <div
              className="user-details-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="details-modal-header">

                <div>
                  <h2>User Details</h2>

                  <p>
                    Complete information about
                    this user.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowDetailsModal(false)
                  }
                >
                  <BsX />
                </button>

              </div>

              <div className="large-user-profile">

                <div className="large-user-avatar">
                  {getInitials(
                    selectedUser.name
                  )}
                </div>

                <div>

                  <h3>
                    {selectedUser.name}
                  </h3>

                  <span>
                    @{selectedUser.username}
                  </span>

                  <div
                    className={`user-status ${selectedUser.status.toLowerCase()}`}
                  >
                    <span className="status-dot"></span>
                    {selectedUser.status}
                  </div>

                </div>

              </div>

              <div className="user-details-grid">

                <div>
                  <span>Full Name</span>
                  <strong>
                    {selectedUser.name}
                  </strong>
                </div>

                <div>
                  <span>Username</span>
                  <strong>
                    {selectedUser.username}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedUser.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedUser.phone}
                  </strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>
                    {selectedUser.department}
                  </strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>
                    {selectedUser.role}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    {selectedUser.status}
                  </strong>
                </div>

                <div>
                  <span>Date Joined</span>
                  <strong>
                    {selectedUser.joined}
                  </strong>
                </div>

              </div>

              <div className="details-modal-actions">

                <button
                  className="modal-cancel-button"
                  onClick={() =>
                    setShowDetailsModal(false)
                  }
                >
                  Close
                </button>

                <button
                  className="modal-save-button"
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditUser(selectedUser);
                  }}
                >
                  <BsPencil />
                  Edit User
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {showDeleteModal &&
        selectedUser && (

          <div
            className="user-modal-overlay"
            onClick={() =>
              setShowDeleteModal(false)
            }
          >

            <div
              className="confirm-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="confirm-icon delete">
                <BsTrash />
              </div>

              <h2>Delete User?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {selectedUser.name}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="confirm-actions">

                <button
                  className="modal-cancel-button"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="delete-confirm-button"
                  onClick={confirmDeleteUser}
                >
                  <BsTrash />
                  Delete User
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          CLEAR ALL MODAL
      ====================================================== */}

      {showClearModal && (

        <div
          className="user-modal-overlay"
          onClick={() =>
            setShowClearModal(false)
          }
        >

          <div
            className="confirm-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="confirm-icon warning">
              <BsExclamationTriangle />
            </div>

            <h2>Clear All Users?</h2>

            <p>
              This will remove all users from the
              current temporary user list. This action
              cannot be undone.
            </p>

            <div className="confirm-actions">

              <button
                className="modal-cancel-button"
                onClick={() =>
                  setShowClearModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="delete-confirm-button"
                onClick={confirmClearUsers}
              >
                <BsTrash />
                Clear All
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Users;