
import { useState } from "react";
import { BsBuilding, BsLaptop, BsPeople, BsPlusLg } from "react-icons/bs";
const seed = [{ name: "IT", lead: "Michael Brown", assets: 42, people: 8, focus: "Laptops, monitors & network equipment" }, { name: "Finance", lead: "Jane Smith", assets: 18, people: 6, focus: "Workstations & printers" }, { name: "Human Resources", lead: "Sarah Wilson", assets: 12, people: 5, focus: "Laptops & accessories" }, { name: "Procurement", lead: "David Lee", assets: 9, people: 4, focus: "Shared equipment" }];
function Departments() { const [departments, setDepartments] = useState(seed); const [name, setName] = useState(""); const add = (event) => { event.preventDefault(); if (!name.trim() || departments.some((department) => department.name.toLowerCase() === name.trim().toLowerCase())) return; setDepartments([...departments, { name: name.trim(), lead: "Unassigned", assets: 0, people: 0, focus: "No equipment assigned" }]); setName(""); }; return <section className="workspacePage"><div className="workspaceHeading"><div><span className="eyebrow">Organization structure</span><h1>Departments</h1><p>See where equipment is assigned across the organization.</p></div><div className="headingMetric"><BsBuilding /><strong>{departments.length}</strong><span>departments</span></div></div><div className="departmentToolbar"><form onSubmit={add}><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Add a department" aria-label="New department name" /><button className="primaryButton" type="submit"><BsPlusLg /> Add department</button></form><span>IT equipment is highlighted for quick review</span></div><div className="departmentGrid">{departments.map((department) => <article className={`departmentCard ${department.name === "IT" ? "itDepartment" : ""}`} key={department.name}><div className="departmentCardHead"><div className="departmentIcon"><BsBuilding /></div><div><h2>{department.name}</h2><span>{department.lead}</span></div>{department.name === "IT" && <b className="itBadge">IT focus</b>}</div><p>{department.focus}</p><div className="departmentStats"><span><BsLaptop /><strong>{department.assets}</strong> assets</span><span><BsPeople /><strong>{department.people}</strong> people</span></div><div className="departmentBar"><span style={{ width: `${Math.min(department.assets * 2, 100)}%` }} /></div></article>)}</div></section>; }
export default Departments;
// import React from 'react'
import {BsBuilding,BsPlus,BsSearch,BsPencilSquare,BsTrash,BsPeople,
BsBoxSeam,BsThreeDotsVertical,} from "react-icons/bs";
import './department.css'

function department() {

  return (
    <div className="department-page">
      <div className="department-header">
        <div>
          <div className="title-wrapper">
            <div>
              <h2>Departments</h2>
              <p>Manage organization departments and their equipment.</p>
            </div>
          </div>
        </div>

        <button className="add-department-btn"> <BsPlus size={20} />Add Department</button>
      </div>

      <div className="department-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <BsBuilding />
          </div>
          <div>
            <span>Total Departments</span>
            <strong>8</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BsPeople />
          </div>
          <div>
            <span>Total Employees</span>
            <strong>126</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BsBoxSeam />
          </div>
          <div>
            <span>Assigned Equipment</span>
            <strong>214</strong>
          </div>
        </div>
      </div>

      <div className="department-card">
        <div className="table-toolbar">
          <div>
            <h3>Department List</h3>
            <p>View and manage all departments.</p>
          </div>

          <div className="search-box">
            <BsSearch />
            <input type="text" placeholder="Search departments..."/>
          </div>
        </div>

        <div className="table-responsive">
          <table className="department-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Code</th>
                <th>Manager</th>
                <th>Employees</th>
                <th>Equipment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>01</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>

                    <div>
                      <strong>Information Technology</strong>
                      <small>IT Department</small>
                    </div>
                  </div>
                </td>
                <td>IT-001</td>
                <td>John Smith</td>
                <td>24</td>
                <td>58</td>
                <td>
                  <span className="status active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>

                    <div>
                      <strong>Human Resources</strong>
                      <small>HR Department</small>
                    </div>
                  </div>
                </td>
                <td>HR-002</td>
                <td>Sarah Johnson</td>
                <td>15</td>
                <td>22</td>
                <td>
                  <span className="status active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>03</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>
                    <div>
                      <strong>Finance</strong>
                      <small>Finance Department</small>
                    </div>
                  </div>
                </td>
                <td>FIN-003</td>
                <td>Michael Brown</td>
                <td>18</td>
                <td>31</td>
                <td>
                  <span className="status active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>04</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>
                    <div>
                      <strong>Operations</strong>
                      <small>Operations Department</small>
                    </div>
                  </div>
                </td>
                <td>OPS-004</td>
                <td>David Wilson</td>
                <td>32</td>
                <td>47</td>
                <td>
                  <span className="status active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>05</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>
                    <div>
                      <strong>Marketing</strong>
                      <small>Marketing Department</small>
                    </div>
                  </div>
                </td>
                <td>MKT-005</td>
                <td>Emily Davis</td>
                <td>12</td>
                <td>19</td>
                <td>
                  <span className="status active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>06</td>
                <td>
                  <div className="department-name">
                    <div className="department-avatar">
                      <BsBuilding />
                    </div>
                    <div>
                      <strong>Administration</strong>
                      <small>Administration Department</small>
                    </div>
                  </div>
                </td>
                <td>ADM-006</td>
                <td>Robert Taylor</td>
                <td>10</td>
                <td>17</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button title="Delete" className="delete-btn">
                      <BsTrash />
                    </button>
                    <button title="More">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>Showing 1 to 6 of 8 departments</span>
          <div>
            <button>Previous</button>
            <button className="current-page">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default department

