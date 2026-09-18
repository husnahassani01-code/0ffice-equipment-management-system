import { useState } from "react";
import { BsPencil, BsTrash, BsPlusLg, BsBoxArrowInDown } from "react-icons/bs";

const initialReceipts = [
  { id: 1, item: "Dell Latitude 5440", sku: "IT-LAP-5440", quantity: 14, supplier: "TechSource Ltd", date: "2026-09-01", status: "Verified" },
  { id: 2, item: "HP LaserJet Pro M404", sku: "PRN-M404", quantity: 6, supplier: "PrintWorks", date: "2026-08-29", status: "Verified" },
  { id: 3, item: "USB-C Docking Station", sku: "IT-DCK-100", quantity: 8, supplier: "TechSource Ltd", date: "2026-08-24", status: "Pending" }
];
function Receiving() {
  const blank = { item: "", sku: "", quantity: "", phone: "", date: "" };
  const [form, setForm] = useState(blank); const [receipts, setReceipts] = useState(initialReceipts); const [editingId, setEditingId] = useState(null);
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = (event) => { event.preventDefault(); if (editingId) setReceipts(receipts.map((receipt) => receipt.id === editingId ? { ...receipt, ...form, quantity: Number(form.quantity), status: "Pending" } : receipt)); else setReceipts([{ ...form, id: Date.now(), quantity: Number(form.quantity), status: "Pending" }, ...receipts]); setForm(blank); setEditingId(null); };
  const edit = (receipt) => { setEditingId(receipt.id); setForm({ item: receipt.item, sku: receipt.sku, quantity: receipt.quantity, phone: receipt.phone
    , date: receipt.date }); };
  return <section className="workspacePage"><div className="workspaceHeading"><div><span className="eyebrow">Inventory movement</span><h1>Receiving</h1><p>Log new equipment as it arrives at the main store.</p></div><div className="headingMetric"><BsBoxArrowInDown /><strong>{receipts.length}</strong><span>receipts this period</span></div></div><div className="workspaceGrid"><form className="operationForm" onSubmit={submit}><div className="formHeader"><div><span className="sectionKicker">{editingId ? "Update record" : "New receipt"}</span><h2>{editingId ? "Edit receipt" : "Receive equipment"}</h2></div><BsPlusLg /></div><label>Item name<input value={form.item} onChange={update("item")} placeholder="e.g. Dell Latitude 5440" required /></label><div className="formRow"><label>SKU<input value={form.sku} onChange={update("sku")} placeholder="IT-LAP-5440" required /></label><label>Quantity<input type="number" min="1" value={form.quantity} onChange={update("quantity")} required />
  
  </label></div>
  <label>Supplier<input value={form.supplier} onChange={update("supplier")} placeholder="Supplier name" required />
  
  <label>Supplier Phone<input value={form.phone} onChange={update("phone")} placeholder="Supplier Phone" required />
  </label>

<<<<<<< HEAD
  </label><label>Date received<input type="date" value={form.date} onChange={update("date")} required /></label><div className="formActions"><button className="primaryButton" type="submit">{editingId ? "Save changes" : "Record receipt"}</button><button className="textButton" type="button" onClick={() => { setForm(blank); setEditingId(null); }}>Clear</button></div></form><div className="recordsPanel"><div className="panelTitle"><div><span className="sectionKicker">Recent activity</span><h2>Receipt history</h2></div><span className="recordCount">{receipts.length} records</span></div><div className="recordList">{receipts.map((receipt) => <article className="recordRow" key={receipt.id}><div className="recordIcon"><BsBoxArrowInDown /></div><div className="recordMain"><strong>{receipt.item}</strong><span>{receipt.sku} · {receipt.supplier}</span></div>
  <div className="recordMeta"><strong>{receipt.quantity} units</strong><span>{receipt.date}</span></div><span className={`status ${receipt.status.toLowerCase()}`}>{receipt.status}</span><div className="rowActions"><button aria-label="Edit receipt" onClick={() => edit(receipt)}><BsPencil /></button><button aria-label="Delete receipt" onClick={() => setReceipts(receipts.filter((item) => item.id !== receipt.id))}><BsTrash /></button></div></article>)}</div></div></div></section>;
=======
      <div className="receiving-header">
        <div>
          <h1>Receiving</h1>
          <p>Record items received into the organization</p>
        </div>
        <button className="new-receiving-btn">+ New Receiving</button>
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

      <div className='allFilters'>
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
       </div>

        <div className='allTable'>
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



        
    </div>
    
  )
>>>>>>> a5711a62cb3d834dc3d22062a2feeaabf3ee6f0d
}
export default Receiving;
