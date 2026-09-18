import {
  BsJustifyLeft,
  BsExclamationTriangle,
  BsPersonCircle,
  BsBoxSeam,
  BsBoxes,
  BsArrowLeftRight,
  BsArrowReturnLeft,
  BsClipboardCheck
} from "react-icons/bs";

function Dashboard() {

  return (
    <div className="content">

      <div className="dash">

        <h2>Dashboard</h2>

        <p>Welcome back</p>

      </div>

      <div className="container">

        <div className="cardContainer">

          <div className="card">
            <BsPersonCircle className="icon1" />
          </div>

          <div className="assets">
            <p>Assigned Assets</p>
            <strong id="number">340</strong>
            <p id="detail" style={{ color: "green" }}>
              View details..
            </p>
          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsClipboardCheck className="icon2" />
          </div>

          <div className="assets">
            <p>Total Assets</p>
            <strong id="number">200</strong>
            <p id="detail">View details..</p>
          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsBoxes className="icon3" />
          </div>

          <div className="assets">
            <p>Available Assets</p>
            <strong id="number">400</strong>
            <p id="detail">View details..</p>
          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsBoxSeam className="icon4" />
          </div>

          <div className="assets">
            <p>Total Stock Item</p>
            <strong id="number">220</strong>
            <p id="detail">View details..</p>
          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsBoxSeam className="icon5" />
          </div>

          <div className="assets">
            <p>Low Stock Item</p>
            <strong id="number">15</strong>

            <p
              id="detail"
              style={{ color: "rgb(230, 63, 188)" }}
            >
              View details..
            </p>

          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsArrowReturnLeft className="icon6" />
          </div>

          <div className="assets">
            <p>Total Returns</p>
            <strong id="number">120</strong>
            <p id="detail">View details..</p>
          </div>

        </div>


        <div className="cardContainer">

          <div className="card">
            <BsExclamationTriangle className="icon7" />
          </div>

          <div className="assets">
            <p>Damage/Lost</p>
            <strong id="number">10</strong>

            <p
              id="detail"
              style={{ color: "red" }}
            >
              View details..
            </p>

          </div>

        </div>

      </div>


      <div className="tableContainer">

        <div className="recentActivities">

          <table className="table1">

            <thead>
              <tr>
                <th>Recent activities</th>
                <th></th>
                <th>
                  <button>View all</button>
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>

                <td>
                  <p>Laptop (LT-1001) issued to John Doe</p>
                  <small>John Doe (IT Department)</small>
                </td>

                <td>
                  <p>John Doe</p>
                  <small>IT Department</small>
                </td>

                <td>2 hours ago</td>

              </tr>


              <tr>

                <td>
                  <p>Monitor (MN-2002) returned by Jane Smith</p>
                  <small>Jane Smith (HR Department)</small>
                </td>

                <td>
                  <p>Jane Smith</p>
                  <small>HR Department</small>
                </td>

                <td>5 hours ago</td>

              </tr>


              <tr>

                <td>
                  <p>Printer (PR-3001) transferred to Finance Department</p>
                  <small>Admin</small>
                </td>

                <td>
                  <p>Admin</p>
                  <small>IT Department</small>
                </td>

                <td>1 day ago</td>

              </tr>


              <tr>

                <td>
                  <p>10 units of Toner Cartridge received</p>
                </td>

                <td>
                  <p>Admin</p>
                  <small>Store</small>
                </td>

                <td>1 day ago</td>

              </tr>


              <tr>

                <td>
                  <p>Mouse (MS-4002) reported as damaged</p>
                </td>

                <td>
                  <p>Michael Brown</p>
                  <small>Admin</small>
                </td>

                <td>2 days ago</td>

              </tr>

            </tbody>

          </table>

        </div>


        <div className="accessContainer">

          <div className="access">

            <BsJustifyLeft className="icon" />

            <strong>Quick Access</strong>

          </div>


          <div className="cardAccess">

            <div className="cardInfo">

              <div className="card">
                <BsClipboardCheck className="icon1" />
              </div>

              <div className="assets">
                <p style={{ color: "green" }}>
                  Issue Assets
                </p>
              </div>

            </div>


            <div
              className="cardInfo"
              style={{ backgroundColor: "rgb(220, 238, 150)" }}
            >

              <div className="card">
                <BsArrowLeftRight
                  className="icon1"
                  style={{ color: "blue" }}
                />
              </div>

              <div className="assets">
                <p>Transfer Assets</p>
              </div>

            </div>


            <div
              className="cardInfo"
              style={{ backgroundColor: "rgb(238, 193, 232)" }}
            >

              <div className="card">
                <BsArrowReturnLeft
                  className="icon1"
                  style={{ color: "grey" }}
                />
              </div>

              <div className="assets">
                <p>Return Assets</p>
              </div>

            </div>


            <div
              className="cardInfo"
              style={{ backgroundColor: "rgb(213, 219, 213)" }}
            >

              <div className="card">
                <BsPersonCircle
                  className="icon1"
                  style={{ color: "orange" }}
                />
              </div>

              <div className="assets">
                <p>Assigned Assets</p>
              </div>

            </div>


            <div
              className="cardInfo"
              style={{
                width: "610px",
                backgroundColor: "pink"
              }}
            >

              <div className="card">
                <BsExclamationTriangle
                  className="icon1"
                  style={{ color: "red" }}
                />
              </div>

              <div className="assets">
                <p style={{ color: "red" }}>
                  Damaged / Lost
                </p>
              </div>

            </div>

          </div>

        </div>

<<<<<<< HEAD
=======
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
            <button className="view-all">View All<BsArrowRight /></button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon blue"><BsLaptop /></div>
              <div>
                <strong>Dell Latitude 5520 issued</strong>
                <span>John Smith · IT Department</span>
              </div>
              <small>Today</small>
            </div>
            <div className="activity-item">
              <div className="activity-icon purple">
                <BsArrowLeftRight />
              </div>
              <div>
                <strong>HP LaserJet Pro transferred</strong>
                <span>Sarah Johnson · HR Department</span>
              </div>
              <small>Yesterday</small>
            </div>
            <div className="activity-item">
              <div className="activity-icon green">
                <BsArrowRepeat />
              </div>
              <div>
                <strong>Lenovo ThinkPad E14 returned</strong>
                <span>Michael Brown · Finance</span>
              </div>
              <small>2 days ago</small>
            </div>
            <div className="activity-item">
              <div className="activity-icon red">
                <BsExclamationTriangle />
              </div>
              <div>
                <strong>Keyboard reported damaged</strong>
                <span>Emily Davis · Marketing</span>
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
                <strong>Register Asset</strong>Add new equipment</span>
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

>>>>>>> a5711a62cb3d834dc3d22062a2feeaabf3ee6f0d
      </div>

    </div>
  );
}

export default Dashboard;