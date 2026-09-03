import React from 'react'
import {BsPersonCircle,BsThreeDotsVertical} from "react-icons/bs";

function employee() {
  return(
    <div className='employeesPage'>

      <div className="employeesHeader">
        <div>
          <h2>Employees</h2>
          <p>Manage organization employees</p>
        </div>
        <button className="addEmployee">
          + Add Employee
        </button>
      </div>
      <div className="employeeCards">
        <div className="employeeCard">
          <BsPersonCircle />
          <div>
            <p>Total Employees</p>
            <strong>120</strong>
          </div>
        </div>
        <div className="employeeCard">
          <BsPersonCircle />
          <div>
            <p>Active Employees</p>
            <strong>110</strong>
          </div>
        </div>
        <div className="employeeCard">
          <BsPersonCircle />
          <div>
            <p>Inactive Employees</p>
            <strong>10</strong>
          </div>
        </div>
      </div>

      <div className="employeeTable">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Assets Held</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EMP-001</td>
              <td>Hassan</td>
              <td>hassan@gmail.com</td>
              <td>IT</td>
              <td>Developer</td>
              <td>3</td>
              <td>Active</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>EMP-002</td>
              <td>Sarah</td>
              <td>sarah@gmail.com</td>
              <td>Finance</td>
              <td>Accountant</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>EMP-003</td>
              <td>Ahmed</td>
              <td>ahmed@gmail.com</td>
              <td>HR</td>
              <td>HR Officer</td>
              <td>1</td>
              <td>Active</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>EMP-004</td>
              <td>Mary</td>
              <td>mary@gmail.com</td>
              <td>Marketing</td>
              <td>Marketing Officer</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>EMP-005</td>
              <td>John</td>
              <td>john@gmail.com</td>
              <td>Administration</td>
              <td>Administrator</td>
              <td>4</td>
              <td>Inactive</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default employee
