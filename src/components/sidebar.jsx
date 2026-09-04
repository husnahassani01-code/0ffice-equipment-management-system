import { BsHouseFill, BsBarChartFill, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, BsPeopleFill,
   BsBuilding, BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck,BsFillEnvelopeFill} from 'react-icons/bs'
   import logo from "../assets/logo.png"
   import './sidebar.css'
  //  import {useState} from "react"
   
function sidebar({setActivePage}) {
  

  return (
    <div className='asides'>
         <div className="logo">
                <img src={logo} alt="" id='sdImage'/>
                <h3>Equipment Track Management</h3>
          </div>
         <nav className="navigation">
             <ul>
                 <li onClick={() => setActivePage("dashboard")}><BsHouseFill className="icon"></BsHouseFill><a>DASHBORD</a></li>
                 <li onClick={() => setActivePage("assets")}><BsBoxes className='icon'></BsBoxes><a>ASSETS</a></li>
                 <li onClick={() => setActivePage("stock")}><BsBoxSeam className='icon'></BsBoxSeam><a>STOCK</a></li>
                 <li onClick={() => setActivePage("receiving")}><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a>RECEIVING</a></li>
                 <li onClick={() => setActivePage("issuing")}><BsClipboardCheck className='icon'></BsClipboardCheck><a>ISSUING</a></li>
                 <li onClick={() => setActivePage("returns")}><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a>RETURNS</a></li>
                 <li onClick={() => setActivePage("transfers")}><BsArrowLeftRight className='icon'></BsArrowLeftRight><a>TRANSFERS</a></li>
                 <li onClick={() => setActivePage("damage")}><BsExclamationTriangle className='icon'></BsExclamationTriangle><a>DAMAGE/LOOSE</a></li>
                 <li onClick={() => setActivePage("employee")}><BsPersonCircle className='icon'></BsPersonCircle><a>EMPLOYEES</a></li>
                 <li onClick={() => setActivePage("departments")}><BsBuilding className="icon"></BsBuilding><a>DEPARTMENTS</a></li>
                 <li onClick={() => setActivePage("users")}><BsPeopleFill className='icon'></BsPeopleFill><a>USERS</a></li>
                 <li onClick={() => setActivePage("reports")}><BsBarChartFill className='icon'></BsBarChartFill><a>REPORTS</a></li>
              </ul>
         </nav>
      
    </div>
  )
}

export default sidebar