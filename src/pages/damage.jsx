// src/pages/damage.jsx

import React, { useMemo, useState } from "react";
import {
  BsSearch,
  BsFunnel,
  BsPlus,
  BsArrowClockwise,
  BsTrash,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsExclamationTriangle,
  BsCheckCircle,
  BsClockHistory,
  BsBoxSeam,
  BsX,
  BsEye,
  BsClipboardCheck,
  BsDownload,
  BsPrinter,
  BsChevronLeft,
  BsChevronRight,
  BsShieldExclamation,
} from "react-icons/bs";
import "./damage.css";

const initialRecords = [
  {
    id: 1,
    assetTag: "AST-00124",
    asset: "Dell Latitude 5520",
    type: "Damage",
    employee: "John Smith",
    department: "Information Technology",
    date: "07 Sep 2026",
    severity: "High",
    status: "Under Review",
    description: "Screen damaged while equipment was being moved.",
    location: "IT Department",
    reportedBy: "Admin",
  },
  {
    id: 2,
    assetTag: "AST-00119",
    asset: "HP LaserJet Pro",
    type: "Damage",
    employee: "Sarah Johnson",
    department: "Human Resources",
    date: "06 Sep 2026",
    severity: "Medium",
    status: "Repairing",
    description: "Paper tray and front panel damaged.",
    location: "HR Department",
    reportedBy: "Sarah Johnson",
  },
  {
    id: 3,
    assetTag: "AST-00116",
    asset: "Lenovo ThinkPad E14",
    type: "Lost",
    employee: "Michael Brown",
    department: "Finance",
    date: "05 Sep 2026",
    severity: "Critical",
    status: "Reported",
    description: "Laptop reported missing from employee office.",
    location: "Finance Department",
    reportedBy: "Michael Brown",
  },
  {
    id: 4,
    assetTag: "AST-00108",
    asset: 'Samsung Monitor 24"',
    type: "Damage",
    employee: "David Wilson",
    department: "Operations",
    date: "04 Sep 2026",
    severity: "Low",
    status: "Resolved",
    description: "Minor scratches found on monitor casing.",
    location: "Operations Department",
    reportedBy: "Admin",
  },
  {
    id: 5,
    assetTag: "AST-00098",
    asset: "Epson Projector",
    type: "Lost",
    employee: "Emily Davis",
    department: "Administration",
    date: "03 Sep 2026",
    severity: "High",
    status: "Reported",
    description: "Projector could not be located after a meeting.",
    location: "Conference Room",
    reportedBy: "Emily Davis",
  },
  {
    id: 6,
    assetTag: "AST-00087",
    asset: "HP Desktop Computer",
    type: "Damage",
    employee: "Robert Taylor",
    department: "Finance",
    date: "01 Sep 2026",
    severity: "Medium",
    status: "Under Review",
    description: "Power supply stopped working.",
    location: "Finance Department",
    reportedBy: "Robert Taylor",
  },
];

const emptyForm = {
  assetTag: "",
  asset: "",
  type: "Damage",
  employee: "",
  department: "",
  date: "",
  severity: "Medium",
  status: "Reported",
  description: "",
  location: "",
  reportedBy: "",
};

