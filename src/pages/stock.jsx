import React, { useState } from "react";
import {
  BsBoxSeam,
  BsPlus,
  BsSearch,
  BsArrowClockwise,
  BsDownload,
  BsPrinter,
  BsEye,
  BsPencilSquare,
  BsTrash,
  BsX,
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsBoxes,
  BsBuilding,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import "./stock.css";

const initialStock = [
  {
    id: 1,
    assetTag: "AST-1001",
    asset: "Dell Latitude 5420",
    category: "Laptop",
    department: "ICT",
    serialNumber: "DL5420-001",
    quantity: 1,
    available: 0,
    condition: "Good",
    status: "Issued",
    location: "ICT Office",
    purchaseDate: "2025-02-10",
    notes: "Currently assigned to employee",
  },
  {
    id: 2,
    assetTag: "AST-1002",
    asset: "HP ProBook 450",
    category: "Laptop",
    department: "Finance",
    serialNumber: "HPP450-002",
    quantity: 1,
    available: 1,
    condition: "Good",
    status: "Available",
    location: "Main Store",
    purchaseDate: "2025-03-15",
    notes: "Available for issuing",
  },
  {
    id: 3,
    assetTag: "AST-1003",
    asset: "Samsung Monitor 24",
    category: "Monitor",
    department: "HR",
    serialNumber: "SAM24-003",
    quantity: 2,
    available: 1,
    condition: "Good",
    status: "Partially Available",
    location: "Main Store",
    purchaseDate: "2025-04-20",
    notes: "One monitor currently issued",
  },
  {
    id: 4,
    assetTag: "AST-1004",
    asset: "Lenovo ThinkPad E14",
    category: "Laptop",
    department: "Administration",
    serialNumber: "LNE14-004",
    quantity: 1,
    available: 0,
    condition: "Fair",
    status: "Issued",
    location: "Administration",
    purchaseDate: "2024-11-12",
    notes: "Assigned to administration",
  },
  {
    id: 5,
    assetTag: "AST-1005",
    asset: "Logitech Keyboard",
    category: "Accessories",
    department: "ICT",
    serialNumber: "LOGK-005",
    quantity: 10,
    available: 8,
    condition: "Good",
    status: "Partially Available",
    location: "Main Store",
    purchaseDate: "2025-05-05",
    notes: "Two keyboards issued",
  },
];

function Stock() {
  const [stock, setStock] = useState(initialStock);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingStock, setEditingStock] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  const emptyForm = {
    assetTag: "",
    asset: "",
    category: "",
    department: "",
    serialNumber: "",
    quantity: 1,
    available: 1,
    condition: "Good",
    status: "Available",
    location: "",
    purchaseDate: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredStock = stock.filter((item) => {
    const searchText = `
      ${item.assetTag}
      ${item.asset}
      ${item.category}
      ${item.department}
      ${item.serialNumber}
      ${item.location}
    `.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );
  });

  const totalItems = stock.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const availableItems = stock.reduce(
    (total, item) => total + Number(item.available),
    0
  );

  const issuedItems = totalItems - availableItems;

  const lowStockItems = stock.filter(
    (item) =>
      Number(item.available) > 0 &&
      Number(item.available) <= 2
  ).length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const openAddModal = () => {
    setEditingStock(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingStock(item);

    setForm({
      assetTag: item.assetTag,
      asset: item.asset,
      category: item.category,
      department: item.department,
      serialNumber: item.serialNumber,
      quantity: item.quantity,
      available: item.available,
      condition: item.condition,
      status: item.status,
      location: item.location,
      purchaseDate: item.purchaseDate,
      notes: item.notes,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.assetTag ||
      !form.asset ||
      !form.category ||
      !form.quantity ||
      !form.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const quantity = Number(form.quantity);
    const available = Number(form.available);

    let calculatedStatus = "Available";

    if (available === 0) {
      calculatedStatus = "Issued";
    } else if (available < quantity) {
      calculatedStatus = "Partially Available";
    }

    if (editingStock) {
      setStock(
        stock.map((item) =>
          item.id === editingStock.id
            ? {
                ...item,
                ...form,
                quantity,
                available,
                status: calculatedStatus,
              }
            : item
        )
      );
    } else {
      const newStock = {
        id: Date.now(),
        ...form,
        quantity,
        available,
        status: calculatedStatus,
      };

      setStock([newStock, ...stock]);
    }

    setShowModal(false);
    setEditingStock(null);
    setForm(emptyForm);
  };

  const openViewModal = (item) => {
    setSelectedStock(item);
    setShowViewModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedStock(item);
    setShowDeleteModal(true);
  };

  const deleteStock = () => {
    setStock(
      stock.filter(
        (item) => item.id !== selectedStock.id
      )
    );

    setShowDeleteModal(false);
    setSelectedStock(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  const refreshStock = () => {
    setStock([...stock]);
  };

  const exportCSV = () => {
    const headers = [
      "Asset Tag",
      "Equipment",
      "Category",
      "Department",
      "Serial Number",
      "Quantity",
      "Available",
      "Condition",
      "Status",
      "Location",
      "Purchase Date",
      "Notes",
    ];

    const rows = filteredStock.map((item) => [
      item.assetTag,
      item.asset,
      item.category,
      item.department,
      item.serialNumber,
      item.quantity,
      item.available,
      item.condition,
      item.status,
      item.location,
      item.purchaseDate,
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
    link.download = "equipment-stock.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const printStock = () => {
    window.print();
  };

  return (
    <div className="stock-page">

      {/* HEADER */}
      <div className="stock-header">

        <div>
          <h2>
            <BsBoxes />
            Equipment Stock
          </h2>

          <p>
            Manage equipment inventory and stock availability
          </p>
        </div>

        <button
          className="stock-primary-btn"
          onClick={openAddModal}
        >
          <BsPlus />
          Add Stock
        </button>

      </div>

      {/* SUMMARY */}
      <div className="stock-summary">

        <div className="stock-summary-card">
          <div className="stock-summary-icon blue">
            <BsBoxes />
          </div>

          <div>
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Available</span>
            <strong>{availableItems}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon purple">
            <BsBoxSeam />
          </div>

          <div>
            <span>Issued</span>
            <strong>{issuedItems}</strong>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon orange">
            <BsExclamationTriangleFill />
          </div>

          <div>
            <span>Low Stock</span>
            <strong>{lowStockItems}</strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="stock-toolbar">

        <div className="stock-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search asset, category, serial number..."
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
          <option value="Available">Available</option>
          <option value="Partially Available">
            Partially Available
          </option>
          <option value="Issued">Issued</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Monitor">Monitor</option>
          <option value="Accessories">
            Accessories
          </option>
          <option value="Printer">Printer</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="stock-tool-btn"
          onClick={refreshStock}
        >
          <BsArrowClockwise />
        </button>

        <button
          className="stock-tool-btn"
          onClick={clearFilters}
        >
          <BsX />
          Clear
        </button>

        <button
          className="stock-tool-btn"
          onClick={exportCSV}
        >
          <BsDownload />
          Export
        </button>

        <button
          className="stock-tool-btn"
          onClick={printStock}
        >
          <BsPrinter />
          Print
        </button>

      </div>

      {/* TABLE */}
      <div className="stock-table-container">

        <table className="stock-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Asset Tag</th>
              <th>Equipment</th>
              <th>Category</th>
              <th>Department</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredStock.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className="stock-empty"
                >
                  <BsBoxes />
                  <p>No stock records found</p>
                </td>
              </tr>
            ) : (
              filteredStock.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong className="stock-asset-tag">
                      {item.assetTag}
                    </strong>
                  </td>

                  <td>
                    <div className="stock-equipment">

                      <div className="stock-equipment-icon">
                        <BsBoxSeam />
                      </div>

                      <div>
                        <strong>
                          {item.asset}
                        </strong>

                        <small>
                          {item.serialNumber}
                        </small>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="stock-category">
                      {item.category}
                    </span>
                  </td>

                  <td>
                    <span className="stock-department">
                      <BsBuilding />
                      {item.department}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {item.quantity}
                    </strong>
                  </td>

                  <td>
                    <strong
                      className={
                        Number(item.available) === 0
                          ? "stock-zero"
                          : "stock-available-number"
                      }
                    >
                      {item.available}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`stock-condition ${item.condition.toLowerCase()}`}
                    >
                      {item.condition}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`stock-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.location}
                  </td>

                  <td>

                    <div className="stock-actions">

                      <button
                        className="stock-view"
                        onClick={() =>
                          openViewModal(item)
                        }
                        title="View"
                      >
                        <BsEye />
                      </button>

                      <button
                        className="stock-edit"
                        onClick={() =>
                          openEditModal(item)
                        }
                        title="Edit"
                      >
                        <BsPencilSquare />
                      </button>

                      <button
                        className="stock-delete"
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
      <div className="mobile-stock-list">

        {filteredStock.map((item) => (
          <div
            className="mobile-stock-card"
            key={item.id}
          >

            <div className="mobile-stock-top">

              <div>
                <strong>
                  {item.assetTag}
                </strong>

                <small>
                  {item.category}
                </small>
              </div>

              <span
                className={`stock-status ${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>

            </div>

            <h4>{item.asset}</h4>

            <div className="mobile-stock-info">

              <span>
                <BsBuilding />
                {item.department}
              </span>

              <span>
                <BsBoxes />
                Quantity: {item.quantity}
              </span>

              <span>
                <BsCheckCircleFill />
                Available: {item.available}
              </span>

              <span>
                <BsBoxSeam />
                {item.location}
              </span>

            </div>

            <div className="mobile-stock-actions">

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
      <div className="stock-pagination">

        <span>
          Showing {filteredStock.length} of{" "}
          {stock.length} records
        </span>

        <div>

          <button>
            <BsChevronLeft />
          </button>

          <button className="stock-active-page">
            1
          </button>

          <button>
            <BsChevronRight />
          </button>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="stock-modal-overlay">

          <div className="stock-modal">

            <div className="stock-modal-header">

              <div>
                <h3>
                  {editingStock
                    ? "Edit Stock"
                    : "Add Stock"}
                </h3>

                <p>
                  {editingStock
                    ? "Update equipment stock information"
                    : "Add equipment to stock"}
                </p>
              </div>

              <button
                className="stock-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <BsX />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="stock-form-grid">

                <div className="stock-form-group">
                  <label>
                    Asset Tag <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="assetTag"
                    placeholder="e.g. AST-1006"
                    value={form.assetTag}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group">
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

                <div className="stock-form-group">
                  <label>
                    Category <span>*</span>
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Laptop">
                      Laptop
                    </option>

                    <option value="Monitor">
                      Monitor
                    </option>

                    <option value="Accessories">
                      Accessories
                    </option>

                    <option value="Printer">
                      Printer
                    </option>

                    <option value="Furniture">
                      Furniture
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="stock-form-group">
                  <label>
                    Department
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

                <div className="stock-form-group">
                  <label>
                    Serial Number
                  </label>

                  <input
                    type="text"
                    name="serialNumber"
                    placeholder="Serial number"
                    value={form.serialNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group">
                  <label>
                    Quantity <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group">
                  <label>
                    Available Quantity
                  </label>

                  <input
                    type="number"
                    name="available"
                    min="0"
                    max={form.quantity}
                    value={form.available}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group">
                  <label>
                    Condition
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

                <div className="stock-form-group">
                  <label>
                    Location <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Main Store"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group">
                  <label>
                    Purchase Date
                  </label>

                  <input
                    type="date"
                    name="purchaseDate"
                    value={form.purchaseDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="stock-form-group full-width">
                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Enter additional stock information..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="stock-modal-footer">

                <button
                  type="button"
                  className="stock-cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="stock-save-btn"
                >
                  <BsCheckCircleFill />

                  {editingStock
                    ? "Update Stock"
                    : "Add Stock"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedStock && (
        <div className="stock-modal-overlay">

          <div className="stock-modal stock-view-modal">

            <div className="stock-modal-header">

              <div>
                <h3>
                  Stock Details
                </h3>

                <p>
                  {selectedStock.assetTag}
                </p>
              </div>

              <button
                className="stock-modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                <BsX />
              </button>

            </div>

            <div className="stock-details">

              <div className="stock-detail-box">
                <span>Asset Tag</span>
                <strong>
                  {selectedStock.assetTag}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Equipment</span>
                <strong>
                  {selectedStock.asset}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Category</span>
                <strong>
                  {selectedStock.category}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Department</span>
                <strong>
                  {selectedStock.department || "-"}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Serial Number</span>
                <strong>
                  {selectedStock.serialNumber || "-"}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Quantity</span>
                <strong>
                  {selectedStock.quantity}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Available</span>
                <strong>
                  {selectedStock.available}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Condition</span>
                <strong>
                  {selectedStock.condition}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Status</span>
                <strong>
                  {selectedStock.status}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Location</span>
                <strong>
                  {selectedStock.location}
                </strong>
              </div>

              <div className="stock-detail-box">
                <span>Purchase Date</span>
                <strong>
                  {selectedStock.purchaseDate || "-"}
                </strong>
              </div>

              <div className="stock-detail-box full-stock-detail">
                <span>Notes</span>
                <strong>
                  {selectedStock.notes || "No notes"}
                </strong>
              </div>

            </div>

            <div className="stock-modal-footer">

              <button
                className="stock-cancel-btn"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                Close
              </button>

              <button
                className="stock-save-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedStock);
                }}
              >
                <BsPencilSquare />
                Edit Stock
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedStock && (
        <div className="stock-modal-overlay">

          <div className="stock-delete-modal">

            <div className="stock-delete-icon">
              <BsTrash />
            </div>

            <h3>
              Delete Stock Record?
            </h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {selectedStock.assetTag}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="stock-delete-actions">

              <button
                className="stock-cancel-btn"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="stock-confirm-delete"
                onClick={deleteStock}
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

export default Stock;