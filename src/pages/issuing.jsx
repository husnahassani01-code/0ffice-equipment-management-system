
import { useState } from "react";
import { BsPencil, BsTrash, BsClipboardCheck } from "react-icons/bs";
const initialIssues = [{ id: 1, asset: "Dell Latitude 5440", tag: "IT-LAP-5440-07", employee: "John Doe", department: "IT", date: "2026-09-01", status: "Issued" }, { id: 2, asset: "Logitech MK207", tag: "ACC-MK270-04", employee: "Jane Smith", department: "Finance", date: "2026-08-30", status: "Issued" }, { id: 3, asset: "HP LaserJet Pro M404", tag: "PRN-M404-02", employee: "Michael Brown", department: "IT", date: "2026-08-28", status: "Issued" }];
function Issuing() { const blank = { asset: "", tag: "", employee: "", department: "", date: "" }; const [form, setForm] = useState(blank); const [issues, setIssues] = useState(initialIssues); const [editingId, setEditingId] = useState(null); const update = (field) => (event) => setForm({ ...form, [field]: event.target.value }); const submit = (event) => { event.preventDefault(); if (editingId) setIssues(issues.map((issue) => issue.id === editingId ? { ...issue, ...form } : issue)); else setIssues([{ ...form, id: Date.now(), status: "Issued" }, ...issues]); setForm(blank); setEditingId(null); }; const edit = (issue) => { setEditingId(issue.id); setForm({ asset: issue.asset, tag: issue.tag, employee: issue.employee, department: issue.department, date: issue.date }); }; return <section className="workspacePage"><div className="workspaceHeading"><div><span className="eyebrow">Asset custody</span><h1>Issuing</h1><p>Assign IT equipment to an employee and keep the holder history current.</p></div><div className="headingMetric"><BsClipboardCheck /><strong>{issues.length}</strong><span>active assignments</span></div></div><div className="workspaceGrid"><form className="operationForm" onSubmit={submit}><div className="formHeader"><div><span className="sectionKicker">{editingId ? "Update assignment" : "New assignment"}</span><h2>{editingId ? "Edit issue" : "Issue equipment"}</h2></div><BsClipboardCheck /></div><label>Equipment<input value={form.asset} onChange={update("asset")} placeholder="e.g. Dell Latitude 5440" required /></label><label>Asset tag<input value={form.tag} onChange={update("tag")} placeholder="IT-LAP-5440-07" required /></label><label>Employee name<input value={form.employee} onChange={update("employee")} placeholder="Employee name" required /></label><div className="formRow"><label>Department<select value={form.department} onChange={update("department")} required><option value="">Select</option><option>IT</option><option>Finance</option><option>Human Resources</option><option>Procurement</option><option>Administration</option></select></label><label>Issue date<input type="date" value={form.date} onChange={update("date")} required /></label></div><div className="formActions"><button className="primaryButton" type="submit">{editingId ? "Save changes" : "Issue asset"}</button><button className="textButton" type="button" onClick={() => { setForm(blank); setEditingId(null); }}>Clear</button></div></form><div className="recordsPanel"><div className="panelTitle"><div><span className="sectionKicker">Live register</span><h2>Current holders</h2></div><span className="recordCount">{issues.length} assigned</span></div><div className="recordList">{issues.map((issue) => <article className="recordRow" key={issue.id}><div className="avatar">{issue.employee.split(" ").map((name) => name[0]).join("")}</div><div className="recordMain"><strong>{issue.employee}</strong><span>{issue.asset} / {issue.tag}</span></div><div className="recordMeta"><strong>{issue.department}</strong><span>{issue.date}</span></div><span className="status issued">{issue.status}</span><div className="rowActions"><button aria-label="Edit issue" onClick={() => edit(issue)}><BsPencil /></button><button aria-label="Delete issue" onClick={() => setIssues(issues.filter((item) => item.id !== issue.id))}><BsTrash /></button></div></article>)}</div></div></div></section>; }
export default Issuing;
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
        <button className="new-issuing-btn">+ New Issuing</button>
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
        <button className="issuing-search-btn"><BsSearch />Search</button>
        <button className="issuing-reset-btn"><BsArrowClockwise />Reset</button>
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
                <span className="issuing-status completed">Completed</span>
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
                <span className="issuing-status completed">Completed</span>
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
                <span className="issuing-status completed">Completed</span>
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
                <span className="issuing-status pending">Pending</span>
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
                <span className="issuing-status completed">Completed</span>
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
                <span className="issuing-status completed">Completed</span>
              </td>
              <td className="issuing-action">
                <BsThreeDotsVertical />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="issuing-table-footer">
          <p>Showing 1 to 6 of 286 items</p>
          <div className="issuing-pagination">
            <button>‹</button>
            <button className="active-page">1</button>
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
>>>>>>> a5711a62cb3d834dc3d22062a2feeaabf3ee6f0d
