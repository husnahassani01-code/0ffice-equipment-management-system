// import React from 'react'
import {BsThreeDotsVertical,BsLaptop,BsPrinter,BsDisplay,} from "react-icons/bs";
import './assets.css'

function assets(){
  return(
    <div className='assetsPage'>

      <div className="assetsHeader">
        <div>
          <h2>Assets</h2>
          <p>Manage organization assets</p>
        </div>
        <button className="addAsset">
          + Add Asset
        </button>
      </div>
      <div className="assetCards">
        <div className="assetCard">
          <BsLaptop />
          <div>
            <p>Total Assets</p>
            <strong>340</strong>
          </div>
        </div>
        <div className="assetCard">
          <BsDisplay />
          <div>
            <p>Assigned</p>
            <strong>245</strong>
          </div>
        </div>
        <div className="assetCard">
          <BsPrinter />
          <div>
            <p>Available</p>
            <strong>75</strong>
          </div>
        </div>
      </div>

      <div className="assetTable">
        <table>
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AST-001</td>
              <td>Dell Laptop</td>
              <td>Laptop</td>
              <td>Hassan</td>
              <td>IT</td>
              <td>Assigned</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>AST-002</td>
              <td>HP Printer</td>
              <td>Printer</td>
              <td>Sarah</td>
              <td>Finance</td>
              <td>Assigned</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>AST-003</td>
              <td>Dell Monitor</td>
              <td>Monitor</td>
              <td>-</td>
              <td>IT</td>
              <td>Available</td>
              <td>
                <BsThreeDotsVertical />
              </td>
            </tr>
            <tr>
              <td>AST-005</td>
              <td>Samsung Monitor</td>
              <td>Monitor</td>
              <td>-</td>
              <td>Marketing</td>
              <td>Available</td>
              <td><BsThreeDotsVertical /></td>
            </tr>
            <tr>
              <td>AST-006</td>
              <td>Canon Printer</td>
              <td>Printer</td>
              <td>John</td>
              <td>Administration</td>
              <td>Assigned</td>
              <td><BsThreeDotsVertical /></td>
            </tr>
            <tr>
              <td>AST-007</td>
              <td>HP Desktop Computer</td>
              <td>Desktop</td>
              <td>Mary</td>
              <td>Finance</td>
              <td>Assigned</td>
              <td><BsThreeDotsVertical /></td>
            </tr>
            <p></p>
          <p id='tp'>Showing 1to 8 of 142 items</p>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default assets
