import React, { useState } from "react";
import {
  BsArrowRightCircle,
  BsBoxSeam,
  BsBuilding,
  BsCalendar3,
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsDownload,
  BsEye,
  BsPencilSquare,
  BsPerson,
  BsPlus,
  BsPrinter,
  BsSearch,
  BsTrash,
  BsX,
  BsArrowClockwise,
} from "react-icons/bs";
import "./issuing.css";

const initialIssues = [
  {
    id: 1,
    issueId: "ISS-0001",
    assetTag: "AST-1001",
    asset: "Dell Latitude 5420",
    employee: "John Peter",
    department: "ICT",
    issueDate: "2026-08-12",
    expectedReturn: "2027-08-12",
    condition: "Good",
    status: "Issued",
    issuedBy: "Admin",
    notes: "Laptop issued for office use",
  },
  {
    id: 2,
    issueId: "ISS-0002",
    assetTag: "AST-1002",
    asset: "HP ProBook 450",
    employee: "Mary Joseph",
    department: "Finance",
    issueDate: "2026-08-15",
    expectedReturn: "2027-08-15",
    condition: "Good",
    status: "Issued",
    issuedBy: "Admin",
    notes: "Finance department laptop",
  },
  {
    id: 3,
    issueId: "ISS-0003",
    assetTag: "AST-1003",
    asset: "Samsung Monitor 24",
    employee: "David Michael",
    department: "HR",
    issueDate: "2026-08-18",
    expectedReturn: "2027-08-18",
    condition: "Fair",
    status: "Issued",
    issuedBy: "Manager",
    notes: "Monitor assigned to employee",
  },
  {
    id: 4,
    issueId: "ISS-0004",
    assetTag: "AST-1004",
    asset: "Lenovo ThinkPad E14",
    employee: "Grace Daniel",
    department: "Administration",
    issueDate: "2026-08-20",
    expectedReturn: "2027-08-20",
    condition: "Good",
    status: "Pending",
    issuedBy: "Admin",
    notes: "Awaiting employee confirmation",
  },
];

