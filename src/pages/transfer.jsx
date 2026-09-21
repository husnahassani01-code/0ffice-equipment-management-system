import React, { useMemo, useState } from "react";
import {
  BsArrowLeftRight,
  BsPlus,
  BsSearch,
  BsFilter,
  BsArrowClockwise,
  BsTrash,
  BsEye,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsX,
  BsBoxSeam,
  BsPerson,
  BsBuilding,
  BsCalendar3,
  BsCheckCircle,
  BsClock,
  BsExclamationCircle,
  BsDownload,
  BsArrowRight,
  BsTelephone,
  BsEnvelope,
} from "react-icons/bs";
import "./transfer.css";

const initialTransfers = [
  {
    id: 1,
    transferNo: "TRF-0001",
    assetTag: "AST-00124",
    asset: "Dell Latitude 5520",
    category: "Laptop",
    fromEmployee: "John Smith",
    fromDepartment: "Information Technology",
    toEmployee: "Sarah Johnson",
    toDepartment: "Human Resources",
    reason: "Department transfer",
    date: "2026-09-07",
    status: "Completed",
    approvedBy: "Administrator",
  },
  {
    id: 2,
    transferNo: "TRF-0002",
    assetTag: "AST-00119",
    asset: "HP LaserJet Pro",
    category: "Printer",
    fromEmployee: "Sarah Johnson",
    fromDepartment: "Human Resources",
    toEmployee: "Michael Brown",
    toDepartment: "Finance",
    reason: "Office relocation",
    date: "2026-09-06",
    status: "Pending",
    approvedBy: "Administrator",
  },
  {
    id: 3,
    transferNo: "TRF-0003",
    assetTag: "AST-00116",
    asset: "Lenovo ThinkPad E14",
    category: "Laptop",
    fromEmployee: "Michael Brown",
    fromDepartment: "Finance",
    toEmployee: "David Wilson",
    toDepartment: "Operations",
    reason: "Employee reassignment",
    date: "2026-09-05",
    status: "Completed",
    approvedBy: "Manager",
  },
  {
    id: 4,
    transferNo: "TRF-0004",
    assetTag: "AST-00108",
    asset: 'Samsung Monitor 24"',
    category: "Monitor",
    fromEmployee: "David Wilson",
    fromDepartment: "Operations",
    toEmployee: "Emily Davis",
    toDepartment: "Administration",
    reason: "Equipment redistribution",
    date: "2026-09-04",
    status: "Pending",
    approvedBy: "Manager",
  },
  {
    id: 5,
    transferNo: "TRF-0005",
    assetTag: "AST-00102",
    asset: "HP ProBook 450",
    category: "Laptop",
    fromEmployee: "Emily Davis",
    fromDepartment: "Administration",
    toEmployee: "Robert Taylor",
    toDepartment: "Finance",
    reason: "Department transfer",
    date: "2026-09-03",
    status: "Completed",
    approvedBy: "Administrator",
  },
  {
    id: 6,
    transferNo: "TRF-0006",
    assetTag: "AST-00098",
    asset: "Canon ImageRunner",
    category: "Printer",
    fromEmployee: "Robert Taylor",
    fromDepartment: "Finance",
    toEmployee: "John Smith",
    toDepartment: "Information Technology",
    reason: "Equipment redistribution",
    date: "2026-09-02",
    status: "Cancelled",
    approvedBy: "Administrator",
  },
];

const employees = [
  {
    name: "John Smith",
    department: "Information Technology",
  },
  {
    name: "Sarah Johnson",
    department: "Human Resources",
  },
  {
    name: "Michael Brown",
    department: "Finance",
  },
  {
    name: "David Wilson",
    department: "Operations",
  },
  {
    name: "Emily Davis",
    department: "Administration",
  },
  {
    name: "Robert Taylor",
    department: "Finance",
  },
];

const assets = [
  {
    tag: "AST-00124",
    name: "Dell Latitude 5520",
    category: "Laptop",
  },
  {
    tag: "AST-00119",
    name: "HP LaserJet Pro",
    category: "Printer",
  },
  {
    tag: "AST-00116",
    name: "Lenovo ThinkPad E14",
    category: "Laptop",
  },
  {
    tag: "AST-00108",
    name: 'Samsung Monitor 24"',
    category: "Monitor",
  },
  {
    tag: "AST-00102",
    name: "HP ProBook 450",
    category: "Laptop",
  },
  {
    tag: "AST-00098",
    name: "Canon ImageRunner",
    category: "Printer",
  },
];

