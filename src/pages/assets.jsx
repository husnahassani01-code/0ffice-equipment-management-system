import React, { useMemo, useState } from "react";
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
  BsChevronLeft,
  BsChevronRight,
  BsTag,
} from "react-icons/bs";
import "./assets.css";

const initialAssets = [
  {
    id: 1,
    assetTag: "AST-0001",
    assetName: "Dell Latitude 5420",
    category: "Laptop",
    brand: "Dell",
    model: "Latitude 5420",
    serialNumber: "DL5420-001",
    department: "ICT",
    location: "Main Office",
    purchaseDate: "2024-01-15",
    value: 1850000,
    condition: "Good",
    status: "Available",
    assignedTo: "",
    description: "Office laptop for general business operations.",
  },
  {
    id: 2,
    assetTag: "AST-0002",
    assetName: "HP LaserJet Pro",
    category: "Printer",
    brand: "HP",
    model: "M404dn",
    serialNumber: "HPM404-002",
    department: "Finance",
    location: "Finance Office",
    purchaseDate: "2023-08-20",
    value: 950000,
    condition: "Good",
    status: "Issued",
    assignedTo: "John Peter",
    description: "Black and white network printer.",
  },
  {
    id: 3,
    assetTag: "AST-0003",
    assetName: 'Samsung 24" Monitor',
    category: "Monitor",
    brand: "Samsung",
    model: "S24R350",
    serialNumber: "SMS24-003",
    department: "HR",
    location: "HR Office",
    purchaseDate: "2024-03-10",
    value: 480000,
    condition: "Excellent",
    status: "Available",
    assignedTo: "",
    description: "24 inch office display.",
  },
  {
    id: 4,
    assetTag: "AST-0004",
    assetName: "Epson Projector",
    category: "Projector",
    brand: "Epson",
    model: "EB-X06",
    serialNumber: "EPS-X06-004",
    department: "Administration",
    location: "Conference Room",
    purchaseDate: "2022-11-05",
    value: 1200000,
    condition: "Fair",
    status: "Maintenance",
    assignedTo: "",
    description: "Projector used for meetings and presentations.",
  },
  {
    id: 5,
    assetTag: "AST-0005",
    assetName: "Office Desk",
    category: "Furniture",
    brand: "Local",
    model: "Executive Desk",
    serialNumber: "DESK-005",
    department: "Management",
    location: "Director Office",
    purchaseDate: "2023-04-12",
    value: 650000,
    condition: "Good",
    status: "Available",
    assignedTo: "",
    description: "Executive office desk.",
  },
];

const emptyForm = {
  assetTag: "",
  assetName: "",
  category: "Laptop",
  brand: "",
  model: "",
  serialNumber: "",
  department: "ICT",
  location: "",
  purchaseDate: "",
  value: "",
  condition: "Good",
  status: "Available",
  assignedTo: "",
  description: "",
};

const categories = [
  "Laptop",
  "Desktop",
  "Printer",
  "Monitor",
  "Projector",
  "Furniture",
  "Network Equipment",
  "Other",
];

const departments = [
  "ICT",
  "Finance",
  "HR",
  "Administration",
  "Management",
  "Procurement",
];