function Issuing() {
  const [issues, setIssues] = useState(initialIssues);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingIssue, setEditingIssue] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const emptyForm = {
    assetTag: "",
    asset: "",
    employee: "",
    department: "",
    issueDate: "",
    expectedReturn: "",
    condition: "Good",
    status: "Issued",
    issuedBy: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredIssues = issues.filter((item) => {
    const text = `
      ${item.issueId}
      ${item.assetTag}
      ${item.asset}
      ${item.employee}
      ${item.department}
    `.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const openAddModal = () => {
    setEditingIssue(null);

    setForm({
      ...emptyForm,
      issueDate: new Date().toISOString().split("T")[0],
    });

    setShowModal(true);
  };

  const openEditModal = (issue) => {
    setEditingIssue(issue);

    setForm({
      assetTag: issue.assetTag,
      asset: issue.asset,
      employee: issue.employee,
      department: issue.department,
      issueDate: issue.issueDate,
      expectedReturn: issue.expectedReturn,
      condition: issue.condition,
      status: issue.status,
      issuedBy: issue.issuedBy,
      notes: issue.notes,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.assetTag ||
      !form.asset ||
      !form.employee ||
      !form.department ||
      !form.issueDate ||
      !form.issuedBy
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingIssue) {
      setIssues(
        issues.map((item) =>
          item.id === editingIssue.id
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
    } else {
      const newIssue = {
        id: Date.now(),
        issueId: `ISS-${String(issues.length + 1).padStart(4, "0")}`,
        ...form,
      };

      setIssues([newIssue, ...issues]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingIssue(null);
  };

  const openViewModal = (issue) => {
    setSelectedIssue(issue);
    setShowViewModal(true);
  };

  const openDeleteModal = (issue) => {
    setSelectedIssue(issue);
    setShowDeleteModal(true);
  };

  const deleteIssue = () => {
    setIssues(
      issues.filter((item) => item.id !== selectedIssue.id)
    );

    setShowDeleteModal(false);
    setSelectedIssue(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  const refreshData = () => {
    setIssues([...issues]);
  };

  const exportCSV = () => {
    const headers = [
      "Issue ID",
      "Asset Tag",
      "Equipment",
      "Employee",
      "Department",
      "Issue Date",
      "Expected Return",
      "Condition",
      "Status",
      "Issued By",
      "Notes",
    ];

    const rows = filteredIssues.map((item) => [
      item.issueId,
      item.assetTag,
      item.asset,
      item.employee,
      item.department,
      item.issueDate,
      item.expectedReturn,
      item.condition,
      item.status,
      item.issuedBy,
      item.notes,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "equipment-issuing.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const printIssues = () => {
    window.print();
  };

  const issuedCount = issues.filter(
    (item) => item.status === "Issued"
  ).length;

  const pendingCount = issues.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="issuing-page">

      {/* HEADER */}
      <div className="issuing-header">
        <div>
          <h2>
            <BsArrowRightCircle /> Equipment Issuing
          </h2>

          <p>
            Issue and assign equipment to employees
          </p>
        </div>

        <button
          className="btn-primary-issue"
          onClick={openAddModal}
        >
          <BsPlus />
          Add issuing
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="issue-summary">

        <div className="issue-summary-card">
          <div className="issue-icon blue">
            <BsBoxSeam />
          </div>

          <div>
            <span>Total Issues</span>
            <strong>{issues.length}</strong>
          </div>
        </div>

        <div className="issue-summary-card">
          <div className="issue-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Currently Issued</span>
            <strong>{issuedCount}</strong>
          </div>
        </div>

        <div className="issue-summary-card">
          <div className="issue-icon orange">
            <BsArrowRightCircle />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="issue-summary-card">
          <div className="issue-icon purple">
            <BsPerson />
          </div>

          <div>
            <span>Employees</span>
            <strong>
              {new Set(issues.map((item) => item.employee)).size}
            </strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="issue-toolbar">

        <div className="issue-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search issue, asset, employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Issued">Issued</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          className="tool-btn"
          onClick={refreshData}
          title="Refresh"
        >
          <BsArrowClockwise />
        </button>

        <button
          className="tool-btn"
          onClick={clearFilters}
        >
          <BsX />
          Clear
        </button>

        <button
          className="tool-btn"
          onClick={exportCSV}
        >
          <BsDownload />
          Export
        </button>

        <button
          className="tool-btn"
          onClick={printIssues}
        >
          <BsPrinter />
          Print
        </button>

      </div>

      {/* TABLE */}
      <div className="issue-table-container">

        <table className="issue-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Issue ID</th>
              <th>Equipment</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Issue Date</th>
              <th>Expected Return</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredIssues.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="no-issue-data"
                >
                  <BsBoxSeam />
                  <p>No issuing records found</p>
                </td>
              </tr>
            ) : (
              filteredIssues.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong className="issue-id">
                      {item.issueId}
                    </strong>
                  </td>

                  <td>
                    <div className="equipment-cell">
                      <div className="equipment-icon">
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
                    <span className="department-cell">
                      <BsBuilding />
                      {item.department}
                    </span>
                  </td>

                  <td>{item.issueDate}</td>

                  <td>{item.expectedReturn || "-"}</td>

                  <td>
                    <span
                      className={`condition-badge ${item.condition.toLowerCase()}`}
                    >
                      {item.condition}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="action-view"
                        onClick={() => openViewModal(item)}
                        title="View"
                      >
                        <BsEye />
                      </button>

                      <button
                        className="action-edit"
                        onClick={() => openEditModal(item)}
                        title="Edit"
                      >
                        <BsPencilSquare />
                      </button>

                      <button
                        className="action-delete"
                        onClick={() => openDeleteModal(item)}
                        title="Delete"
                      >
                        <BsTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* MOBILE CARDS */}
      <div className="mobile-issue-list">

        {filteredIssues.map((item) => (
          <div
            className="mobile-issue-card"
            key={item.id}
          >

            <div className="mobile-issue-top">

              <div>
                <strong>{item.issueId}</strong>
                <small>{item.assetTag}</small>
              </div>

              <span
                className={`status-badge ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

            </div>

            <h4>{item.asset}</h4>

            <div className="mobile-info">
              <span>
                <BsPerson />
                {item.employee}
              </span>

              <span>
                <BsBuilding />
                {item.department}
              </span>

              <span>
                <BsCalendar3 />
                {item.issueDate}
              </span>
            </div>

            <div className="mobile-actions">

              <button
                onClick={() => openViewModal(item)}
              >
                <BsEye />
                View
              </button>

              <button
                onClick={() => openEditModal(item)}
              >
                <BsPencilSquare />
                Edit
              </button>

              <button
                onClick={() => openDeleteModal(item)}
              >
                <BsTrash />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="issue-pagination">

        <span>
          Showing {filteredIssues.length} of {issues.length} records
        </span>

        <div>
          <button>
            <BsChevronLeft />
          </button>

          <button className="active-page">
            1
          </button>

          <button>
            <BsChevronRight />
          </button>
        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="issue-modal">

            <div className="modal-header">

              <div>
                <h3>
                  {editingIssue
                    ? "Edit Equipment Issue"
                    : "Issue Equipment"}
                </h3>

                <p>
                  {editingIssue
                    ? "Update equipment issuing information"
                    : "Assign equipment to an employee"}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                <BsX />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group">
                  <label>
                    Asset Tag <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="assetTag"
                    placeholder="e.g. AST-1005"
                    value={form.assetTag}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Equipment <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="asset"
                    placeholder="Equipment name"
                    value={form.asset}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Employee <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="employee"
                    placeholder="Employee name"
                    value={form.employee}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Department <span>*</span>
                  </label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Department
                    </option>
                    <option value="ICT">ICT</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Administration">
                      Administration
                    </option>
                    <option value="Procurement">
                      Procurement
                    </option>
                    <option value="Operations">
                      Operations
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Issue Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Expected Return Date</label>

                  <input
                    type="date"
                    name="expectedReturn"
                    value={form.expectedReturn}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Equipment Condition</label>

                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                  >
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Issued">Issued</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Issued By <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="issuedBy"
                    placeholder="Person issuing equipment"
                    value={form.issuedBy}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Enter additional information..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-issue-btn"
                >
                  <BsCheckCircleFill />

                  {editingIssue
                    ? "Update Issue"
                    : "Issue Equipment"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedIssue && (
        <div className="modal-overlay">

          <div className="issue-modal view-modal">

            <div className="modal-header">

              <div>
                <h3>Equipment Issue Details</h3>
                <p>{selectedIssue.issueId}</p>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="modal-close"
              >
                <BsX />
              </button>

            </div>

            <div className="issue-details">

              <div className="detail-box">
                <span>Issue ID</span>
                <strong>{selectedIssue.issueId}</strong>
              </div>

              <div className="detail-box">
                <span>Asset Tag</span>
                <strong>{selectedIssue.assetTag}</strong>
              </div>

              <div className="detail-box">
                <span>Equipment</span>
                <strong>{selectedIssue.asset}</strong>
              </div>

              <div className="detail-box">
                <span>Employee</span>
                <strong>{selectedIssue.employee}</strong>
              </div>

              <div className="detail-box">
                <span>Department</span>
                <strong>{selectedIssue.department}</strong>
              </div>

              <div className="detail-box">
                <span>Issue Date</span>
                <strong>{selectedIssue.issueDate}</strong>
              </div>

              <div className="detail-box">
                <span>Expected Return</span>
                <strong>
                  {selectedIssue.expectedReturn || "-"}
                </strong>
              </div>

              <div className="detail-box">
                <span>Condition</span>
                <strong>{selectedIssue.condition}</strong>
              </div>

              <div className="detail-box">
                <span>Status</span>
                <strong>{selectedIssue.status}</strong>
              </div>

              <div className="detail-box">
                <span>Issued By</span>
                <strong>{selectedIssue.issuedBy}</strong>
              </div>

              <div className="detail-box full-detail">
                <span>Notes</span>
                <strong>
                  {selectedIssue.notes || "No notes"}
                </strong>
              </div>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="save-issue-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedIssue);
                }}
              >
                <BsPencilSquare />
                Edit Issue
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedIssue && (
        <div className="modal-overlay">

          <div className="delete-modal">

            <div className="delete-icon">
              <BsTrash />
            </div>

            <h3>Delete Issue Record?</h3>

            <p>
              Are you sure you want to delete issue record{" "}
              <strong>{selectedIssue.issueId}</strong>?
              This action cannot be undone.
            </p>

            <div className="delete-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={deleteIssue}
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

export default Issuing;