function Transfer() {
  const [transfers, setTransfers] = useState(initialTransfers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    assetTag: "",
    fromEmployee: "",
    fromDepartment: "",
    toEmployee: "",
    toDepartment: "",
    reason: "",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    approvedBy: "Administrator",
    notes: "",
  });

  const itemsPerPage = 5;

  const departments = [
    "Information Technology",
    "Human Resources",
    "Finance",
    "Operations",
    "Administration",
  ];

  const filteredTransfers = useMemo(() => {
    return transfers.filter((item) => {
      const text = `
        ${item.transferNo}
        ${item.assetTag}
        ${item.asset}
        ${item.fromEmployee}
        ${item.toEmployee}
        ${item.fromDepartment}
        ${item.toDepartment}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        item.fromDepartment === departmentFilter ||
        item.toDepartment === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [transfers, search, statusFilter, departmentFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransfers.length / itemsPerPage)
  );

  const paginatedTransfers = filteredTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const completedCount = transfers.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = transfers.filter(
    (item) => item.status === "Pending"
  ).length;

  const cancelledCount = transfers.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "fromEmployee") {
      const employee = employees.find((item) => item.name === value);

      if (employee) {
        setForm((prev) => ({
          ...prev,
          fromEmployee: value,
          fromDepartment: employee.department,
        }));
      }
    }

    if (name === "toEmployee") {
      const employee = employees.find((item) => item.name === value);

      if (employee) {
        setForm((prev) => ({
          ...prev,
          toEmployee: value,
          toDepartment: employee.department,
        }));
      }
    }
  };

  const handleAssetChange = (e) => {
    const selectedAsset = assets.find(
      (item) => item.tag === e.target.value
    );

    setForm((prev) => ({
      ...prev,
      assetTag: e.target.value,
    }));

    if (selectedAsset) {
      // Keeps the selected asset ready for submission.
      setForm((prev) => ({
        ...prev,
        assetTag: selectedAsset.tag,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.assetTag ||
      !form.fromEmployee ||
      !form.toEmployee ||
      !form.date ||
      !form.reason
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (form.fromEmployee === form.toEmployee) {
      alert("The source and destination employee cannot be the same.");
      return;
    }

    const selectedAsset = assets.find(
      (item) => item.tag === form.assetTag
    );

    const newTransfer = {
      id: Date.now(),
      transferNo: `TRF-${String(transfers.length + 1).padStart(4, "0")}`,
      assetTag: form.assetTag,
      asset: selectedAsset?.name || "Unknown Asset",
      category: selectedAsset?.category || "Equipment",
      fromEmployee: form.fromEmployee,
      fromDepartment: form.fromDepartment,
      toEmployee: form.toEmployee,
      toDepartment: form.toDepartment,
      reason: form.reason,
      date: form.date,
      status: form.status,
      approvedBy: form.approvedBy,
      notes: form.notes,
    };

    setTransfers((prev) => [newTransfer, ...prev]);

    setForm({
      assetTag: "",
      fromEmployee: "",
      fromDepartment: "",
      toEmployee: "",
      toDepartment: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      approvedBy: "Administrator",
      notes: "",
    });

    setShowModal(false);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transfer record?"
    );

    if (!confirmed) return;

    setTransfers((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const handleClear = () => {
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCurrentPage(1);
    setOpenMenu(null);
  };

  const openTransferDetails = (transfer) => {
    setSelectedTransfer(transfer);
    setShowDetails(true);
    setOpenMenu(null);
  };

  const editTransfer = (transfer) => {
    setForm({
      assetTag: transfer.assetTag,
      fromEmployee: transfer.fromEmployee,
      fromDepartment: transfer.fromDepartment,
      toEmployee: transfer.toEmployee,
      toDepartment: transfer.toDepartment,
      reason: transfer.reason,
      date: transfer.date,
      status: transfer.status,
      approvedBy: transfer.approvedBy,
      notes: transfer.notes || "",
    });

    setSelectedTransfer(transfer);
    setShowModal(true);
    setOpenMenu(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedTransfer) {
      handleSubmit(e);
      return;
    }

    if (
      !form.assetTag ||
      !form.fromEmployee ||
      !form.toEmployee ||
      !form.date ||
      !form.reason
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const selectedAsset = assets.find(
      (item) => item.tag === form.assetTag
    );

    setTransfers((prev) =>
      prev.map((item) =>
        item.id === selectedTransfer.id
          ? {
              ...item,
              assetTag: form.assetTag,
              asset: selectedAsset?.name || item.asset,
              category: selectedAsset?.category || item.category,
              fromEmployee: form.fromEmployee,
              fromDepartment: form.fromDepartment,
              toEmployee: form.toEmployee,
              toDepartment: form.toDepartment,
              reason: form.reason,
              date: form.date,
              status: form.status,
              approvedBy: form.approvedBy,
              notes: form.notes,
            }
          : item
      )
    );

    setSelectedTransfer(null);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransfer(null);

    setForm({
      assetTag: "",
      fromEmployee: "",
      fromDepartment: "",
      toEmployee: "",
      toDepartment: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      approvedBy: "Administrator",
      notes: "",
    });
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "Pending") return "status-pending";
    if (status === "Cancelled") return "status-cancelled";
    return "";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const exportTransfers = () => {
    const headers = [
      "Transfer No",
      "Asset Tag",
      "Asset",
      "From Employee",
      "From Department",
      "To Employee",
      "To Department",
      "Reason",
      "Date",
      "Status",
    ];

    const rows = filteredTransfers.map((item) => [
      item.transferNo,
      item.assetTag,
      item.asset,
      item.fromEmployee,
      item.fromDepartment,
      item.toEmployee,
      item.toDepartment,
      item.reason,
      item.date,
      item.status,
    ]);

    const csv = [headers, ...rows]
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
    link.download = "equipment-transfers.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="transfers-page">
      {/* PAGE HEADER */}
      <div className="transfers-header">
        <div className="transfers-title">
          <div className="transfers-title-icon">
            <BsArrowLeftRight />
          </div>

          <div>
            <h1>Equipment Transfers</h1>
            <p>
              Transfer office equipment between employees and departments.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-light"
            onClick={handleClear}
          >
            <BsTrash />
            Clear
          </button>

          <button
            type="button"
            className="btn btn-light"
            onClick={handleRefresh}
          >
            <BsArrowClockwise />
            Refresh
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedTransfer(null);
              setShowModal(true);
            }}
          >
            <BsPlus />
            New Transfer
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="transfer-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <BsArrowLeftRight />
          </div>

          <div>
            <span>Total Transfers</span>
            <strong>{transfers.length}</strong>
            <small>All transfer records</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <BsCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
            <small>Successfully transferred</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <BsClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
            <small>Awaiting completion</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <BsExclamationCircle />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
            <small>Cancelled transfers</small>
          </div>
        </div>
      </div>

      {/* FILTER CARD */}
      <div className="transfer-filter-card">
        <div className="filter-top">
          <div>
            <h2>Transfer Records</h2>
            <p>View and manage equipment movement records.</p>
          </div>

          <button
            type="button"
            className="btn btn-export"
            onClick={exportTransfers}
          >
            <BsDownload />
            Export
          </button>
        </div>

        <div className="filters">
          <div className="search-box">
            <BsSearch />
            <input
              type="text"
              placeholder="Search transfers, assets, employees..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
              >
                <BsX />
              </button>
            )}
          </div>

          <div className="select-box">
            <BsFilter />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="select-box">
            <BsBuilding />
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Departments</option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="transfer-table-card">
        <div className="table-wrapper">
          <table className="transfer-table">
            <thead>
              <tr>
                <th>#</th>
                <th>TRANSFER</th>
                <th>EQUIPMENT</th>
                <th>FROM</th>
                <th></th>
                <th>TO</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransfers.length > 0 ? (
                paginatedTransfers.map((transfer, index) => (
                  <tr key={transfer.id}>
                    <td className="number-cell">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td>
                      <div className="transfer-number">
                        {transfer.transferNo}
                      </div>
                      <small>{transfer.reason}</small>
                    </td>

                    <td>
                      <div className="equipment-cell">
                        <div className="equipment-icon">
                          <BsBoxSeam />
                        </div>

                        <div>
                          <strong>{transfer.asset}</strong>
                          <span>
                            {transfer.assetTag} · {transfer.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="person-cell">
                        <strong>{transfer.fromEmployee}</strong>
                        <span>{transfer.fromDepartment}</span>
                      </div>
                    </td>

                    <td className="arrow-cell">
                      <BsArrowRight />
                    </td>

                    <td>
                      <div className="person-cell">
                        <strong>{transfer.toEmployee}</strong>
                        <span>{transfer.toDepartment}</span>
                      </div>
                    </td>

                    <td>
                      <div className="date-cell">
                        <BsCalendar3 />
                        {formatDate(transfer.date)}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`transfer-status ${getStatusClass(
                          transfer.status
                        )}`}
                      >
                        <span></span>
                        {transfer.status}
                      </span>
                    </td>

                    <td className="action-cell">
                      <button
                        type="button"
                        className="action-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === transfer.id
                              ? null
                              : transfer.id
                          )
                        }
                      >
                        <BsThreeDotsVertical />
                      </button>

                      {openMenu === transfer.id && (
                        <div className="action-menu">
                          <button
                            type="button"
                            onClick={() =>
                              openTransferDetails(transfer)
                            }
                          >
                            <BsEye />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => editTransfer(transfer)}
                          >
                            <BsPencilSquare />
                            Edit Transfer
                          </button>

                          <button
                            type="button"
                            className="danger-item"
                            onClick={() =>
                              handleDelete(transfer.id)
                            }
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
                    <div className="empty-state">
                      <BsArrowLeftRight />
                      <h3>No transfer records found</h3>
                      <p>
                        Try changing your search or filters, or create a new
                        transfer.
                      </p>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                      >
                        <BsPlus />
                        New Transfer
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredTransfers.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                currentPage * itemsPerPage,
                filteredTransfers.length
              )}
            </strong>{" "}
            of <strong>{filteredTransfers.length}</strong> transfers
          </span>

          <div className="pagination-buttons">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                type="button"
                key={index + 1}
                className={
                  currentPage === index + 1 ? "active-page" : ""
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* NEW / EDIT TRANSFER MODAL */}
      {showModal && (
        <div className="modal-overlay" onMouseDown={closeModal}>
          <div
            className="transfer-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  {selectedTransfer
                    ? "Edit Equipment Transfer"
                    : "New Equipment Transfer"}
                </h2>

                <p>
                  {selectedTransfer
                    ? "Update the transfer information below."
                    : "Record movement of office equipment between employees."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
              >
                <BsX />
              </button>
            </div>

            <form
              onSubmit={
                selectedTransfer ? handleUpdate : handleSubmit
              }
            >
              <div className="form-section">
                <div className="section-heading">
                  <BsBoxSeam />
                  <span>Equipment Information</span>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Equipment <span>*</span>
                    </label>

                    <select
                      name="assetTag"
                      value={form.assetTag}
                      onChange={handleAssetChange}
                      required
                    >
                      <option value="">Select equipment</option>

                      {assets.map((asset) => (
                        <option key={asset.tag} value={asset.tag}>
                          {asset.tag} - {asset.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Transfer Reason</label>

                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select reason</option>
                      <option value="Department transfer">
                        Department transfer
                      </option>
                      <option value="Employee reassignment">
                        Employee reassignment
                      </option>
                      <option value="Office relocation">
                        Office relocation
                      </option>
                      <option value="Equipment redistribution">
                        Equipment redistribution
                      </option>
                      <option value="Temporary assignment">
                        Temporary assignment
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="transfer-direction">
                <div className="direction-card from-card">
                  <div className="direction-title">
                    <span className="direction-icon">
                      <BsPerson />
                    </span>
                    <div>
                      <strong>From</strong>
                      <small>Current assignment</small>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Employee <span>*</span>
                    </label>

                    <select
                      name="fromEmployee"
                      value={form.fromEmployee}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select employee</option>

                      {employees.map((employee) => (
                        <option
                          key={employee.name}
                          value={employee.name}
                        >
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Department</label>

                    <input
                      type="text"
                      name="fromDepartment"
                      value={form.fromDepartment}
                      readOnly
                      placeholder="Department"
                    />
                  </div>
                </div>

                <div className="transfer-direction-arrow">
                  <BsArrowRight />
                </div>

                <div className="direction-card to-card">
                  <div className="direction-title">
                    <span className="direction-icon">
                      <BsPerson />
                    </span>
                    <div>
                      <strong>To</strong>
                      <small>New assignment</small>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Employee <span>*</span>
                    </label>

                    <select
                      name="toEmployee"
                      value={form.toEmployee}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select employee</option>

                      {employees.map((employee) => (
                        <option
                          key={employee.name}
                          value={employee.name}
                        >
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Department</label>

                    <input
                      type="text"
                      name="toDepartment"
                      value={form.toDepartment}
                      readOnly
                      placeholder="Department"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-heading">
                  <BsCalendar3 />
                  <span>Transfer Details</span>
                </div>

                <div className="form-grid three-columns">
                  <div className="form-group">
                    <label>
                      Transfer Date <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Approved By</label>

                    <select
                      name="approvedBy"
                      value={form.approvedBy}
                      onChange={handleFormChange}
                    >
                      <option value="Administrator">
                        Administrator
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="System Admin">
                        System Admin
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleFormChange}
                    placeholder="Add any additional information about this transfer..."
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  <BsCheckCircle />
                  {selectedTransfer
                    ? "Update Transfer"
                    : "Create Transfer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails && selectedTransfer && (
        <div
          className="modal-overlay"
          onMouseDown={() => setShowDetails(false)}
        >
          <div
            className="details-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Transfer Details</h2>
                <p>{selectedTransfer.transferNo}</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowDetails(false)}
              >
                <BsX />
              </button>
            </div>

            <div className="details-content">
              <div className="details-status-row">
                <div>
                  <span className="details-label">TRANSFER NUMBER</span>
                  <strong>{selectedTransfer.transferNo}</strong>
                </div>

                <span
                  className={`transfer-status ${getStatusClass(
                    selectedTransfer.status
                  )}`}
                >
                  <span></span>
                  {selectedTransfer.status}
                </span>
              </div>

              <div className="details-equipment">
                <div className="large-equipment-icon">
                  <BsBoxSeam />
                </div>

                <div>
                  <span>Equipment</span>
                  <h3>{selectedTransfer.asset}</h3>
                  <p>
                    {selectedTransfer.assetTag} ·{" "}
                    {selectedTransfer.category}
                  </p>
                </div>
              </div>

              <div className="movement-details">
                <div className="movement-person">
                  <span className="details-label">TRANSFER FROM</span>

                  <div className="detail-person-icon">
                    <BsPerson />
                  </div>

                  <strong>{selectedTransfer.fromEmployee}</strong>
                  <span>{selectedTransfer.fromDepartment}</span>
                </div>

                <div className="large-arrow">
                  <BsArrowRight />
                </div>

                <div className="movement-person">
                  <span className="details-label">TRANSFER TO</span>

                  <div className="detail-person-icon">
                    <BsPerson />
                  </div>

                  <strong>{selectedTransfer.toEmployee}</strong>
                  <span>{selectedTransfer.toDepartment}</span>
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <BsCalendar3 />
                  <div>
                    <span>Transfer Date</span>
                    <strong>
                      {formatDate(selectedTransfer.date)}
                    </strong>
                  </div>
                </div>

                <div className="detail-item">
                  <BsArrowLeftRight />
                  <div>
                    <span>Reason</span>
                    <strong>{selectedTransfer.reason}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <BsPerson />
                  <div>
                    <span>Approved By</span>
                    <strong>{selectedTransfer.approvedBy}</strong>
                  </div>
                </div>
              </div>

              {selectedTransfer.notes && (
                <div className="notes-box">
                  <strong>Notes</strong>
                  <p>{selectedTransfer.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowDetails(false);
                  editTransfer(selectedTransfer);
                }}
              >
                <BsPencilSquare />
                Edit Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;