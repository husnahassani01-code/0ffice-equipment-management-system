// import React from 'react'
import {BsBoxArrowUp,BsCalendar3,BsClock,BsCheckCircle,BsSearch,
BsArrowClockwise,BsThreeDotsVertical } from "react-icons/bs";
import './issuing.css'

const issuing = () => {
  return (
    <div className="issuing-page">

      <div className="issuing-header">
        <div>
          <h1>Issuing</h1>
          <p>Record equipment issued to employees and departments</p>
        </div>
        <button className="new-issuing-btn">
          + New Issuing
        </button>
      </div>

      <div className="issuing-cards">
         <div className="issuing-card">
          <div className="issuing-card-icon">
            <BsBoxArrowUp />
          </div>
          <div>
            <p>Total Issued</p>
            <h2>286</h2>
          </div>
        </div>

        <div className="issuing-card">
          <div className="issuing-card-icon">
            <BsCalendar3 />
          </div>
          <div>
            <p>This Month</p>
            <h2>32</h2>
          </div>
        </div>

        <div className="issuing-card">
          <div className="issuing-card-icon">
            <BsClock />
          </div>
          <div>
            <p>Pending</p>
            <h2>7</h2>
          </div>
        </div>

        <div className="issuing-card">
          <div className="issuing-card-icon">
            <BsCheckCircle />
          </div>
          <div>
            <p>Completed</p>
            <h2>279</h2>
          </div>
        </div>
      </div>

      <div className="issuing-filters">
        <div className="issuing-filter">
          <label>From Date</label>
          <input type="date" />
        </div>
        <div className="issuing-filter">
          <label>To Date</label>
          <input type="date" />
        </div>
        <div className="issuing-filter">
          <label>Status</label>
          <select>
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="issuing-filter">
          <label>Employee</label>
          <select>
            <option>All Employees</option>
            <option>Sarah Johnson</option>
            <option>John Smith</option>
            <option>Mary Williams</option>
            <option>David Brown</option>
          </select>
        </div>
        <button className="issuing-search-btn">
          <BsSearch />
          Search
        </button>
        <button className="issuing-reset-btn">
          <BsArrowClockwise />
          Reset
        </button>
      </div>

      <div className="issuing-table-container">
        <table className="issuing-table">
          <thead>
            <tr>
              <th>Issuing ID</th>
              <th>Date</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Total Items</th>
              <th>Issued By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ISS-00286</td>
              <td>Sep 03, 2026</td>
              <td>Sarah Johnson</td>
              <td>IT Department</td>
              <td>3</td>
              <td>Admin</td>
              <td>
                <span className="issuing-status completed">
                  Completed
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>

            <tr>
              <td>ISS-00285</td>
              <td>Sep 02, 2026</td>
              <td>John Smith</td>
              <td>Finance</td>
              <td>2</td>
              <td>Sarah</td>
              <td>
                <span className="issuing-status completed">
                  Completed
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>

            <tr>
              <td>ISS-00284</td>
              <td>Sep 01, 2026</td>
              <td>Mary Williams</td>
              <td>Human Resources</td>
              <td>4</td>
              <td>Admin</td>
              <td>
                <span className="issuing-status completed">
                  Completed
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>

            <tr>
              <td>ISS-00283</td>
              <td>Aug 31, 2026</td>
              <td>David Brown</td>
              <td>Operations</td>
              <td>1</td>
              <td>John</td>
              <td>
                <span className="issuing-status pending">
                  Pending
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>

            <tr>
              <td>ISS-00282</td>
              <td>Aug 30, 2026</td>
              <td>Sarah Johnson</td>
              <td>IT Department</td>
              <td>2</td>
              <td>Admin</td>
              <td>
                <span className="issuing-status completed">
                  Completed
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>

            <tr>
              <td>ISS-00281</td>
              <td>Aug 29, 2026</td>
              <td>John Smith</td>
              <td>Finance</td>
              <td>3</td>
              <td>Sarah</td>
              <td>
                <span className="issuing-status completed">
                  Completed
                </span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="issuing-table-footer">
          <p>
            Showing 1 to 6 of 286 items
          </p>
          <div className="issuing-pagination">
            <button>‹</button>
            <button className="active-page">
              1
            </button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>48</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default issuing