const Damage = () => {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const text = `
        ${item.assetTag}
        ${item.asset}
        ${item.employee}
        ${item.department}
        ${item.type}
        ${item.status}
        ${item.description}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesType =
        typeFilter === "All" || item.type === typeFilter;
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchesSeverity =
        severityFilter === "All" || item.severity === severityFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesSeverity
      );
    });
  }, [records, search, typeFilter, statusFilter, severityFilter]);

  const stats = {
    total: records.length,
    damage: records.filter((r) => r.type === "Damage").length,
    lost: records.filter((r) => r.type === "Lost").length,
    pending: records.filter(
      (r) =>
        r.status === "Reported" ||
        r.status === "Under Review" ||
        r.status === "Repairing"
    ).length,
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingId(record.id);
    setForm({
      assetTag: record.assetTag,
      asset: record.asset,
      type: record.type,
      employee: record.employee,
      department: record.department,
      date: convertDateForInput(record.date),
      severity: record.severity,
      status: record.status,
      description: record.description,
      location: record.location,
      reportedBy: record.reportedBy,
    });
    setShowModal(true);
  };

  const convertDateForInput = (date) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return parsed.toISOString().split("T")[0];
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleChange = (e) => {
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
      !form.department ||
      !form.date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingId
            ? {
                ...record,
                ...form,
                date: formatDate(form.date),
              }
            : record
        )
      );
    } else {
      const newRecord = {
        id: Date.now(),
        ...form,
        date: formatDate(form.date),
      };

      setRecords((prev) => [newRecord, ...prev]);
    }

    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const deleteRecord = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this damage/loss record?"
    );

    if (!confirmed) return;

    setRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const markResolved = (id) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Resolved",
            }
          : item
      )
    );
  };

  const viewRecord = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setSeverityFilter("All");
  };

  const refresh = () => {
    setRecords([...records]);
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setSeverityFilter("All");
  };

  const exportCSV = () => {
    const headers = [
      "Asset Tag",
      "Asset",
      "Type",
      "Employee",
      "Department",
      "Date",
      "Severity",
      "Status",
      "Location",
      "Description",
    ];

    const rows = records.map((r) => [
      r.assetTag,
      r.asset,
      r.type,
      r.employee,
      r.department,
      r.date,
      r.severity,
      r.status,
      r.location,
      r.description,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "damage-loss-records.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="damage-page">
      {/* PAGE HEADER */}
      <div className="damage-header">
        <div className="damage-title-section">
          <div className="damage-title-icon">
            <BsShieldExclamation />
          </div>

          <div>
            <h1>Damage / Loss</h1>
            <p>
              Report, track and manage damaged or lost office equipment.
            </p>
          </div>
        </div>

        <div className="damage-header-actions">
          <button
            className="damage-btn damage-btn-light"
            onClick={clearFilters}
          >
            <BsTrash />
            <span>Clear</span>
          </button>

          <button
            className="damage-btn damage-btn-light"
            onClick={refresh}
          >
            <BsArrowClockwise />
            <span>Refresh</span>
          </button>

          <button
            className="damage-btn damage-btn-light"
            onClick={printPage}
          >
            <BsPrinter />
            <span>Print</span>
          </button>

          <button
            className="damage-btn damage-btn-light"
            onClick={exportCSV}
          >
            <BsDownload />
            <span>Export</span>
          </button>

          <button
            className="damage-btn damage-btn-primary"
            onClick={openAddModal}
          >
            <BsPlus />
            <span>Report Damage / Loss</span>
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="damage-stat-grid">
        <div className="damage-stat-card">
          <div className="damage-stat-icon blue">
            <BsBoxSeam />
          </div>

          <div>
            <span>Total Records</span>
            <strong>{stats.total}</strong>
            <small>All reported incidents</small>
          </div>
        </div>

        <div className="damage-stat-card">
          <div className="damage-stat-icon red">
            <BsExclamationTriangle />
          </div>

          <div>
            <span>Damaged</span>
            <strong>{stats.damage}</strong>
            <small>Equipment damage reports</small>
          </div>
        </div>

        <div className="damage-stat-card">
          <div className="damage-stat-icon orange">
            <BsShieldExclamation />
          </div>

          <div>
            <span>Lost</span>
            <strong>{stats.lost}</strong>
            <small>Missing equipment</small>
          </div>
        </div>

        <div className="damage-stat-card">
          <div className="damage-stat-icon purple">
            <BsClockHistory />
          </div>

          <div>
            <span>Pending</span>
            <strong>{stats.pending}</strong>
            <small>Requires attention</small>
          </div>
        </div>
      </div>

      {/* MAIN TABLE CARD */}
      <div className="damage-card">
        <div className="damage-card-top">
          <div>
            <h2>
              <BsClipboardCheck />
              Damage & Loss Records
            </h2>

            <p>
              Review reported incidents and equipment recovery status.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="damage-filter-area">
          <div className="damage-search">
            <BsSearch />
            <input
              type="text"
              placeholder="Search asset, employee, tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="damage-select">
            <BsFunnel />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Damage">Damage</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="damage-select">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="damage-select">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Reported">Reported</option>
              <option value="Under Review">Under Review</option>
              <option value="Repairing">Repairing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button
            className="damage-filter-clear"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="damage-table-wrapper">
          <table className="damage-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ASSET</th>
                <th>TYPE</th>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>DATE</th>
                <th>SEVERITY</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="damage-empty">
                      <BsSearch />
                      <h3>No records found</h3>
                      <p>
                        Try changing your search or filter options.
                      </p>

                      <button
                        className="damage-btn damage-btn-primary"
                        onClick={openAddModal}
                      >
                        <BsPlus />
                        Add Record
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record, index) => (
                  <tr key={record.id}>
                    <td className="damage-number">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td>
                      <div className="damage-asset">
                        <div className="damage-asset-icon">
                          <BsBoxSeam />
                        </div>

                        <div>
                          <strong>{record.asset}</strong>
                          <span>{record.assetTag}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`damage-type ${
                          record.type === "Lost"
                            ? "lost"
                            : "damage"
                        }`}
                      >
                        {record.type === "Lost" ? (
                          <BsShieldExclamation />
                        ) : (
                          <BsExclamationTriangle />
                        )}
                        {record.type}
                      </span>
                    </td>

                    <td>
                      <div className="damage-person">
                        <strong>{record.employee}</strong>
                      </div>
                    </td>

                    <td>{record.department}</td>

                    <td>{record.date}</td>

                    <td>
                      <span
                        className={`damage-severity ${record.severity.toLowerCase()}`}
                      >
                        {record.severity}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`damage-status ${record.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <i></i>
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <div className="damage-actions">
                        <button
                          title="View"
                          onClick={() => viewRecord(record)}
                        >
                          <BsEye />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => openEditModal(record)}
                        >
                          <BsPencilSquare />
                        </button>

                        <div className="damage-more">
                          <button title="More">
                            <BsThreeDotsVertical />
                          </button>

                          <div className="damage-dropdown">
                            <button
                              onClick={() =>
                                viewRecord(record)
                              }
                            >
                              <BsEye />
                              View Details
                            </button>

                            <button
                              onClick={() =>
                                openEditModal(record)
                              }
                            >
                              <BsPencilSquare />
                              Edit Record
                            </button>

                            {record.status !== "Resolved" && (
                              <button
                                onClick={() =>
                                  markResolved(record.id)
                                }
                              >
                                <BsCheckCircle />
                                Mark Resolved
                              </button>
                            )}

                            <button
                              className="danger"
                              onClick={() =>
                                deleteRecord(record.id)
                              }
                            >
                              <BsTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="damage-table-footer">
          <span>
            Showing{" "}
            <strong>{filteredRecords.length}</strong> of{" "}
            <strong>{records.length}</strong> records
          </span>

          <div className="damage-pagination">
            <button disabled>
              <BsChevronLeft />
            </button>

            <button className="active">1</button>

            <button disabled>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="damage-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="damage-modal">
            <div className="damage-modal-header">
              <div>
                <div className="damage-modal-icon">
                  <BsExclamationTriangle />
                </div>

                <div>
                  <h2>
                    {editingId
                      ? "Edit Damage / Loss"
                      : "Report Damage / Loss"}
                  </h2>

                  <p>
                    Enter the equipment incident information below.
                  </p>
                </div>
              </div>

              <button
                className="damage-close"
                onClick={() => setShowModal(false)}
              >
                <BsX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="damage-form-grid">
                <div className="damage-form-group">
                  <label>
                    Asset Tag <span>*</span>
                  </label>

                  <input
                    name="assetTag"
                    value={form.assetTag}
                    onChange={handleChange}
                    placeholder="e.g. AST-00124"
                    required
                  />
                </div>

                <div className="damage-form-group">
                  <label>
                    Asset Name <span>*</span>
                  </label>

                  <input
                    name="asset"
                    value={form.asset}
                    onChange={handleChange}
                    placeholder="e.g. Dell Latitude 5520"
                    required
                  />
                </div>

                <div className="damage-form-group">
                  <label>
                    Incident Type <span>*</span>
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Damage">Damage</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div className="damage-form-group">
                  <label>
                    Employee <span>*</span>
                  </label>

                  <input
                    name="employee"
                    value={form.employee}
                    onChange={handleChange}
                    placeholder="Employee name"
                    required
                  />
                </div>

                <div className="damage-form-group">
                  <label>
                    Department <span>*</span>
                  </label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select department</option>
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
                  </select>
                </div>

                <div className="damage-form-group">
                  <label>
                    Report Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="damage-form-group">
                  <label>Severity</label>

                  <select
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="damage-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Reported">Reported</option>
                    <option value="Under Review">
                      Under Review
                    </option>
                    <option value="Repairing">Repairing</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="damage-form-group full">
                  <label>Location</label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Where was the equipment damaged/lost?"
                  />
                </div>

                <div className="damage-form-group">
                  <label>Reported By</label>

                  <input
                    name="reportedBy"
                    value={form.reportedBy}
                    onChange={handleChange}
                    placeholder="Person reporting incident"
                  />
                </div>

                <div className="damage-form-group full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe what happened..."
                  />
                </div>
              </div>

              <div className="damage-modal-footer">
                <button
                  type="button"
                  className="damage-btn damage-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="damage-btn damage-btn-primary"
                >
                  <BsCheckCircle />
                  {editingId ? "Update Record" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails && selectedRecord && (
        <div
          className="damage-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowDetails(false);
            }
          }}
        >
          <div className="damage-details-modal">
            <div className="damage-modal-header">
              <div>
                <div className="damage-modal-icon">
                  <BsEye />
                </div>

                <div>
                  <h2>Incident Details</h2>
                  <p>{selectedRecord.assetTag}</p>
                </div>
              </div>

              <button
                className="damage-close"
                onClick={() => setShowDetails(false)}
              >
                <BsX />
              </button>
            </div>

            <div className="damage-details-body">
              <div className="damage-details-main">
                <span className="details-label">Equipment</span>
                <strong>{selectedRecord.asset}</strong>
                <small>{selectedRecord.assetTag}</small>
              </div>

              <div className="damage-detail-grid">
                <div>
                  <span>Incident Type</span>
                  <strong>{selectedRecord.type}</strong>
                </div>

                <div>
                  <span>Employee</span>
                  <strong>{selectedRecord.employee}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{selectedRecord.department}</strong>
                </div>

                <div>
                  <span>Date Reported</span>
                  <strong>{selectedRecord.date}</strong>
                </div>

                <div>
                  <span>Severity</span>
                  <strong>{selectedRecord.severity}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedRecord.status}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedRecord.location || "Not specified"}
                  </strong>
                </div>

                <div>
                  <span>Reported By</span>
                  <strong>
                    {selectedRecord.reportedBy || "Not specified"}
                  </strong>
                </div>
              </div>

              <div className="damage-description-box">
                <span>Description</span>
                <p>
                  {selectedRecord.description ||
                    "No description provided."}
                </p>
              </div>
            </div>

            <div className="damage-modal-footer">
              <button
                className="damage-btn damage-btn-cancel"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

              <button
                className="damage-btn damage-btn-primary"
                onClick={() => {
                  setShowDetails(false);
                  openEditModal(selectedRecord);
                }}
              >
                <BsPencilSquare />
                Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Damage;