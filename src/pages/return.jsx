// src/pages/returns.jsx

import React, { useMemo, useState } from "react";
import {
  BsArrowReturnLeft,
  BsBoxSeam,
  BsCalendar3,
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsClockHistory,
  BsDownload,
  BsEye,
  BsFilter,
  BsPencilSquare,
  BsPerson,
  BsPlus,
  BsPrinter,
  BsSearch,
  BsThreeDotsVertical,
  BsTrash,
  BsX,
  BsArrowClockwise,
  BsClipboardCheck,
  BsBuilding,
  BsExclamationCircle,
} from "react-icons/bs";
import "./return.css";

const initialReturns = [
  {
    id: "RET-001",
    assetTag: "AST-00124",
    asset: "Dell Latitude 5520",
    category: "Laptop",
    employee: "John Smith",
    department: "Information Technology",
    issuedDate: "2026-08-15",
    returnDate: "2026-09-07",
    condition: "Good",
    status: "Completed",
    receivedBy: "Admin",
    notes: "Returned with charger and bag.",
  },
  {
    id: "RET-002",
    assetTag: "AST-00119",
    asset: "HP LaserJet Pro",
    category: "Printer",
    employee: "Sarah Johnson",
    department: "Human Resources",
    issuedDate: "2026-07-20",
    returnDate: "2026-09-06",
    condition: "Good",
    status: "Completed",
    receivedBy: "Admin",
    notes: "Equipment working correctly.",
  },
  {
    id: "RET-003",
    assetTag: "AST-00116",
    asset: "Lenovo ThinkPad E14",
    category: "Laptop",
    employee: "Michael Brown",
    department: "Finance",
    issuedDate: "2026-08-01",
    returnDate: "2026-09-05",
    condition: "Fair",
    status: "Completed",
    receivedBy: "James Wilson",
    notes: "Minor scratches on the cover.",
  },
  {
    id: "RET-004",
    assetTag: "AST-00108",
    asset: 'Samsung Monitor 24"',
    category: "Monitor",
    employee: "David Wilson",
    department: "Operations",
    issuedDate: "2026-06-12",
    returnDate: "2026-09-04",
    condition: "Good",
    status: "Completed",
    receivedBy: "Admin",
    notes: "",
  },
  {
    id: "RET-005",
    assetTag: "AST-00098",
    asset: "HP EliteBook 840",
    category: "Laptop",
    employee: "Emily Davis",
    department: "Administration",
    issuedDate: "2026-08-25",
    returnDate: "",
    condition: "Good",
    status: "Pending",
    receivedBy: "",
    notes: "Employee exit clearance pending.",
  },
  {
    id: "RET-006",
    assetTag: "AST-00091",
    asset: "Logitech Keyboard",
    category: "Accessory",
    employee: "Robert Taylor",
    department: "Finance",
    issuedDate: "2026-07-10",
    returnDate: "2026-09-02",
    condition: "Damaged",
    status: "Completed",
    receivedBy: "Admin",
    notes: "Several keys not functioning.",
  },
];

const emptyForm = {
  assetTag: "",
  asset: "",
  employee: "",
  department: "",
  issuedDate: "",
  returnDate: "",
  condition: "Good",
  status: "Completed",
  receivedBy: "",
  notes: "",
};

