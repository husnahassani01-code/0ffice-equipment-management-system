import { BsHouseFill, BsBarChartFill, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, BsPeopleFill,
   BsBuilding, BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck,BsFillEnvelopeFill} from 'react-icons/bs'
   import logo from "../assets/logo.png"
   import './sidebar.css'
  //  import {useState} from "react"
   
function Sidebar({ setActivePage, activePage }) {
  

  return (
    <div className='asides'>
         <div className="logo">
                <img src={logo} alt="" id='sdImage'/>
                <h3>Equipment Track Management System</h3>
          </div>
         <nav className="navigation">
             <ul>


                 <li className={activePage === "main" ? "activeNav" : ""} onClick={() => setActivePage("main")}><BsHouseFill className="icon"></BsHouseFill><a href="#" onClick={(event) => event.preventDefault()}>DASHBOARD</a></li>
                 <li className={activePage === "assets" ? "activeNav" : ""} onClick={() => setActivePage("assets")}><BsBoxes className='icon'></BsBoxes><a href="#" onClick={(event) => event.preventDefault()}>ASSETS</a></li>
                 <li className={activePage === "stock" ? "activeNav" : ""} onClick={() => setActivePage("stock")}><BsBoxSeam className='icon'></BsBoxSeam><a href="#" onClick={(event) => event.preventDefault()}>STOCK</a></li>
                 <li className={activePage === "receiving" ? "activeNav" : ""} onClick={() => setActivePage("receiving")}><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a href="#" onClick={(event) => event.preventDefault()}>RECEIVING</a></li>
                 <li className={activePage === "issuing" ? "activeNav" : ""} onClick={() => setActivePage("issuing")}><BsClipboardCheck className='icon'></BsClipboardCheck><a href="#" onClick={(event) => event.preventDefault()}>ISSUING</a></li>
                 <li className={activePage === "returns" ? "activeNav" : ""} onClick={() => setActivePage("returns")}><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a href="#" onClick={(event) => event.preventDefault()}>RETURNS</a></li>
                 <li className={activePage === "transfer" ? "activeNav" : ""} onClick={() => setActivePage("transfer")}><BsArrowLeftRight className='icon'></BsArrowLeftRight><a href="#" onClick={(event) => event.preventDefault()}>TRANSFERS</a></li>
                 <li className={activePage === "damage" ? "activeNav" : ""} onClick={() => setActivePage("damage")}><BsExclamationTriangle className='icon'></BsExclamationTriangle><a href="#" onClick={(event) => event.preventDefault()}>DAMAGE/LOOSE</a></li>
                 <li className={activePage === "employee" ? "activeNav" : ""} onClick={() => setActivePage("employee")}><BsPersonCircle className='icon'></BsPersonCircle><a href="#" onClick={(event) => event.preventDefault()}>EMPLOYEES</a></li>
                 <li className={activePage === "departments" ? "activeNav" : ""} onClick={() => setActivePage("departments")}><BsBuilding className="icon"></BsBuilding><a href="#" onClick={(event) => event.preventDefault()}>DEPARTMENTS</a></li>
                 <li className={activePage === "users" ? "activeNav" : ""} onClick={() => setActivePage("users")}><BsPeopleFill className='icon'></BsPeopleFill><a href="#" onClick={(event) => event.preventDefault()}>USERS</a></li>
                 <li><BsBarChartFill className='icon'></BsBarChartFill><a href="">REPORTS</a></li>
                 <li onClick={() => setActivePage("dashboard")}><BsHouseFill className="icon"></BsHouseFill><a>DASHBORD</a></li>
                 <li onClick={() => setActivePage("assets")}><BsBoxes className='icon'></BsBoxes><a>ASSETS</a></li>
                 <li onClick={() => setActivePage("stock")}><BsBoxSeam className='icon'></BsBoxSeam><a>STOCK</a></li>
                 <li onClick={() => setActivePage("receiving")}><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a>RECEIVING</a></li>
                 <li onClick={() => setActivePage("issuing")}><BsClipboardCheck className='icon'></BsClipboardCheck><a>ISSUING</a></li>
                 <li onClick={() => setActivePage("returns")}><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a>RETURNS</a></li>
                 <li onClick={() => setActivePage("transfers")}><BsArrowLeftRight className='icon'></BsArrowLeftRight><a>TRANSFERS</a></li>
                 <li onClick={() => setActivePage("damage")}><BsExclamationTriangle className='icon'></BsExclamationTriangle><a>DAMAGE/LOOSE</a></li>
                 <li onClick={() => setActivePage("employee")}><BsPersonCircle className='icon'></BsPersonCircle><a>EMPLOYEES</a></li>
                 <li onClick={() => setActivePage("department")}><BsBuilding className="icon"></BsBuilding><a>DEPARTMENTS</a></li>
                 <li onClick={() => setActivePage("users")}><BsPeopleFill className='icon'></BsPeopleFill><a>USERS</a></li>
                 <li onClick={() => setActivePage("report")}><BsBarChartFill className='icon'></BsBarChartFill><a>REPORTS</a></li>

              </ul>
         </nav>
    </div>
  )
}

export default Sidebar















// import { BsHouseFill, BsBarChartFill, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, BsPeopleFill,
//    BsBuilding, BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck,BsFillEnvelopeFill} from 'react-icons/bs'
//    import logo from "../assets/logo.png"
//   //  import {useState} from "react"
   
// function sidebar() {
  

//   return (
//     <div className='asides'>
//          <div className="logo">
//                 <img src={logo} alt="" id='sdImage'/>
//                 <h3>Equipment Track Management</h3>
//             </div>
//          <nav className="navigation">
//              <ul>
//                  <li><BsHouseFill className="icon"></BsHouseFill><a href="main.jsx">DASHBORD</a></li>
//                  <li><BsBoxes className='icon'></BsBoxes><a href="">ASSETS</a></li>
//                  <li><BsBoxSeam className='icon'></BsBoxSeam><a href="">STOCK</a></li>
//                  <li><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a href="receiving">RECEIVING</a></li>
//                  <li><BsClipboardCheck className='icon'></BsClipboardCheck><a href="">ISSURING</a></li>
//                  <li><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a href="">RETURNS</a></li>
//                  <li><BsArrowLeftRight className='icon'></BsArrowLeftRight><a href="">TRANSFERS</a></li>
//                  <li><BsExclamationTriangle className='icon'></BsExclamationTriangle><a href="">DAMAGE/LOOSE</a></li>
//                  <li><BsPersonCircle className='icon'></BsPersonCircle><a href="">EMPLOYEES</a></li>
//                  <li><BsBuilding className="icon"></BsBuilding><a href="">DEPARTMENTS</a></li>
//                  <li><BsPeopleFill className='icon'></BsPeopleFill><a href="">USERS</a></li>
//                  <li><BsBarChartFill className='icon'></BsBarChartFill><a href="">REPORTS</a></li>
//               </ul>
//          </nav>
      
//     </div>
//   )
// }

// export default sidebar