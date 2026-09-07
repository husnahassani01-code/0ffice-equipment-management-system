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

      </div>

    </div>
  );
}

export default Dashboard;