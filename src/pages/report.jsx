
import React, { useMemo, useState } from "react";
import {
  BsBarChart,
  BsBox,
  BsCheckCircle,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsDownload,
  BsFileBarGraph,
  BsFileEarmarkArrowDown,
  BsFileEarmarkPdf,
  BsFileText,
  BsFilter,
  BsPrinter,
  BsSearch,
  BsThreeDotsVertical,
  BsX,
  BsArrowLeftRight,
  BsExclamationTriangle,
  BsCalendar3,
  BsCheck2,
  BsEye,
} from "react-icons/bs";

import "./report.css";

const Report = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [reportType, setReportType] = useState("Equipment Movement");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [search, setSearch] = useState("");

  const [showGenerateForm, setShowGenerateForm] = useState(false);

  const [showExportMenu, setShowExportMenu] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [selectedMovement, setSelectedMovement] = useState("All");

  const [selectedRow, setSelectedRow] = useState(null);

  const [showRowMenu, setShowRowMenu] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [generatedReport, setGeneratedReport] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // =========================================================
  // REPORT DATA
  // =========================================================

  const reportData = [
    {
      id: 1,
      asset: "Dell Latitude 5520",
      category: "Laptop",
      tag: "AST-00124",
      employee: "John Smith",
      department: "Information Technology",
      movement: "Issued",
      date: "07 Sep 2026",
      status: "Completed",
    },
    {
      id: 2,
      asset: "HP LaserJet Pro",
      category: "Printer",
      tag: "AST-00119",
      employee: "Sarah Johnson",
      department: "Human Resources",
      movement: "Transferred",
      date: "06 Sep 2026",
      status: "Completed",
    },
    {
      id: 3,
      asset: "Lenovo ThinkPad E14",
      category: "Laptop",
      tag: "AST-00116",
      employee: "Michael Brown",
      department: "Finance",
      movement: "Returned",
      date: "05 Sep 2026",
      status: "Completed",
    },
    {
      id: 4,
      asset: 'Samsung Monitor 24"',
      category: "Monitor",
      tag: "AST-00108",
      employee: "David Wilson",
      department: "Operations",
      movement: "Issued",
      date: "04 Sep 2026",
      status: "Completed",
    },
    {
      id: 5,
      asset: "Canon ImageRunner",
      category: "Printer",
      tag: "AST-00097",
      employee: "Emily Davis",
      department: "Administration",
      movement: "Returned",
      date: "03 Sep 2026",
      status: "Completed",
    },
    {
      id: 6,
      asset: "Dell OptiPlex 7090",
      category: "Desktop",
      tag: "AST-00091",
      employee: "Robert Taylor",
      department: "Finance",
      movement: "Issued",
      date: "02 Sep 2026",
      status: "Completed",
    },
    {
      id: 7,
      asset: "HP EliteBook 840",
      category: "Laptop",
      tag: "AST-00086",
      employee: "Jessica Moore",
      department: "Information Technology",
      movement: "Transferred",
      date: "01 Sep 2026",
      status: "Pending",
    },
    {
      id: 8,
      asset: "Epson Projector",
      category: "Projector",
      tag: "AST-00081",
      employee: "Daniel Anderson",
      department: "Marketing",
      movement: "Issued",
      date: "30 Aug 2026",
      status: "Completed",
    },
    {
      id: 9,
      asset: "Lenovo ThinkCentre",
      category: "Desktop",
      tag: "AST-00074",
      employee: "Olivia Thomas",
      department: "Operations",
      movement: "Returned",
      date: "29 Aug 2026",
      status: "Completed",
    },
    {
      id: 10,
      asset: "Acer Aspire 5",
      category: "Laptop",
      tag: "AST-00069",
      employee: "James Jackson",
      department: "Sales",
      movement: "Issued",
      date: "28 Aug 2026",
      status: "Pending",
    },
    {
      id: 11,
      asset: "Dell Monitor 27",
      category: "Monitor",
      tag: "AST-00063",
      employee: "Sophia White",
      department: "Human Resources",
      movement: "Transferred",
      date: "27 Aug 2026",
      status: "Completed",
    },
    {
      id: 12,
      asset: "HP ProDesk 600",
      category: "Desktop",
      tag: "AST-00057",
      employee: "William Harris",
      department: "Information Technology",
      movement: "Issued",
      date: "26 Aug 2026",
      status: "Completed",
    },
  ];

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = [
    {
      title: "Total Assets",
      value: "348",
      description: "All registered assets",
      icon: <BsBox />,
      className: "blue",
    },
    {
      title: "Assigned Assets",
      value: "214",
      description: "Currently assigned",
      icon: <BsCheckCircle />,
      className: "green",
    },
    {
      title: "Available Stock",
      value: "96",
      description: "Ready for issue",
      icon: <BsBox />,
      className: "purple",
    },
    {
      title: "Damaged / Lost",
      value: "38",
      description: "Requires attention",
      icon: <BsExclamationTriangle />,
      className: "orange",
    },
  ];

  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = useMemo(() => {
    return reportData.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.asset.toLowerCase().includes(searchValue) ||
        item.tag.toLowerCase().includes(searchValue) ||
        item.employee.toLowerCase().includes(searchValue) ||
        item.department.toLowerCase().includes(searchValue) ||
        item.movement.toLowerCase().includes(searchValue);

      const matchesStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

      const matchesMovement =
        selectedMovement === "All" ||
        item.movement === selectedMovement;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMovement
      );
    });
  }, [
    search,
    selectedStatus,
    selectedMovement,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================================================
  // GENERATE REPORT
  // =========================================================

  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start date and end date.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    const report = {
      type: reportType,
      startDate,
      endDate,
      generatedAt: new Date().toLocaleString(),
      totalRecords: filteredData.length,
    };

    setGeneratedReport(report);
    setShowGenerateForm(false);

    alert(
      `${reportType} report generated successfully.`
    );
  };

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {
    window.print();
  };

  // =========================================================
  // CSV EXPORT
  // =========================================================

  const handleExportCSV = () => {
    const headers = [
      "Asset",
      "Category",
      "Asset Tag",
      "Employee",
      "Department",
      "Movement",
      "Date",
      "Status",
    ];

    const rows = filteredData.map((item) => [
      item.asset,
      item.category,
      item.tag,
      item.employee,
      item.department,
      item.movement,
      item.date,
      item.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "equipment-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setShowExportMenu(false);
  };

  // =========================================================
  // EXPORT JSON
  // =========================================================

  const handleExportJSON = () => {
    const json = JSON.stringify(
      filteredData,
      null,
      2
    );

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "equipment-report.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setShowExportMenu(false);
  };

  // =========================================================
  // ROW DETAILS
  // =========================================================

  const handleViewDetails = (item) => {
    setSelectedRow(item);
    setShowDetails(true);
    setShowRowMenu(null);
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setSelectedStatus("All");
    setSelectedMovement("All");
    setSearch("");
    setCurrentPage(1);
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "status completed";
    }

    if (status === "Pending") {
      return "status pending";
    }

    return "status";
  };

  // =========================================================
  // MOVEMENT CLASS
  // =========================================================

  const getMovementClass = (movement) => {
    if (movement === "Issued") {
      return "movement issued";
    }

    if (movement === "Returned") {
      return "movement returned";
    }

    if (movement === "Transferred") {
      return "movement transferred";
    }

    return "movement";
  };

  return (
    <div className="report-page">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="report-header">

        <div className="report-title-section">

          <div className="report-title-icon">
            <BsBarChart />
          </div>

          <div>
            <h1>Reports</h1>

            <p>
              View reports and track equipment, stock
              and asset movements.
            </p>
          </div>

        </div>

        <div className="report-header-actions">

          <button
            className="secondary-button"
            onClick={handlePrint}
          >
            <BsPrinter />
            Print
          </button>

          <div className="export-wrapper">

            <button
              className="primary-button"
              onClick={() =>
                setShowExportMenu(!showExportMenu)
              }
            >
              <BsDownload />
              Export Report
              <BsChevronDown />
            </button>

            {showExportMenu && (
              <div className="export-menu">

                <button onClick={handleExportCSV}>
                  <BsFileText />
                  Export CSV
                </button>

                <button onClick={handleExportJSON}>
                  <BsFileEarmarkArrowDown />
                  Export JSON
                </button>

                <button onClick={handlePrint}>
                  <BsFileEarmarkPdf />
                  Print / PDF
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="statistics-grid">

        {statistics.map((stat) => (
          <div
            className="stat-card"
            key={stat.title}
          >

            <div
              className={`stat-icon ${stat.className}`}
            >
              {stat.icon}
            </div>

            <div className="stat-content">

              <span className="stat-title">
                {stat.title}
              </span>

              <strong>{stat.value}</strong>

              <small>
                {stat.description}
              </small>

            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          GENERATE REPORT SECTION
      ====================================================== */}

      <div className="generate-card">

        <div className="section-heading">

          <div className="section-icon">
            <BsFileBarGraph />
          </div>

          <div>
            <h2>Generate Report</h2>

            <p>
              Select the report type and date range.
            </p>
          </div>

        </div>

        {!showGenerateForm ? (

          <div className="generate-preview">

            <div className="selected-report">

              <span>Current Report</span>

              <strong>
                {generatedReport
                  ? generatedReport.type
                  : "Equipment Movement"}
              </strong>

              {generatedReport && (
                <small>
                  {generatedReport.startDate} —{" "}
                  {generatedReport.endDate}
                </small>
              )}

            </div>

            <button
              className="primary-button generate-button"
              onClick={() =>
                setShowGenerateForm(true)
              }
            >
              <BsBarChart />
              Generate
            </button>

          </div>

        ) : (

          <form
            className="generate-form"
            onSubmit={handleGenerateReport}
          >

            <div className="form-group">

              <label>
                Report Type
              </label>

              <div className="select-wrapper">

                <select
                  value={reportType}
                  onChange={(e) =>
                    setReportType(e.target.value)
                  }
                >
                  <option>
                    Equipment Movement
                  </option>

                  <option>
                    Asset Inventory
                  </option>

                  <option>
                    Stock Report
                  </option>

                  <option>
                    Employee Assets
                  </option>

                  <option>
                    Department Report
                  </option>

                  <option>
                    Damaged / Lost Assets
                  </option>
                </select>

                <BsChevronDown />

              </div>

            </div>

            <div className="form-group">

              <label>
                Start Date
              </label>

              <div className="date-input">

                <BsCalendar3 />

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                End Date
              </label>

              <div className="date-input">

                <BsCalendar3 />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowGenerateForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                <BsCheck2 />
                Generate Report
              </button>

            </div>

          </form>

        )}

      </div>

      {/* =====================================================
          GENERATED REPORT MESSAGE
      ====================================================== */}

      {generatedReport && (
        <div className="generated-report">

          <div className="generated-icon">
            <BsCheckCircle />
          </div>

          <div className="generated-content">

            <strong>
              Report generated successfully
            </strong>

            <span>
              {generatedReport.type} ·{" "}
              {generatedReport.startDate} to{" "}
              {generatedReport.endDate} ·{" "}
              {generatedReport.totalRecords} records
            </span>

          </div>

          <button
            className="close-generated"
            onClick={() =>
              setGeneratedReport(null)
            }
          >
            <BsX />
          </button>

        </div>
      )}

      {/* =====================================================
          REPORT TABLE
      ====================================================== */}

      <div className="movement-card">

        <div className="movement-header">

          <div className="movement-title">

            <div className="section-icon">
              <BsArrowLeftRight />
            </div>

            <div>
              <h2>
                Recent Equipment & Asset Movements
              </h2>

              <p>
                Recent equipment and asset movements.
              </p>
            </div>

          </div>

          <div className="table-actions">

            <div className="search-box">

              <BsSearch />

              <input
                type="text"
                placeholder="Search report..."
                value={search}
                onChange={handleSearch}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="clear-search"
                >
                  <BsX />
                </button>
              )}

            </div>

            <button
              className={`filter-button ${
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

        {/* FILTER PANEL */}

        {showFilter && (
          <div className="filter-panel">

            <div className="filter-group">

              <label>Status</label>

              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>

            </div>

            <div className="filter-group">

              <label>Movement</label>

              <select
                value={selectedMovement}
                onChange={(e) => {
                  setSelectedMovement(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All</option>
                <option>Issued</option>
                <option>Returned</option>
                <option>Transferred</option>
              </select>

            </div>

            <button
              className="reset-filter"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

          </div>
        )}

        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Asset Tag</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Movement</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {currentData.length > 0 ? (

                currentData.map((item, index) => (

                  <tr key={item.id}>

                    <td>
                      {String(
                        startIndex + index + 1
                      ).padStart(2, "0")}
                    </td>

                    <td>

                      <div className="asset-cell">

                        <div className="asset-icon">
                          <BsBox />
                        </div>

                        <div>

                          <strong>
                            {item.asset}
                          </strong>

                          <small>
                            {item.category}
                          </small>

                        </div>

                      </div>

                    </td>

                    <td>
                      <span className="asset-tag">
                        {item.tag}
                      </span>
                    </td>

                    <td>
                      {item.employee}
                    </td>

                    <td>
                      {item.department}
                    </td>

                    <td>
                      <span
                        className={getMovementClass(
                          item.movement
                        )}
                      >
                        {item.movement}
                      </span>
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          item.status
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <div className="action-wrapper">

                        <button
                          className="action-button"
                          onClick={() =>
                            setShowRowMenu(
                              showRowMenu === item.id
                                ? null
                                : item.id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {showRowMenu === item.id && (

                          <div className="row-menu">

                            <button
                              onClick={() =>
                                handleViewDetails(item)
                              }
                            >
                              <BsEye />
                              View Details
                            </button>

                            <button
                              onClick={() => {
                                setSelectedRow(item);
                                setShowDetails(true);
                                setShowRowMenu(null);
                              }}
                            >
                              <BsDownload />
                              Export Record
                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-state"
                  >

                    <BsSearch />

                    <strong>
                      No reports found
                    </strong>

                    <span>
                      Try changing your search or filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        <div className="pagination">

          <span>
            Showing{" "}
            <strong>
              {filteredData.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + itemsPerPage,
                filteredData.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredData.length}
            </strong>{" "}
            results
          </span>

          <div className="pagination-buttons">

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
              { length: totalPages },
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
          DETAILS MODAL
      ====================================================== */}

      {showDetails && selectedRow && (

        <div
          className="modal-overlay"
          onClick={() => setShowDetails(false)}
        >

          <div
            className="details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>Asset Details</h2>

                <p>
                  Complete information about this movement.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowDetails(false)
                }
              >
                <BsX />
              </button>

            </div>

            <div className="details-icon">
              <BsBox />
            </div>

            <div className="details-grid">

              <div>
                <span>Asset Name</span>
                <strong>
                  {selectedRow.asset}
                </strong>
              </div>

              <div>
                <span>Category</span>
                <strong>
                  {selectedRow.category}
                </strong>
              </div>

              <div>
                <span>Asset Tag</span>
                <strong>
                  {selectedRow.tag}
                </strong>
              </div>

              <div>
                <span>Employee</span>
                <strong>
                  {selectedRow.employee}
                </strong>
              </div>

              <div>
                <span>Department</span>
                <strong>
                  {selectedRow.department}
                </strong>
              </div>

              <div>
                <span>Movement</span>
                <strong>
                  {selectedRow.movement}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {selectedRow.date}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedRow.status}
                </strong>
              </div>

            </div>

            <div className="modal-footer">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowDetails(false)
                }
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  alert(
                    `Exporting ${selectedRow.asset}`
                  );
                }}
              >
                <BsDownload />
                Export Record
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Report;
