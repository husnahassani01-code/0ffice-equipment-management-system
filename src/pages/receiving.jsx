import React, { useState } from "react";
import {
  BsBoxArrowInDown,
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
import "./receiving.css";

const initialReceivings = [
  {
    id: 1,
    receivingId: "REC-0001",
    assetTag: "AST-1001",
    asset: "Dell Latitude 5420",
    receivedFrom: "John Peter",
    department: "ICT",
    issueDate: "2026-08-12",
    receiveDate: "2026-09-10",
    condition: "Good",
    status: "Received",
    receivedBy: "Admin",
    notes: "Returned after completion of assignment",
  },
  {
    id: 2,
    receivingId: "REC-0002",
    assetTag: "AST-1002",
    asset: "HP ProBook 450",
    receivedFrom: "Mary Joseph",
    department: "Finance",
    issueDate: "2026-08-15",
    receiveDate: "2026-09-12",
    condition: "Fair",
    status: "Received",
    receivedBy: "Admin",
    notes: "Minor scratches on the body",
  },
  {
    id: 3,
    receivingId: "REC-0003",
    assetTag: "AST-1003",
    asset: "Samsung Monitor 24",
    receivedFrom: "David Michael",
    department: "HR",
    issueDate: "2026-08-18",
    receiveDate: "2026-09-14",
    condition: "Damaged",
    status: "Under Inspection",
    receivedBy: "Manager",
    notes: "Screen requires inspection",
  },
  {
    id: 4,
    receivingId: "REC-0004",
    assetTag: "AST-1004",
    asset: "Lenovo ThinkPad E14",
    receivedFrom: "Grace Daniel",
    department: "Administration",
    issueDate: "2026-08-20",
    receiveDate: "2026-09-16",
    condition: "Good",
    status: "Received",
    receivedBy: "Admin",
    notes: "Equipment received in good condition",
  },
];

function Receiving() {
  const [receivings, setReceivings] = useState(initialReceivings);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingReceiving, setEditingReceiving] = useState(null);
  const [selectedReceiving, setSelectedReceiving] = useState(null);

  const emptyForm = {
    assetTag: "",
    asset: "",
    receivedFrom: "",
    department: "",
    issueDate: "",
    receiveDate: "",
    condition: "Good",
    status: "Received",
    receivedBy: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredReceivings = receivings.filter((item) => {
    const searchText = `
      ${item.receivingId}
      ${item.assetTag}
      ${item.asset}
      ${item.receivedFrom}
      ${item.department}
      ${item.receivedBy}
    `.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

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
    setEditingReceiving(null);

    setForm({
      ...emptyForm,
      receiveDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingReceiving(item);

    setForm({
      assetTag: item.assetTag,
      asset: item.asset,
      receivedFrom: item.receivedFrom,
      department: item.department,
      issueDate: item.issueDate,
      receiveDate: item.receiveDate,
      condition: item.condition,
      status: item.status,
      receivedBy: item.receivedBy,
      notes: item.notes,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.assetTag ||
      !form.asset ||
      !form.receivedFrom ||
      !form.department ||
      !form.receiveDate ||
      !form.receivedBy
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingReceiving) {
      setReceivings(
        receivings.map((item) =>
          item.id === editingReceiving.id
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
    } else {
      const newReceiving = {
        id: Date.now(),
        receivingId: `REC-${String(
          receivings.length + 1
        ).padStart(4, "0")}`,
        ...form,
      };

      setReceivings([
        newReceiving,
        ...receivings,
      ]);
    }

    setShowModal(false);
    setEditingReceiving(null);
    setForm(emptyForm);
  };

  const openViewModal = (item) => {
    setSelectedReceiving(item);
    setShowViewModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedReceiving(item);
    setShowDeleteModal(true);
  };

  const deleteReceiving = () => {
    setReceivings(
      receivings.filter(
        (item) => item.id !== selectedReceiving.id
      )
    );

    setShowDeleteModal(false);
    setSelectedReceiving(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  const refreshData = () => {
    setReceivings([...receivings]);
  };

  const exportCSV = () => {
    const headers = [
      "Receiving ID",
      "Asset Tag",
      "Equipment",
      "Received From",
      "Department",
      "Issue Date",
      "Receive Date",
      "Condition",
      "Status",
      "Received By",
      "Notes",
    ];

    const rows = filteredReceivings.map((item) => [
      item.receivingId,
      item.assetTag,
      item.asset,
      item.receivedFrom,
      item.department,
      item.issueDate,
      item.receiveDate,
      item.condition,
      item.status,
      item.receivedBy,
      item.notes,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value || "").replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "equipment-receiving.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const printReceivings = () => {
    window.print();
  };

  const receivedCount = receivings.filter(
    (item) => item.status === "Received"
  ).length;

  const inspectionCount = receivings.filter(
    (item) => item.status === "Under Inspection"
  ).length;

  const damagedCount = receivings.filter(
    (item) => item.condition === "Damaged"
  ).length;

  return (
    <div className="receiving-page">

      {/* HEADER */}
      <div className="receiving-header">
        <div>
          <h2>
            <BsBoxArrowInDown />
            Equipment Receiving
          </h2>
          <p>
            Record and manage equipment received back
          </p>
        </div>

        <button
          className="btn-primary-receiving"
          onClick={openAddModal}
        >
          <BsPlus />
           Add Receiving
        </button>
      </div>

      {/* SUMMARY */}
      <div className="receiving-summary">

        <div className="receiving-summary-card">
          <div className="receiving-icon blue">
            <BsBoxSeam />
          </div>

          <div>
            <span>Total Received</span>
            <strong>{receivings.length}</strong>
          </div>
        </div>

        <div className="receiving-summary-card">
          <div className="receiving-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Received</span>
            <strong>{receivedCount}</strong>
          </div>
        </div>

        <div className="receiving-summary-card">
          <div className="receiving-icon orange">
            <BsBoxArrowInDown />
          </div>

          <div>
            <span>Under Inspection</span>
            <strong>{inspectionCount}</strong>
          </div>
        </div>

        <div className="receiving-summary-card">
          <div className="receiving-icon red">
            <BsBoxSeam />
          </div>

          <div>
            <span>Damaged</span>
            <strong>{damagedCount}</strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="receiving-toolbar">

        <div className="receiving-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search receiving, asset, employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Received">Received</option>
          <option value="Under Inspection">
            Under Inspection
          </option>
        </select>

        <button
          className="receiving-tool-btn"
          onClick={refreshData}
        >
          <BsArrowClockwise />
        </button>

        <button
          className="receiving-tool-btn"
          onClick={clearFilters}
        >
          <BsX />
          Clear
        </button>

        <button
          className="receiving-tool-btn"
          onClick={exportCSV}
        >
          <BsDownload />
          Export
        </button>

        <button
          className="receiving-tool-btn"
          onClick={printReceivings}
        >
          <BsPrinter />
          Print
        </button>

      </div>

      {/* TABLE */}
      <div className="receiving-table-container">

        <table className="receiving-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Receiving ID</th>
              <th>Equipment</th>
              <th>Received From</th>
              <th>Department</th>
              <th>Receive Date</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredReceivings.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="no-receiving-data"
                >
                  <BsBoxArrowInDown />
                  <p>No receiving records found</p>
                </td>
              </tr>
            ) : (
              filteredReceivings.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong className="receiving-id">
                      {item.receivingId}
                    </strong>
                  </td>

                  <td>
                    <div className="receiving-equipment-cell">

                      <div className="receiving-equipment-icon">
                        <BsBoxSeam />
                      </div>

                      <div>
                        <strong>{item.asset}</strong>
                        <small>{item.assetTag}</small>
                      </div>

                    </div>
                  </td>

                  <td>
                    <div className="receiving-person-cell">

                      <div className="receiving-person-icon">
                        <BsPerson />
                      </div>

                      <span>
                        {item.receivedFrom}
                      </span>

                    </div>
                  </td>

                  <td>
                    <span className="receiving-department">
                      <BsBuilding />
                      {item.department}
                    </span>
                  </td>

                  <td>{item.receiveDate}</td>

                  <td>
                    <span
                      className={`receiving-condition ${item.condition.toLowerCase()}`}
                    >
                      {item.condition}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`receiving-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>

                    <div className="receiving-actions">

                      <button
                        className="receiving-view"
                        onClick={() =>
                          openViewModal(item)
                        }
                        title="View"
                      >
                        <BsEye />
                      </button>

                      <button
                        className="receiving-edit"
                        onClick={() =>
                          openEditModal(item)
                        }
                        title="Edit"
                      >
                        <BsPencilSquare />
                      </button>

                      <button
                        className="receiving-delete"
                        onClick={() =>
                          openDeleteModal(item)
                        }
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
      <div className="mobile-receiving-list">

        {filteredReceivings.map((item) => (
          <div
            className="mobile-receiving-card"
            key={item.id}
          >

            <div className="mobile-receiving-top">

              <div>
                <strong>
                  {item.receivingId}
                </strong>

                <small>
                  {item.assetTag}
                </small>
              </div>

              <span
                className={`receiving-status ${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>

            </div>

            <h4>{item.asset}</h4>

            <div className="mobile-receiving-info">

              <span>
                <BsPerson />
                {item.receivedFrom}
              </span>

              <span>
                <BsBuilding />
                {item.department}
              </span>

              <span>
                <BsCalendar3 />
                {item.receiveDate}
              </span>

              <span>
                <BsBoxSeam />
                {item.condition}
              </span>

            </div>

            <div className="mobile-receiving-actions">

              <button
                onClick={() =>
                  openViewModal(item)
                }
              >
                <BsEye />
                View
              </button>

              <button
                onClick={() =>
                  openEditModal(item)
                }
              >
                <BsPencilSquare />
                Edit
              </button>

              <button
                onClick={() =>
                  openDeleteModal(item)
                }
              >
                <BsTrash />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="receiving-pagination">

        <span>
          Showing {filteredReceivings.length} of{" "}
          {receivings.length} records
        </span>

        <div>

          <button>
            <BsChevronLeft />
          </button>

          <button className="receiving-active-page">
            1
          </button>

          <button>
            <BsChevronRight />
          </button>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="receiving-modal-overlay">

          <div className="receiving-modal">

            <div className="receiving-modal-header">

              <div>
                <h3>
                  {editingReceiving
                    ? "Edit Receiving Record"
                    : "Receive Equipment"}
                </h3>

                <p>
                  {editingReceiving
                    ? "Update equipment receiving information"
                    : "Record equipment received from an employee"}
                </p>
              </div>

              <button
                className="receiving-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <BsX />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="receiving-form-grid">

                <div className="receiving-form-group">

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

                <div className="receiving-form-group">

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

                <div className="receiving-form-group">

                  <label>
                    Received From <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="receivedFrom"
                    placeholder="Employee / person"
                    value={form.receivedFrom}
                    onChange={handleChange}
                  />

                </div>

                <div className="receiving-form-group">

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

                    <option value="ICT">
                      ICT
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="HR">
                      HR
                    </option>

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

                <div className="receiving-form-group">

                  <label>
                    Original Issue Date
                  </label>

                  <input
                    type="date"
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="receiving-form-group">

                  <label>
                    Receive Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="receiveDate"
                    value={form.receiveDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="receiving-form-group">

                  <label>
                    Condition on Receipt
                  </label>

                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                  >
                    <option value="Good">
                      Good
                    </option>

                    <option value="Fair">
                      Fair
                    </option>

                    <option value="Damaged">
                      Damaged
                    </option>

                  </select>

                </div>

                <div className="receiving-form-group">

                  <label>
                    Receiving Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Received">
                      Received
                    </option>

                    <option value="Under Inspection">
                      Under Inspection
                    </option>

                  </select>

                </div>

                <div className="receiving-form-group">

                  <label>
                    Received By <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="receivedBy"
                    placeholder="Person receiving equipment"
                    value={form.receivedBy}
                    onChange={handleChange}
                  />

                </div>

                <div className="receiving-form-group full-width">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Enter condition, accessories, damage or other information..."
                    value={form.notes}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="receiving-modal-footer">

                <button
                  type="button"
                  className="receiving-cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="receiving-save-btn"
                >
                  <BsCheckCircleFill />

                  {editingReceiving
                    ? "Update Receiving"
                    : "Receive Equipment"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedReceiving && (
        <div className="receiving-modal-overlay">

          <div className="receiving-modal receiving-view-modal">

            <div className="receiving-modal-header">

              <div>
                <h3>
                  Receiving Details
                </h3>

                <p>
                  {selectedReceiving.receivingId}
                </p>
              </div>

              <button
                className="receiving-modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                <BsX />
              </button>

            </div>

            <div className="receiving-details">

              <div className="receiving-detail-box">
                <span>Receiving ID</span>
                <strong>
                  {selectedReceiving.receivingId}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Asset Tag</span>
                <strong>
                  {selectedReceiving.assetTag}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Equipment</span>
                <strong>
                  {selectedReceiving.asset}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Received From</span>
                <strong>
                  {selectedReceiving.receivedFrom}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Department</span>
                <strong>
                  {selectedReceiving.department}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Issue Date</span>
                <strong>
                  {selectedReceiving.issueDate || "-"}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Receive Date</span>
                <strong>
                  {selectedReceiving.receiveDate}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Condition</span>
                <strong>
                  {selectedReceiving.condition}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Status</span>
                <strong>
                  {selectedReceiving.status}
                </strong>
              </div>

              <div className="receiving-detail-box">
                <span>Received By</span>
                <strong>
                  {selectedReceiving.receivedBy}
                </strong>
              </div>

              <div className="receiving-detail-box full-receiving-detail">

                <span>Notes</span>

                <strong>
                  {selectedReceiving.notes ||
                    "No notes"}
                </strong>

              </div>

            </div>

            <div className="receiving-modal-footer">

              <button
                className="receiving-cancel-btn"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                Close
              </button>

              <button
                className="receiving-save-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(
                    selectedReceiving
                  );
                }}
              >
                <BsPencilSquare />
                Edit Receiving
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedReceiving && (
        <div className="receiving-modal-overlay">

          <div className="receiving-delete-modal">

            <div className="receiving-delete-icon">
              <BsTrash />
            </div>

            <h3>
              Delete Receiving Record?
            </h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {selectedReceiving.receivingId}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="receiving-delete-actions">

              <button
                className="receiving-cancel-btn"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="receiving-confirm-delete"
                onClick={deleteReceiving}
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

export default Receiving;