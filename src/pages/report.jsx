// import React from 'react'
import './report.css'
import {BsBarChart,BsBoxSeam,BsCheckCircle,BsExclamationTriangle,BsSearch,BsDownload,BsPrinter,BsCalendar3,BsFileEarmarkText,
BsArrowLeftRight,BsThreeDotsVertical,} from "react-icons/bs";

const report = () => {
  return (
    <div className="report-page">

      {/* Header */}
      <div className="report-header">
        <div className="report-title-wrapper">
          <div className="report-title-icon">
            <BsBarChart />
          </div>
          <div>
            <h2>Reports</h2>
            <p>
              View reports and track equipment, stock and asset movements.
            </p>
          </div>
        </div>

        <div className="report-header-actions">
          <button className="report-print-btn">
            <BsPrinter />
            Print
          </button>

          <button className="report-export-btn">
            <BsDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="report-summary">

        <div className="report-stat-card">
          <div className="report-stat-icon">
            <BsBoxSeam />
          </div>

          <div>
            <span>Total Assets</span>
            <strong>348</strong>
            <small>All registered assets</small>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">
            <BsCheckCircle />
          </div>

          <div>
            <span>Assigned Assets</span>
            <strong>214</strong>
            <small>Currently assigned</small>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">
            <BsBoxSeam />
          </div>

          <div>
            <span>Available Stock</span>
            <strong>96</strong>
            <small>Ready for issue</small>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon warning-icon">
            <BsExclamationTriangle />
          </div>

          <div>
            <span>Damaged / Lost</span>
            <strong>38</strong>
            <small>Requires attention</small>
          </div>
        </div>

      </div>

      {/* Report Filters */}
      <div className="report-filter-card">

        <div className="filter-heading">
          <div className="filter-heading-icon">
            <BsFileEarmarkText />
          </div>

          <div>
            <h3>Generate Report</h3>
            <p>Select the report type and date range.</p>
          </div>
        </div>

        <div className="report-filters">

          <div className="filter-group">
            <label>Report Type</label>

            <select>
              <option>Equipment Movement</option>
              <option>Stock Report</option>
              <option>Assigned Assets</option>
              <option>Damaged / Lost Assets</option>
              <option>Department Report</option>
              <option>Employee Asset Report</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Start Date</label>

            <div className="date-input">
              <BsCalendar3 />
              <input type="date" />
            </div>
          </div>

          <div className="filter-group">
            <label>End Date</label>

            <div className="date-input">
              <BsCalendar3 />

              <input type="date"/>
            </div>
          </div>

          <button className="generate-btn">
            <BsBarChart />
            Generate
          </button>

        </div>
      </div>

      {/* Report Table */}
      <div className="report-table-card">

        <div className="report-table-header">

          <div className="report-table-heading">
            <div className="movement-icon">
              <BsArrowLeftRight />
            </div>
            <div>
              <h3></h3>
              <p>Recent equipment and asset movements.</p>
            </div>
          </div>

          <div className="report-search">
            <BsSearch />
            <input type="text" placeholder="Search report..."/>
          </div>
        </div>
        <div className="report-table-wrapper">
          <table className="report-table">
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
              <tr>
                <td>01</td>
                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>
                    <div>
                      <strong>Dell Latitude 5520</strong>
                      <small>Laptop</small>
                    </div>
                  </div>
                </td>
                <td>AST-00124</td>
                <td>John Smith</td>
                <td>Information Technology</td>
                <td>
                  <span className="movement issue">
                    Issued
                  </span>
                </td>
                <td>07 Sep 2026</td>
                <td>
                  <span className="report-status completed">
                    Completed
                  </span>
                </td>
                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>
                    <div>
                      <strong>HP LaserJet Pro</strong>
                      <small>Printer</small>
                    </div>
                  </div>
                </td>
                <td>AST-00119</td>
                <td>Sarah Johnson</td>
                <td>Human Resources</td>
                <td>
                  <span className="movement transfer">
                    Transferred
                  </span>
                </td>

                <td>06 Sep 2026</td>

                <td>
                  <span className="report-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>

              <tr>
                <td>03</td>

                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>

                    <div>
                      <strong>Lenovo ThinkPad E14</strong>
                      <small>Laptop</small>
                    </div>
                  </div>
                </td>

                <td>AST-00116</td>
                <td>Michael Brown</td>
                <td>Finance</td>

                <td>
                  <span className="movement return">
                    Returned
                  </span>
                </td>

                <td>05 Sep 2026</td>

                <td>
                  <span className="report-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>

              <tr>
                <td>04</td>

                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>

                    <div>
                      <strong>Samsung Monitor 24"</strong>
                      <small>Monitor</small>
                    </div>
                  </div>
                </td>

                <td>AST-00108</td>
                <td>David Wilson</td>
                <td>Operations</td>

                <td>
                  <span className="movement issue">
                    Issued
                  </span>
                </td>

                <td>04 Sep 2026</td>

                <td>
                  <span className="report-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>

              <tr>
                <td>05</td>

                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>

                    <div>
                      <strong>Logitech Keyboard</strong>
                      <small>Keyboard</small>
                    </div>
                  </div>
                </td>

                <td>AST-00102</td>
                <td>Emily Davis</td>
                <td>Marketing</td>

                <td>
                  <span className="movement damaged">
                    Damaged
                  </span>
                </td>

                <td>03 Sep 2026</td>

                <td>
                  <span className="report-status pending">
                    Pending
                  </span>
                </td>

                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>

              <tr>
                <td>06</td>

                <td>
                  <div className="asset-info">
                    <div className="asset-icon">
                      <BsBoxSeam />
                    </div>

                    <div>
                      <strong>Canon ImageRunner</strong>
                      <small>Photocopier</small>
                    </div>
                  </div>
                </td>

                <td>AST-00098</td>
                <td>Robert Taylor</td>
                <td>Administration</td>

                <td>
                  <span className="movement transfer">
                    Transferred
                  </span>
                </td>

                <td>02 Sep 2026</td>

                <td>
                  <span className="report-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="table-more-btn">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="report-pagination">

          <span>
            Showing 1 to 6 of 48 records
          </span>

          <div className="pagination-buttons">
            <button>Previous</button>
            <button className="active-page">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>Next</button>
          </div>

        </div>

      </div>

    </div>



    
  )
}

export default report
