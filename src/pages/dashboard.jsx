import React, { useState } from "react";
import {
  BsBoxSeam,
  BsPeople,
  BsBuilding,
  BsLaptop,
  BsArrowUpRight,
  BsArrowDownLeft,
  BsExclamationTriangleFill,
  BsCheckCircleFill,
  BsClockHistory,
  BsGraphUpArrow,
  BsGraphDownArrow,
  BsThreeDotsVertical,
  BsCalendar3,
  BsSearch,
  BsChevronRight,
  BsClipboardCheck,
  BsWrenchAdjustableCircle,
  BsPersonCheck,
} from "react-icons/bs";
import "./dashboard.css";

const Dashboard = () => {
  const [period, setPeriod] = useState("This Month");
  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "Total Assets",
      value: "248",
      change: "+12",
      label: "from last month",
      icon: <BsBoxSeam />,
      type: "up",
    },
    {
      title: "Available Assets",
      value: "164",
      change: "+8",
      label: "from last month",
      icon: <BsCheckCircleFill />,
      type: "up",
    },
    {
      title: "Issued Assets",
      value: "72",
      change: "+5",
      label: "from last month",
      icon: <BsLaptop />,
      type: "up",
    },
    {
      title: "Maintenance",
      value: "12",
      change: "-3",
      label: "from last month",
      icon: <BsWrenchAdjustableCircle />,
      type: "down",
    },
  ];

  const departments = [
    { name: "ICT Department", count: 72, percent: 80 },
    { name: "Finance", count: 46, percent: 64 },
    { name: "Human Resources", count: 35, percent: 52 },
    { name: "Administration", count: 29, percent: 42 },
    { name: "Management", count: 21, percent: 32 },
    { name: "Procurement", count: 18, percent: 27 },
  ];

  const activities = [
    {
      icon: <BsArrowUpRight />,
      title: "Laptop issued",
      description: "Asset AST-1024 issued to John Michael",
      time: "10 minutes ago",
      type: "issue",
    },
    {
      icon: <BsArrowDownLeft />,
      title: "Equipment returned",
      description: "Projector AST-0089 returned to store",
      time: "35 minutes ago",
      type: "return",
    },
    {
      icon: <BsExclamationTriangleFill />,
      title: "Damage reported",
      description: "Monitor AST-0132 reported as damaged",
      time: "1 hour ago",
      type: "warning",
    },
    {
      icon: <BsCheckCircleFill />,
      title: "Asset received",
      description: "10 new laptops received from supplier",
      time: "2 hours ago",
      type: "success",
    },
    {
      icon: <BsWrenchAdjustableCircle />,
      title: "Maintenance completed",
      description: "Printer AST-0057 maintenance completed",
      time: "3 hours ago",
      type: "maintenance",
    },
  ];

  const assets = [
    {
      tag: "AST-1024",
      name: "Dell Latitude 5440",
      category: "Laptop",
      department: "ICT",
      serial: "DL5440-98324",
      condition: "Good",
      status: "Issued",
      location: "ICT Office",
    },
    {
      tag: "AST-1023",
      name: "HP ProBook 450",
      category: "Laptop",
      department: "Finance",
      serial: "HP450-78231",
      condition: "Excellent",
      status: "Available",
      location: "Main Store",
    },
    {
      tag: "AST-1022",
      name: "Dell P2422H",
      category: "Monitor",
      department: "HR",
      serial: "DLP2422-4521",
      condition: "Good",
      status: "Issued",
      location: "HR Office",
    },
    {
      tag: "AST-1021",
      name: "Epson EB-X06",
      category: "Projector",
      department: "Admin",
      serial: "EPX06-87212",
      condition: "Good",
      status: "Available",
      location: "Main Store",
    },
    {
      tag: "AST-1020",
      name: "HP LaserJet Pro",
      category: "Printer",
      department: "Finance",
      serial: "HPLJ-65482",
      condition: "Fair",
      status: "Maintenance",
      location: "Finance Office",
    },
  ];

  const filteredAssets = assets.filter((asset) =>
    `${asset.tag} ${asset.name} ${asset.category} ${asset.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const quickActions = [
    {
      title: "Manage Assets",
      description: "View and manage equipment",
      icon: <BsBoxSeam />,
      link: "/assets",
    },
    {
      title: "Issue Equipment",
      description: "Assign equipment to employee",
      icon: <BsArrowUpRight />,
      link: "/issuing",
    },
    {
      title: "Receive Equipment",
      description: "Record returned equipment",
      icon: <BsArrowDownLeft />,
      link: "/receiving",
    },
    {
      title: "Damage / Lost",
      description: "Report damaged or lost item",
      icon: <BsExclamationTriangleFill />,
      link: "/damage-lost",
    },
  ];

  const handleAction = (link) => {
    window.location.href = link;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your equipment and asset management system</p>
          </div>

          <div className="dashboard-controls">
            <div className="date-control">
              <BsCalendar3 />
              <span>September 2026</span>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="period-select"
            >
              <option>This Month</option>
              <option>This Week</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <div className={`stat-icon stat-${index}`}>
                  {stat.icon}
                </div>

                <button className="more-btn">
                  <BsThreeDotsVertical />
                </button>
              </div>

              <div className="stat-title">{stat.title}</div>

              <div className="stat-bottom">
                <strong>{stat.value}</strong>

                <div className={`stat-change ${stat.type}`}>
                  {stat.type === "up" ? (
                    <BsGraphUpArrow />
                  ) : (
                    <BsGraphDownArrow />
                  )}
                  {stat.change}
                </div>
              </div>

              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="dashboard-main-grid">
          {/* Asset Overview */}
          <div className="dashboard-card overview-card">
            <div className="card-header">
              <div>
                <h3>Asset Overview</h3>
                <p>Current equipment status</p>
              </div>

              <BsThreeDotsVertical />
            </div>

            <div className="overview-content">
              <div className="donut-wrapper">
                <div className="donut-chart">
                  <div className="donut-center">
                    <strong>248</strong>
                    <span>Total</span>
                  </div>
                </div>
              </div>

              <div className="overview-list">
                <div className="overview-item">
                  <span className="overview-dot available"></span>
                  <div>
                    <strong>164</strong>
                    <span>Available</span>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-dot issued"></span>
                  <div>
                    <strong>72</strong>
                    <span>Issued</span>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-dot maintenance"></span>
                  <div>
                    <strong>12</strong>
                    <span>Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card quick-card">
            <div className="card-header">
              <div>
                <h3>Quick Actions</h3>
                <p>Common management tasks</p>
              </div>
            </div>

            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action"
                  onClick={() => handleAction(action.link)}
                >
                  <div className={`quick-icon quick-${index}`}>
                    {action.icon}
                  </div>

                  <div className="quick-text">
                    <strong>{action.title}</strong>
                    <span>{action.description}</span>
                  </div>

                  <BsChevronRight className="quick-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Department + Activity */}
        <div className="dashboard-two-column">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Assets by Department</h3>
                <p>Equipment distribution</p>
              </div>
              <BsBuilding />
            </div>

            <div className="department-list">
              {departments.map((department, index) => (
                <div className="department-row" key={index}>
                  <div className="department-info">
                    <span>{department.name}</span>
                    <strong>{department.count}</strong>
                  </div>

                  <div className="department-progress">
                    <div
                      className="department-progress-fill"
                      style={{ width: `${department.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Recent Activity</h3>
                <p>Latest system activities</p>
              </div>

              <BsClockHistory />
            </div>

            <div className="activity-list">
              {activities.map((activity, index) => (
                <div className="activity-item" key={index}>
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.icon}
                  </div>

                  <div className="activity-content">
                    <strong>{activity.title}</strong>
                    <span>{activity.description}</span>
                    <small>{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Assets */}
        <div className="dashboard-card recent-assets-card">
          <div className="card-header recent-header">
            <div>
              <h3>Recent Assets</h3>
              <p>Recently added or updated equipment</p>
            </div>

            <div className="recent-actions">
              <div className="dashboard-search">
                <BsSearch />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                className="view-all-btn"
                onClick={() => handleAction("/assets")}
              >
                View All
                <BsChevronRight />
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Asset Tag</th>
                  <th>Asset</th>
                  <th>Category</th>
                  <th>Department</th>
                  <th>Serial Number</th>
                  <th>Condition</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map((asset, index) => (
                  <tr key={index}>
                    <td>
                      <strong className="asset-tag">{asset.tag}</strong>
                    </td>

                    <td>
                      <div className="asset-name-cell">
                        <div className="asset-small-icon">
                          <BsLaptop />
                        </div>
                        <span>{asset.name}</span>
                      </div>
                    </td>

                    <td>{asset.category}</td>
                    <td>{asset.department}</td>
                    <td>{asset.serial}</td>

                    <td>
                      <span
                        className={`condition-badge ${asset.condition
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {asset.condition}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${asset.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    <td>{asset.location}</td>
                  </tr>
                ))}

                {filteredAssets.length === 0 && (
                  <tr>
                    <td colSpan="8" className="empty-table">
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile asset cards */}
          <div className="mobile-assets">
            {filteredAssets.map((asset, index) => (
              <div className="mobile-asset-card" key={index}>
                <div className="mobile-asset-top">
                  <strong>{asset.tag}</strong>

                  <span
                    className={`status-badge ${asset.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {asset.status}
                  </span>
                </div>

                <h4>{asset.name}</h4>

                <div className="mobile-asset-details">
                  <span>
                    <small>Category</small>
                    {asset.category}
                  </span>

                  <span>
                    <small>Department</small>
                    {asset.department}
                  </span>

                  <span>
                    <small>Serial</small>
                    {asset.serial}
                  </span>

                  <span>
                    <small>Location</small>
                    {asset.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bottom-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <BsClipboardCheck />
            </div>
            <div>
              <span>Total Transactions</span>
              <strong>486</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <BsArrowDownLeft />
            </div>
            <div>
              <span>Total Returns</span>
              <strong>126</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <BsPersonCheck />
            </div>
            <div>
              <span>Total Issued</span>
              <strong>214</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon warning">
              <BsExclamationTriangleFill />
            </div>
            <div>
              <span>Damage / Lost</span>
              <strong>18</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;