function Returns() {
  const [returns, setReturns] = useState(initialReturns);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedReturn, setSelectedReturn] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredReturns = useMemo(() => {
    return returns.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(searchValue) ||
        item.assetTag.toLowerCase().includes(searchValue) ||
        item.asset.toLowerCase().includes(searchValue) ||
        item.employee.toLowerCase().includes(searchValue) ||
        item.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCondition =
        conditionFilter === "All" || item.condition === conditionFilter;

      return matchesSearch && matchesStatus && matchesCondition;
    });
  }, [returns, search, statusFilter, conditionFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReturns.length / rowsPerPage)
  );

  const displayedReturns = filteredReturns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const completedCount = returns.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = returns.filter(
    (item) => item.status === "Pending"
  ).length;

  const goodCount = returns.filter(
    (item) => item.condition === "Good"
  ).length;

  const damagedCount = returns.filter(
    (item) => item.condition === "Damaged"
  ).length;

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setConditionFilter("All");
    setCurrentPage(1);
  };

  const refreshData = () => {
    setReturns([...returns]);
    setCurrentPage(1);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setForm({
      assetTag: item.assetTag,
      asset: item.asset,
      employee: item.employee,
      department: item.department,
      issuedDate: item.issuedDate,
      returnDate: item.returnDate,
      condition: item.condition,
      status: item.status,
      receivedBy: item.receivedBy,
      notes: item.notes,
    });
    setShowForm(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.assetTag ||
      !form.asset ||
      !form.employee ||
      !form.department
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      setReturns((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
    } else {
      const newReturn = {
        id: `RET-${String(returns.length + 1).padStart(3, "0")}`,
        ...form,
      };

      setReturns((prev) => [newReturn, ...prev]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openView = (item) => {
    setSelectedReturn(item);
    setShowView(true);
  };

  const openDelete = (item) => {
    setSelectedReturn(item);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (!selectedReturn) return;

    setReturns((prev) =>
      prev.filter((item) => item.id !== selectedReturn.id)
    );

    setSelectedReturn(null);
    setShowDelete(false);

    if (
      displayedReturns.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  };

  const printReturns = () => {
    window.print();
  };

  const exportCSV = () => {
    const headers = [
      "Return ID",
      "Asset Tag",
      "Asset",
      "Employee",
      "Department",
      "Issued Date",
      "Return Date",
      "Condition",
      "Status",
      "Received By",
      "Notes",
    ];

    const rows = returns.map((item) => [
      item.id,
      item.assetTag,
      item.asset,
      item.employee,
      item.department,
      item.issuedDate,
      item.returnDate,
      item.condition,
      item.status,
      item.receivedBy,
      item.notes,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value || "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "equipment-returns.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="returns-page">
      {/* PAGE HEADER */}
      <div className="returns-header">
        <div className="returns-title-section">
          <div className="returns-title-icon">
            <BsArrowReturnLeft />
          </div>

          <div>
            <h1>Returns</h1>
            <p>
              Track equipment returned by employees and update asset
              conditions.
            </p>
          </div>
        </div>

        <div className="returns-header-actions">
          <button
            className="return-secondary-btn"
            onClick={printReturns}
            title="Print returns"
          >
            <BsPrinter />
            <span>Print</span>
          </button>

          <button
            className="return-secondary-btn"
            onClick={exportCSV}
            title="Export CSV"
          >
            <BsDownload />
            <span>Export</span>
          </button>

          <button
            className="return-primary-btn"
            onClick={openAddForm}
          >
            <BsPlus />
            <span>Record Return</span>
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="returns-stat-grid">
        <div className="return-stat-card">
          <div className="return-stat-icon blue">
            <BsArrowReturnLeft />
          </div>

          <div>
            <span>Total Returns</span>
            <strong>{returns.length}</strong>
            <small>All recorded returns</small>
          </div>
        </div>

        <div className="return-stat-card">
          <div className="return-stat-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
            <small>Successfully received</small>
          </div>
        </div>

        <div className="return-stat-card">
          <div className="return-stat-icon purple">
            <BsClockHistory />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
            <small>Awaiting return</small>
          </div>
        </div>

        <div className="return-stat-card">
          <div className="return-stat-icon orange">
            <BsExclamationCircle />
          </div>

          <div>
            <span>Damaged</span>
            <strong>{damagedCount}</strong>
            <small>Need inspection</small>
          </div>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="returns-content-card">
        <div className="returns-content-top">
          <div className="returns-section-title">
            <div className="small-return-icon">
              <BsClipboardCheck />
            </div>

            <div>
              <h2>Returned Equipment</h2>
              <p>View and manage all equipment returns.</p>
            </div>
          </div>

          <div className="returns-tools">
            <div className="return-search">
              <BsSearch />

              <input
                type="text"
                placeholder="Search returns..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {search && (
                <button
                  className="search-clear"
                  onClick={() => handleSearch("")}
                >
                  <BsX />
                </button>
              )}
            </div>

            <button
              className="return-filter-btn"
              onClick={() => setShowFilter(!showFilter)}
            >
              <BsFilter />
              <span>Filter</span>
            </button>

            <button
              className="return-refresh-btn"
              onClick={refreshData}
              title="Refresh"
            >
              <BsArrowClockwise />
            </button>

            <button
              className="return-clear-btn"
              onClick={clearFilters}
            >
              <BsTrash />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilter && (
          <div className="returns-filter-panel">
            <div className="filter-field">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Condition</label>

              <select
                value={conditionFilter}
                onChange={(e) => {
                  setConditionFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Conditions</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <button
              className="filter-reset"
              onClick={clearFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="returns-table-wrapper">
          <table className="returns-table">
            <thead>
              <tr>
                <th>#</th>
                <th>RETURN ID</th>
                <th>ASSET</th>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>RETURN DATE</th>
                <th>CONDITION</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {displayedReturns.length > 0 ? (
                displayedReturns.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      {String(
                        (currentPage - 1) * rowsPerPage + index + 1
                      ).padStart(2, "0")}
                    </td>

                    <td>
                      <span className="return-id">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <div className="asset-cell">
                        <div className="asset-icon">
                          <BsBoxSeam />
                        </div>

                        <div>
                          <strong>{item.asset}</strong>
                          <small>{item.assetTag}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="employee-cell">
                        <div className="employee-icon">
                          <BsPerson />
                        </div>

                        <span>{item.employee}</span>
                      </div>
                    </td>

                    <td>
                      <div className="department-cell">
                        <BsBuilding />
                        {item.department}
                      </div>
                    </td>

                    <td>
                      <div className="date-cell">
                        <BsCalendar3 />
                        {item.returnDate || "Not returned"}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`condition-badge ${item.condition.toLowerCase()}`}
                      >
                        <span></span>
                        {item.condition}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`return-status ${item.status.toLowerCase()}`}
                      >
                        <span></span>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="return-actions">
                        <button
                          onClick={() => openView(item)}
                          title="View"
                        >
                          <BsEye />
                        </button>

                        <button
                          onClick={() => openEditForm(item)}
                          title="Edit"
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          className="danger-action"
                          onClick={() => openDelete(item)}
                          title="Delete"
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="returns-empty">
                      <BsBoxSeam />
                      <h3>No returns found</h3>
                      <p>
                        Try changing your search or filter options.
                      </p>

                      <button onClick={clearFilters}>
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
        <div className="returns-mobile-list">
          {displayedReturns.map((item) => (
            <div className="return-mobile-card" key={item.id}>
              <div className="mobile-return-top">
                <div className="asset-cell">
                  <div className="asset-icon">
                    <BsBoxSeam />
                  </div>

                  <div>
                    <strong>{item.asset}</strong>
                    <small>{item.assetTag}</small>
                  </div>
                </div>

                <button onClick={() => openView(item)}>
                  <BsEye />
                </button>
              </div>

              <div className="mobile-return-info">
                <div>
                  <label>Return ID</label>
                  <span>{item.id}</span>
                </div>

                <div>
                  <label>Employee</label>
                  <span>{item.employee}</span>
                </div>

                <div>
                  <label>Department</label>
                  <span>{item.department}</span>
                </div>

                <div>
                  <label>Return Date</label>
                  <span>{item.returnDate || "Not returned"}</span>
                </div>

                <div>
                  <label>Condition</label>
                  <span
                    className={`condition-badge ${item.condition.toLowerCase()}`}
                  >
                    {item.condition}
                  </span>
                </div>

                <div>
                  <label>Status</label>
                  <span
                    className={`return-status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="mobile-return-actions">
                <button onClick={() => openView(item)}>
                  <BsEye />
                  View
                </button>

                <button onClick={() => openEditForm(item)}>
                  <BsPencilSquare />
                  Edit
                </button>

                <button
                  className="mobile-danger"
                  onClick={() => openDelete(item)}
                >
                  <BsTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="returns-pagination">
          <div>
            Showing{" "}
            <strong>
              {filteredReturns.length === 0
                ? 0
                : (currentPage - 1) * rowsPerPage + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                currentPage * rowsPerPage,
                filteredReturns.length
              )}
            </strong>{" "}
            of <strong>{filteredReturns.length}</strong> returns
          </div>

          <div className="pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <BsChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1 ? "active" : ""
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div
          className="return-modal-overlay"
          onMouseDown={() => setShowForm(false)}
        >
          <div
            className="return-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="return-modal-header">
              <div>
                <div className="modal-icon">
                  <BsArrowReturnLeft />
                </div>

                <div>
                  <h2>
                    {editingId
                      ? "Edit Return"
                      : "Record Equipment Return"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update the returned equipment information."
                      : "Enter the equipment return details below."}
                  </p>
                </div>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <BsX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="return-form-body">
                <div className="form-section-heading">
                  <BsBoxSeam />
                  <span>Equipment Information</span>
                </div>

                <div className="return-form-grid">
                  <div className="return-form-group">
                    <label>
                      Asset Tag <span>*</span>
                    </label>

                    <input
                      name="assetTag"
                      value={form.assetTag}
                      onChange={handleInput}
                      placeholder="e.g. AST-00124"
                    />
                  </div>

                  <div className="return-form-group">
                    <label>
                      Asset Name <span>*</span>
                    </label>

                    <input
                      name="asset"
                      value={form.asset}
                      onChange={handleInput}
                      placeholder="e.g. Dell Latitude 5520"
                    />
                  </div>

                  <div className="return-form-group">
                    <label>
                      Employee <span>*</span>
                    </label>

                    <input
                      name="employee"
                      value={form.employee}
                      onChange={handleInput}
                      placeholder="Employee name"
                    />
                  </div>

                  <div className="return-form-group">
                    <label>
                      Department <span>*</span>
                    </label>

                    <select
                      name="department"
                      value={form.department}
                      onChange={handleInput}
                    >
                      <option value="">Select department</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Human Resources">
                        Human Resources
                      </option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Administration">
                        Administration
                      </option>
                      <option value="Procurement">
                        Procurement
                      </option>
                    </select>
                  </div>

                  <div className="return-form-group">
                    <label>Issued Date</label>

                    <input
                      type="date"
                      name="issuedDate"
                      value={form.issuedDate}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="return-form-group">
                    <label>Return Date</label>

                    <input
                      type="date"
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="form-section-heading">
                  <BsClipboardCheck />
                  <span>Return Details</span>
                </div>

                <div className="return-form-grid">
                  <div className="return-form-group">
                    <label>Condition</label>

                    <select
                      name="condition"
                      value={form.condition}
                      onChange={handleInput}
                    >
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>

                  <div className="return-form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleInput}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div className="return-form-group">
                    <label>Received By</label>

                    <input
                      name="receivedBy"
                      value={form.receivedBy}
                      onChange={handleInput}
                      placeholder="Person receiving equipment"
                    />
                  </div>

                  <div className="return-form-group full-width">
                    <label>Notes</label>

                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleInput}
                      rows="4"
                      placeholder="Add notes about the returned equipment..."
                    />
                  </div>
                </div>
              </div>

              <div className="return-modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-btn"
                >
                  <BsCheckCircleFill />
                  {editingId ? "Update Return" : "Record Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showView && selectedReturn && (
        <div
          className="return-modal-overlay"
          onMouseDown={() => setShowView(false)}
        >
          <div
            className="return-view-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="return-modal-header">
              <div>
                <div className="modal-icon">
                  <BsEye />
                </div>

                <div>
                  <h2>Return Details</h2>
                  <p>{selectedReturn.id}</p>
                </div>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowView(false)}
              >
                <BsX />
              </button>
            </div>

            <div className="return-details">
              <div className="return-detail-asset">
                <div className="large-asset-icon">
                  <BsBoxSeam />
                </div>

                <div>
                  <h3>{selectedReturn.asset}</h3>
                  <span>{selectedReturn.assetTag}</span>
                </div>
              </div>

              <div className="details-grid">
                <div>
                  <label>Return ID</label>
                  <strong>{selectedReturn.id}</strong>
                </div>

                <div>
                  <label>Employee</label>
                  <strong>{selectedReturn.employee}</strong>
                </div>

                <div>
                  <label>Department</label>
                  <strong>{selectedReturn.department}</strong>
                </div>

                <div>
                  <label>Issued Date</label>
                  <strong>
                    {selectedReturn.issuedDate || "N/A"}
                  </strong>
                </div>

                <div>
                  <label>Return Date</label>
                  <strong>
                    {selectedReturn.returnDate || "Pending"}
                  </strong>
                </div>

                <div>
                  <label>Received By</label>
                  <strong>
                    {selectedReturn.receivedBy || "N/A"}
                  </strong>
                </div>

                <div>
                  <label>Condition</label>
                  <span
                    className={`condition-badge ${selectedReturn.condition.toLowerCase()}`}
                  >
                    {selectedReturn.condition}
                  </span>
                </div>

                <div>
                  <label>Status</label>
                  <span
                    className={`return-status ${selectedReturn.status.toLowerCase()}`}
                  >
                    {selectedReturn.status}
                  </span>
                </div>
              </div>

              <div className="return-notes">
                <label>Notes</label>
                <p>
                  {selectedReturn.notes ||
                    "No notes have been added."}
                </p>
              </div>
            </div>

            <div className="return-modal-footer">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowView(false)}
              >
                Close
              </button>

              <button
                className="modal-save-btn"
                onClick={() => {
                  setShowView(false);
                  openEditForm(selectedReturn);
                }}
              >
                <BsPencilSquare />
                Edit Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && selectedReturn && (
        <div
          className="return-modal-overlay"
          onMouseDown={() => setShowDelete(false)}
        >
          <div
            className="delete-return-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="delete-icon">
              <BsTrash />
            </div>

            <h2>Delete Return Record?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedReturn.id}</strong> for{" "}
              <strong>{selectedReturn.asset}</strong>?
              <br />
              This action cannot be undone.
            </p>

            <div className="delete-modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={confirmDelete}
              >
                <BsTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Returns;