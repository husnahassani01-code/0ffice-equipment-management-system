// import React from "react";
import {BsBoxSeam,BsCheckCircle,BsBoxes,BsExclamationTriangle,BsArrowRepeat,BsGraphUpArrow,
BsArrowRight,BsLaptop,BsBuilding,BsArrowLeftRight,} from "react-icons/bs";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div>
        <h2>Dashbord</h2>
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <h3>Good afternoon, Admin!</h3>
          <p>
            Here's an overview of your office equipment and recent activities.
          </p>
        </div>
        <div className="welcome-graphic">
          <BsGraphUpArrow />
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <BsBoxSeam />
          </div>
          <div className="stat-info">
            <p>Total Assets</p>
            <h2>348</h2>
            <span className="positive">
              ↑ 12%
            </span>
            <small>All registered assets</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <BsCheckCircle />
          </div>
          <div className="stat-info">
            <p>Assigned Assets</p>
            <h2>214</h2>
            <span className="positive">
              ↑ 8%
            </span>
            <small>Currently held by employees</small>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon purple">
            <BsBoxes />
          </div>

          <div className="stat-info">
            <p>Available Stock</p>
            <h2>96</h2>

            <span className="positive">
              ↑ 5%
            </span>

            <small>Items available for issue</small>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon red">
            <BsExclamationTriangle />
          </div>

          <div className="stat-info">
            <p>Damaged / Lost</p>
            <h2>38</h2>

            <span className="negative">
              ↑ 3%
            </span>

            <small>Requires attention</small>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon cyan">
            <BsArrowRepeat />
          </div>

          <div className="stat-info">
            <p>Total Returns</p>
            <h2>120</h2>

            <span className="positive">
              ↑ 10%
            </span>

            <small>Returned equipment</small>
          </div>

        </div>

      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-main-grid">

        {/* Asset Movement */}
        <div className="dashboard-card movement-card">

          <div className="card-header">

            <div>
              <h3>Asset Movement Overview</h3>
              <p>Monthly equipment movements</p>
            </div>

            <select>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>

          </div>

          <div className="chart-area">

            <div className="chart-y-axis">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            <div className="chart">

              <div className="chart-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <svg
                className="line-chart"
                viewBox="0 0 600 230"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,170 100,145 200,100 300,130 400,95 500,70 600,45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <polyline
                  points="0,190 100,165 200,145 300,160 400,140 500,115 600,90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="return-line"
                />

                <polyline
                  points="0,210 100,195 200,180 300,195 400,175 500,155 600,135"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="transfer-line"
                />
              </svg>

              <div className="chart-months">
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>

            </div>

          </div>

          <div className="chart-legend">

            <span>
              <i className="legend-issued"></i>
              Issued
            </span>

            <span>
              <i className="legend-returned"></i>
              Returned
            </span>

            <span>
              <i className="legend-transferred"></i>
              Transferred
            </span>

          </div>

        </div>

        {/* Assets By Category */}
        <div className="dashboard-card category-card">

          <div className="card-header">

            <div>
              <h3>Assets by Category</h3>
              <p>Distribution of registered assets</p>
            </div>

          </div>

          <div className="category-content">

            <div className="donut-chart">

              <div className="donut-center">
                <strong>348</strong>
                <span>Total</span>
              </div>

            </div>

            <div className="category-list">

              <div className="category-item">
                <span>
                  <i className="category-blue"></i>
                  Laptops
                </span>
                <strong>42%</strong>
              </div>

              <div className="category-item">
                <span>
                  <i className="category-green"></i>
                  Monitors
                </span>
                <strong>18%</strong>
              </div>

              <div className="category-item">
                <span>
                  <i className="category-orange"></i>
                  Printers
                </span>
                <strong>15%</strong>
              </div>

              <div className="category-item">
                <span>
                  <i className="category-purple"></i>
                  Mobile Phones
                </span>
                <strong>12%</strong>
              </div>

              <div className="category-item">
                <span>
                  <i className="category-gray"></i>
                  Others
                </span>
                <strong>13%</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">

        {/* Recent Movements */}
        <div className="dashboard-card recent-card">

          <div className="card-header">

            <div className="card-title-icon">
              <BsArrowLeftRight />

              <div>
                <h3>Recent Asset Movements</h3>
                <p>Latest equipment activity</p>
              </div>
            </div>

            <button className="view-all">
              View All
              <BsArrowRight />
            </button>

          </div>

          <div className="recent-table-wrapper">

            <table className="recent-table">

              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Movement</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Dell Latitude 5520</td>
                  <td>John Smith</td>
                  <td>IT</td>
                  <td>
                    <span className="badge issued">
                      Issued
                    </span>
                  </td>
                  <td>07 Sep 2026</td>
                  <td>
                    <span className="badge completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>HP LaserJet Pro</td>
                  <td>Sarah Johnson</td>
                  <td>HR</td>
                  <td>
                    <span className="badge transferred">
                      Transferred
                    </span>
                  </td>
                  <td>06 Sep 2026</td>
                  <td>
                    <span className="badge completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Lenovo ThinkPad E14</td>
                  <td>Michael Brown</td>
                  <td>Finance</td>
                  <td>
                    <span className="badge returned">
                      Returned
                    </span>
                  </td>
                  <td>05 Sep 2026</td>
                  <td>
                    <span className="badge completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Samsung Monitor 24"</td>
                  <td>David Wilson</td>
                  <td>Operations</td>
                  <td>
                    <span className="badge issued">
                      Issued
                    </span>
                  </td>
                  <td>04 Sep 2026</td>
                  <td>
                    <span className="badge completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Logitech Keyboard</td>
                  <td>Emily Davis</td>
                  <td>Marketing</td>
                  <td>
                    <span className="badge damaged">
                      Damaged
                    </span>
                  </td>
                  <td>03 Sep 2026</td>
                  <td>
                    <span className="badge pending">
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Department Overview */}
        <div className="dashboard-card department-card">

          <div className="card-header">

            <div className="card-title-icon">
              <BsBuilding />

              <div>
                <h3>Department Overview</h3>
                <p>Assets assigned by department</p>
              </div>
            </div>

          </div>

          <div className="department-list">

            <div className="department-row">

              <div className="department-name">
                <span>Information Technology</span>
              </div>

              <div className="department-progress">
                <div style={{ width: "90%" }}></div>
              </div>

              <strong>58</strong>

            </div>

            <div className="department-row">

              <div className="department-name">
                <span>Operations</span>
              </div>

              <div className="department-progress">
                <div style={{ width: "72%" }}></div>
              </div>

              <strong>47</strong>

            </div>

            <div className="department-row">

              <div className="department-name">
                <span>Finance</span>
              </div>

              <div className="department-progress">
                <div style={{ width: "55%" }}></div>
              </div>

              <strong>31</strong>

            </div>

            <div className="department-row">

              <div className="department-name">
                <span>Human Resources</span>
              </div>

              <div className="department-progress">
                <div style={{ width: "40%" }}></div>
              </div>

              <strong>22</strong>

            </div>

            <div className="department-row">

              <div className="department-name">
                <span>Marketing</span>
              </div>

              <div className="department-progress">
                <div style={{ width: "33%" }}></div>
              </div>

              <strong>19</strong>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="dashboard-last-grid">

        {/* Activity */}
        <div className="dashboard-card activity-card">

          <div className="card-header">

            <div>
              <h3>Recent Activity</h3>
              <p>Latest system activity</p>
            </div>

            <button className="view-all">
              View All
              <BsArrowRight />
            </button>

          </div>

          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-icon blue">
                <BsLaptop />
              </div>

              <div>
                <strong>Dell Latitude 5520 issued</strong>
                <span>
                  John Smith · IT Department
                </span>
              </div>

              <small>Today</small>

            </div>

            <div className="activity-item">

              <div className="activity-icon purple">
                <BsArrowLeftRight />
              </div>

              <div>
                <strong>HP LaserJet Pro transferred</strong>
                <span>
                  Sarah Johnson · HR Department
                </span>
              </div>

              <small>Yesterday</small>

            </div>

            <div className="activity-item">

              <div className="activity-icon green">
                <BsArrowRepeat />
              </div>

              <div>
                <strong>Lenovo ThinkPad E14 returned</strong>
                <span>
                  Michael Brown · Finance
                </span>
              </div>

              <small>2 days ago</small>

            </div>

            <div className="activity-item">

              <div className="activity-icon red">
                <BsExclamationTriangle />
              </div>

              <div>
                <strong>Keyboard reported damaged</strong>
                <span>
                  Emily Davis · Marketing
                </span>
              </div>

              <small>3 days ago</small>

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-card">

          <div className="card-header">

            <div>
              <h3>Quick Actions</h3>
              <p>Frequently used operations</p>
            </div>

          </div>

          <div className="quick-actions">

            <button>
              <div className="quick-icon blue">
                <BsBoxSeam />
              </div>

              <span>
                <strong>Register Asset</strong>
                Add new equipment
              </span>

              <BsArrowRight />
            </button>

            <button>
              <div className="quick-icon purple">
                <BsBoxes />
              </div>

              <span>
                <strong>Issue Asset</strong>
                Assign equipment
              </span>

              <BsArrowRight />
            </button>

            <button>
              <div className="quick-icon green">
                <BsArrowRepeat />
              </div>

              <span>
                <strong>Return Asset</strong>
                Record a return
              </span>

              <BsArrowRight />
            </button>

            <button>
              <div className="quick-icon red">
                <BsExclamationTriangle />
              </div>

              <span>
                <strong>Report Damage</strong>
                Record damaged item
              </span>

              <BsArrowRight />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;