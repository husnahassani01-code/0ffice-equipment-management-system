// import React from 'react'
import './receiving.css'
import {BsBoxSeam,BsCalendar3, BsClock,BsCheckCircle,BsSearch,BsArrowClockwise,BsThreeDotsVertical,
} from "react-icons/bs";

const receiving = () => {
  return (
    <div className="receiving-page">

      <div className="receiving-header">
        <div>
          <h1>Receiving</h1>
          <p>Record items received into the organization</p>
        </div>
        <button className="new-receiving-btn">
          + New Receiving
        </button>
      </div>
      <div className="receiving-cards">
        <div className="receiving-card">
          <div className="receiving-card-icon">
            <BsBoxSeam />
          </div>
          <div>
            <p>Total Received</p>
            <h2>142</h2>
          </div>
        </div>

        <div className="receiving-card">
          <div className="receiving-card-icon">
            <BsCalendar3 />
          </div>

          <div>
            <p>This Month</p>
            <h2>24</h2>
          </div>
        </div>

        <div className="receiving-card">
          <div className="receiving-card-icon">
            <BsClock />
          </div>

          <div>
            <p>Pending</p>
            <h2>5</h2>
          </div>
        </div>

        <div className="receiving-card">
          <div className="receiving-card-icon">
            <BsCheckCircle />
          </div>
          <div>
            <p>Completed</p>
            <h2>137</h2>
          </div>
        </div>

      </div>

      <div className="receiving-filters">
        <div className="receiving-filter">
          <label>From Date</label>
          <input type="date" />
        </div>
        <div className="receiving-filter">
          <label>To Date</label>
          <input type="date" />
        </div>
        <div className="receiving-filter">
          <label>Status</label>
          <select>
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="receiving-filter">
          <label>Supplier</label>
          <select>
            <option>All Suppliers</option>
            <option>Tech Solutions Ltd.</option>
            <option>Office World</option>
            <option>Global Office Supplies</option>
          </select>
        </div>
        <button className="filter-search-btn">
          <BsSearch />
          Search
        </button>

        <button className="filter-reset-btn">
          <BsArrowClockwise />
          Reset
        </button>

      </div>

      <div className="receiving-table-container">

        <table className="receiving-table">
          <thead>
            <tr>
              <th>Receiving ID</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Received By</th>
              <th>Total Items</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RCV-00142</td>
              <td>Sep 03, 2026</td>
              <td>Tech Solutions Ltd.</td>
              <td>Admin</td>
              <td>8</td>
              <td>
                <span className="receiving-status completed">
                  Completed
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>RCV-00141</td>
              <td>Sep 02, 2026</td>
              <td>Office World</td>
              <td>Sarah</td>
              <td>5</td>
              <td>
                <span className="receiving-status completed">
                  Completed
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>RCV-00140</td>
              <td>Aug 31, 2026</td>
              <td>Global Office Supplies</td>
              <td>John</td>
              <td>3</td>
              <td>
                <span className="receiving-status completed">
                  Completed
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>RCV-00139</td>
              <td>Aug 30, 2026</td>
              <td>Tech Solutions Ltd.</td>
              <td>Mary</td>
              <td>6</td>
              <td>
                <span className="receiving-status pending">
                  Pending
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>RCV-00138</td>
              <td>Aug 29, 2026</td>
              <td>Premium Devices</td>
              <td>Admin</td>
              <td>4</td>
              <td>
                <span className="receiving-status completed">
                  Completed
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>RCV-00137</td>
              <td>Aug 28, 2026</td>
              <td>Office World</td>
              <td>Sarah</td>
              <td>2</td>
              <td>
                <span className="receiving-status completed">
                  Completed
                </span>
              </td>
              <td className="receiving-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="receiving-table-footer">
          <p>Showing 1 to 6 of 142 items</p>
          <div className="receiving-pagination">
            <button>‹</button>
            <button className="active-page">
              1
            </button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>21</button>
            <button>›</button>
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default receiving