function Assets() {
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredAssets = useMemo(() => {
    const term = search.toLowerCase().trim();

    return assets.filter((asset) => {
      const matchesSearch =
        !term ||
        asset.assetTag.toLowerCase().includes(term) ||
        asset.assetName.toLowerCase().includes(term) ||
        asset.brand.toLowerCase().includes(term) ||
        asset.model.toLowerCase().includes(term) ||
        asset.serialNumber.toLowerCase().includes(term) ||
        asset.department.toLowerCase().includes(term) ||
        asset.assignedTo.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || asset.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || asset.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [assets, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAssets.length / itemsPerPage)
  );

  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAssets = assets.length;
  const availableAssets = assets.filter(
    (asset) => asset.status === "Available"
  ).length;
  const issuedAssets = assets.filter(
    (asset) => asset.status === "Issued"
  ).length;
  const maintenanceAssets = assets.filter(
    (asset) => asset.status === "Maintenance"
  ).length;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  const openAddModal = () => {
    setEditingAsset(null);
    setForm({
      ...emptyForm,
      assetTag: `AST-${String(assets.length + 1).padStart(4, "0")}`,
    });
    setShowModal(true);
  };

  const openEditModal = (asset) => {
    setEditingAsset(asset);
    setForm({ ...asset });
    setShowModal(true);
  };

  const openViewModal = (asset) => {
    setSelectedAsset(asset);
    setShowViewModal(true);
  };

  const openDeleteModal = (asset) => {
    setSelectedAsset(asset);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.assetTag || !form.assetName || !form.category) {
      alert("Please fill in Asset Tag, Asset Name and Category.");
      return;
    }

    if (editingAsset) {
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === editingAsset.id
            ? {
                ...form,
                id: editingAsset.id,
                value: Number(form.value) || 0,
              }
            : asset
        )
      );
    } else {
      const newAsset = {
        ...form,
        id: Date.now(),
        value: Number(form.value) || 0,
      };

      setAssets((prev) => [newAsset, ...prev]);
    }

    setShowModal(false);
    setEditingAsset(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    if (!selectedAsset) return;

    setAssets((prev) =>
      prev.filter((asset) => asset.id !== selectedAsset.id)
    );

    setShowDeleteModal(false);
    setSelectedAsset(null);
  };

  const handleClear = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setAssets([...assets]);
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const headers = [
      "Asset Tag",
      "Asset Name",
      "Category",
      "Brand",
      "Model",
      "Serial Number",
      "Department",
      "Location",
      "Purchase Date",
      "Value",
      "Condition",
      "Status",
      "Assigned To",
    ];

    const rows = assets.map((asset) => [
      asset.assetTag,
      asset.assetName,
      asset.category,
      asset.brand,
      asset.model,
      asset.serialNumber,
      asset.department,
      asset.location,
      asset.purchaseDate,
      asset.value,
      asset.condition,
      asset.status,
      asset.assignedTo,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "assets.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "assets-status-available";
      case "Issued":
        return "assets-status-issued";
      case "Maintenance":
        return "assets-status-maintenance";
      case "Lost":
        return "assets-status-lost";
      default:
        return "";
    }
  };

  const getConditionClass = (condition) => {
    switch (condition) {
      case "Excellent":
        return "assets-condition-excellent";
      case "Good":
        return "assets-condition-good";
      case "Fair":
        return "assets-condition-fair";
      case "Poor":
        return "assets-condition-poor";
      default:
        return "";
    }
  };

  return (
    <div className="assets-page">
      <div className="assets-header">
        <div>
          <div className="assets-title-wrap">
            <div className="assets-title-icon">
              <BsBoxSeam />
            </div>

            <div>
              <h2>Assets</h2>
              <p>Manage and track all organization assets</p>
            </div>
          </div>
        </div>

        <button className="assets-primary-btn" onClick={openAddModal}>
          <BsPlus />
          Add Asset
        </button>
      </div>

      {/* Summary Cards */}
      <div className="assets-summary-grid">
        <div className="assets-summary-card">
          <div className="assets-summary-icon blue">
            <BsBoxes />
          </div>

          <div>
            <span>Total Assets</span>
            <strong>{totalAssets}</strong>
          </div>
        </div>

        <div className="assets-summary-card">
          <div className="assets-summary-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Available</span>
            <strong>{availableAssets}</strong>
          </div>
        </div>

        <div className="assets-summary-card">
          <div className="assets-summary-icon orange">
            <BsTag />
          </div>

          <div>
            <span>Issued</span>
            <strong>{issuedAssets}</strong>
          </div>
        </div>

        <div className="assets-summary-card">
          <div className="assets-summary-icon red">
            <BsExclamationTriangleFill />
          </div>

          <div>
            <span>Maintenance</span>
            <strong>{maintenanceAssets}</strong>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="assets-toolbar">
        <div className="assets-search-box">
          <BsSearch />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="assets-filter"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="assets-filter"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button className="assets-tool-btn" onClick={handleRefresh}>
          <BsArrowClockwise />
          Refresh
        </button>

        <button className="assets-tool-btn" onClick={handleClear}>
          <BsX />
          Clear
        </button>

        <button className="assets-tool-btn" onClick={exportCSV}>
          <BsDownload />
          Export
        </button>

        <button className="assets-tool-btn" onClick={handlePrint}>
          <BsPrinter />
          Print
        </button>
      </div>

      {/* Desktop Table */}
      <div className="assets-table-card">
        <div className="assets-table-responsive">
          <table className="assets-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Tag</th>
                <th>Asset</th>
                <th>Category</th>
                <th>Department</th>
                <th>Serial Number</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedAssets.length > 0 ? (
                paginatedAssets.map((asset, index) => (
                  <tr key={asset.id}>
                    <td>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td>
                      <span className="assets-tag">
                        {asset.assetTag}
                      </span>
                    </td>

                    <td>
                      <div className="assets-name-cell">
                        <strong>{asset.assetName}</strong>
                        <small>
                          {asset.brand} {asset.model}
                        </small>
                      </div>
                    </td>

                    <td>{asset.category}</td>

                    <td>{asset.department}</td>

                    <td>{asset.serialNumber || "-"}</td>

                    <td>
                      <span
                        className={`assets-condition ${getConditionClass(
                          asset.condition
                        )}`}
                      >
                        {asset.condition}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`assets-status ${getStatusClass(
                          asset.status
                        )}`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    <td>{asset.location || "-"}</td>

                    <td>
                      <div className="assets-actions">
                        <button
                          className="assets-action view"
                          title="View"
                          onClick={() => openViewModal(asset)}
                        >
                          <BsEye />
                        </button>

                        <button
                          className="assets-action edit"
                          title="Edit"
                          onClick={() => openEditModal(asset)}
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          className="assets-action delete"
                          title="Delete"
                          onClick={() => openDeleteModal(asset)}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="assets-empty">
                    <BsBoxSeam />
                    <h4>No assets found</h4>
                    <p>Try changing your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="assets-mobile-list">
          {paginatedAssets.length > 0 ? (
            paginatedAssets.map((asset) => (
              <div className="assets-mobile-card" key={asset.id}>
                <div className="assets-mobile-top">
                  <div>
                    <span className="assets-tag">{asset.assetTag}</span>
                    <h4>{asset.assetName}</h4>
                    <small>
                      {asset.brand} {asset.model}
                    </small>
                  </div>

                  <span
                    className={`assets-status ${getStatusClass(
                      asset.status
                    )}`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="assets-mobile-details">
                  <div>
                    <span>Category</span>
                    <strong>{asset.category}</strong>
                  </div>

                  <div>
                    <span>Department</span>
                    <strong>{asset.department}</strong>
                  </div>

                  <div>
                    <span>Serial Number</span>
                    <strong>{asset.serialNumber || "-"}</strong>
                  </div>

                  <div>
                    <span>Condition</span>
                    <strong>{asset.condition}</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>{asset.location || "-"}</strong>
                  </div>
                </div>

                <div className="assets-mobile-actions">
                  <button onClick={() => openViewModal(asset)}>
                    <BsEye />
                    View
                  </button>

                  <button onClick={() => openEditModal(asset)}>
                    <BsPencilSquare />
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => openDeleteModal(asset)}
                  >
                    <BsTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="assets-empty mobile">
              <BsBoxSeam />
              <h4>No assets found</h4>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="assets-pagination">
          <span>
            Showing{" "}
            {filteredAssets.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredAssets.length
            )}{" "}
            of {filteredAssets.length} assets
          </span>

          <div className="assets-pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <BsChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="assets-modal-overlay">
          <div className="assets-modal assets-form-modal">
            <div className="assets-modal-header">
              <div>
                <h3>{editingAsset ? "Edit Asset" : "Add New Asset"}</h3>
                <p>
                  {editingAsset
                    ? "Update asset information"
                    : "Register a new organization asset"}
                </p>
              </div>

              <button
                className="assets-modal-close"
                onClick={() => setShowModal(false)}
              >
                <BsX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="assets-form-grid">
                <div className="assets-form-group">
                  <label>Asset Tag *</label>
                  <input
                    name="assetTag"
                    value={form.assetTag}
                    onChange={handleInputChange}
                    placeholder="AST-0001"
                    required
                  />
                </div>

                <div className="assets-form-group">
                  <label>Asset Name *</label>
                  <input
                    name="assetName"
                    value={form.assetName}
                    onChange={handleInputChange}
                    placeholder="e.g. Dell Latitude 5420"
                    required
                  />
                </div>

                <div className="assets-form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="assets-form-group">
                  <label>Brand</label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. Dell"
                  />
                </div>

                <div className="assets-form-group">
                  <label>Model</label>
                  <input
                    name="model"
                    value={form.model}
                    onChange={handleInputChange}
                    placeholder="e.g. Latitude 5420"
                  />
                </div>

                <div className="assets-form-group">
                  <label>Serial Number</label>
                  <input
                    name="serialNumber"
                    value={form.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Serial number"
                  />
                </div>

                <div className="assets-form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleInputChange}
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="assets-form-group">
                  <label>Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Main Office"
                  />
                </div>

                <div className="assets-form-group">
                  <label>Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={form.purchaseDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="assets-form-group">
                  <label>Asset Value (TZS)</label>
                  <input
                    type="number"
                    name="value"
                    value={form.value}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="assets-form-group">
                  <label>Condition</label>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleInputChange}
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div className="assets-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Issued">Issued</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div className="assets-form-group">
                  <label>Assigned To</label>
                  <input
                    name="assignedTo"
                    value={form.assignedTo}
                    onChange={handleInputChange}
                    placeholder="Employee name"
                  />
                </div>

                <div className="assets-form-group full">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Enter asset description..."
                    rows="3"
                  />
                </div>
              </div>

              <div className="assets-modal-footer">
                <button
                  type="button"
                  className="assets-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="assets-save-btn">
                  <BsCheckCircleFill />
                  {editingAsset ? "Update Asset" : "Save Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedAsset && (
        <div className="assets-modal-overlay">
          <div className="assets-modal assets-view-modal">
            <div className="assets-modal-header">
              <div>
                <h3>Asset Details</h3>
                <p>Complete information about this asset</p>
              </div>

              <button
                className="assets-modal-close"
                onClick={() => setShowViewModal(false)}
              >
                <BsX />
              </button>
            </div>

            <div className="assets-view-top">
              <div className="assets-view-icon">
                <BsBoxSeam />
              </div>

              <div>
                <span className="assets-tag">
                  {selectedAsset.assetTag}
                </span>
                <h2>{selectedAsset.assetName}</h2>
                <p>
                  {selectedAsset.brand} {selectedAsset.model}
                </p>
              </div>
            </div>

            <div className="assets-details-grid">
              <div>
                <span>Category</span>
                <strong>{selectedAsset.category}</strong>
              </div>

              <div>
                <span>Serial Number</span>
                <strong>{selectedAsset.serialNumber || "-"}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{selectedAsset.department}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{selectedAsset.location || "-"}</strong>
              </div>

              <div>
                <span>Purchase Date</span>
                <strong>{selectedAsset.purchaseDate || "-"}</strong>
              </div>

              <div>
                <span>Asset Value</span>
                <strong>{formatCurrency(selectedAsset.value)}</strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{selectedAsset.condition}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedAsset.status}</strong>
              </div>

              <div>
                <span>Assigned To</span>
                <strong>{selectedAsset.assignedTo || "Not assigned"}</strong>
              </div>

              <div className="full">
                <span>Description</span>
                <strong>
                  {selectedAsset.description || "No description"}
                </strong>
              </div>
            </div>

            <div className="assets-modal-footer">
              <button
                className="assets-cancel-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                className="assets-save-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedAsset);
                }}
              >
                <BsPencilSquare />
                Edit Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedAsset && (
        <div className="assets-modal-overlay">
          <div className="assets-modal assets-delete-modal">
            <div className="assets-delete-icon">
              <BsExclamationTriangleFill />
            </div>

            <h3>Delete Asset?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedAsset.assetName}</strong> (
              {selectedAsset.assetTag})?
            </p>

            <p className="assets-warning-text">
              This action cannot be undone.
            </p>

            <div className="assets-delete-actions">
              <button
                className="assets-cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="assets-delete-confirm"
                onClick={handleDelete}
              >
                <BsTrash />
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;