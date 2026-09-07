import { BsJustifyLeft, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, 
   BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck} from 'react-icons/bs'
   import './dashboard.css'

function dashboard() {
  return (
    <div className='content'>
      <div className='dash'>
         <h2>Dashbord</h2>
         <p>Welcome back</p>
      </div>

      <div className='container'>
      <div className="cardContainer">
        <div className="card">
          <div><BsPersonCircle className='icon4'></BsPersonCircle></div>
        </div>
        <div className='assets'>
          <p>Assigned Assets</p>
          <strong id='number'>340</strong>
          <p id='detail' style={{color: "blue"}}>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsClipboardCheck className='icon4'></BsClipboardCheck></div>
        </div>
        <div className='assets'>
          <p>Total Assets</p>
          <strong id='number'>200</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxes className='icon4'></BsBoxes></div>
        </div>
        <div className='assets'>
          <p>Available Assets</p>
          <strong id='number'>400</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxSeam  className='icon4'></BsBoxSeam></div>
        </div>
        <div className='assets'>
          <p>Total Stock Item</p>
          <strong id='number'>220</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsBoxSeam className='icon4'></BsBoxSeam></div>
        </div>
        <div className='assets'>
          <p>Low Stock Item</p>
          <strong id='number'>15</strong>
          <p id='detail' style={{color: "blue"}}>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsArrowReturnLeft className='icon4'></BsArrowReturnLeft></div>
        </div>
        <div className='assets'>
          <p>Total Returns</p>
          <strong id='number'>120</strong>
          <p id='detail'>View details..  </p>
        </div>
      </div>

      <div className="cardContainer">
        <div className="card">
          <div><BsExclamationTriangle className='icon5' ></BsExclamationTriangle></div>
        </div>
        <div className='assets'>
          <p>Damage/Loose</p>
          <strong id='number'>10</strong>
          <p id='detail' style={{color: "red"}}>View details..  </p>
        </div>
      </div>

      </div>
      <div className='tableContainer'>

        <div className='recentActivities'>
          <table className='table1'>
            <tr>
              <th>Recent activities</th>
              <th></th>
              <th><button>View all</button></th>
            </tr>
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
                <small>Jane Smith (HR Department)</small></td>
              <td>
              <td>
                <p>Jane Smith</p>
                <small>HR Department</small></td>
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
              <td>1 days ago</td>
            </tr>

            <tr>
              <td>
                <p>Mouse (MS-4002) reported asdamaged</p>
              </td>
              <td><p>Michael Brown</p>
                <small>Admin</small>
              </td>
              <td> 2 days ago</td>
            </tr>

          </table>
        </div>
        <div className='accessContainer'>
          <div className='access'>
            <BsJustifyLeft className='icon' style={{cursor: "pointer"}}></BsJustifyLeft>
            <strong>Quick Access</strong>
          </div>
          <div className="cardAccess">
            <div className="cardInfo" style={{backgroundColor: "rgb(188, 205, 249)"}}>
              <div className="card">
                <div><BsClipboardCheck className='icon4' style={{color:"rgb(40, 119, 229)"}}></BsClipboardCheck></div>
              </div>
              <div className='assets'>
                <p>Issue Assets</p>
              </div>
          </div>

          <div className="cardInfo" style={{backgroundColor: "rgb(188, 205, 249)"}}>
              <div className="card">
                <div><BsArrowLeftRight className='icon4' style={{color:"rgb(40, 119, 229)"}}></BsArrowLeftRight></div>
              </div>
              <div className='assets'>
                <p>Transfers Assets</p>
              </div>
          </div>

          <div className="cardInfo" style={{backgroundColor: "rgb(188, 205, 249)"}}>
              <div className="card">
                <div><BsArrowReturnLeft className='icon4' style={{color:"rgb(40, 119, 229)"}}></BsArrowReturnLeft></div>
              </div>
              <div className='assets'>
                <p>Return Assets</p>
              </div>
          </div>

          <div className="cardInfo" style={{backgroundColor: "rgb(188, 205, 249)"}}>
              <div className="card">
                <div><BsPersonCircle className='icon4' style={{color:"rgb(40, 119, 229)"}}></BsPersonCircle></div>
              </div>
              <div className='assets'>
                <p>Assigned Assets</p>
              </div>
          </div>

            <div className="cardInfo" children style={{width:"610px", backgroundColor:"rgb(188, 205, 249)"}}>
              <div className="card">
                <div><BsExclamationTriangle className='icon4' style={{color:"red"}}></BsExclamationTriangle></div>
              </div>
              <div className='assets'>
                <p style={{color:"red"}}>Assigned Assets</p>
              </div>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default dashboard