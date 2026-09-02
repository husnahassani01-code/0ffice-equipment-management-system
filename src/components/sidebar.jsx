import { BsHouseFill, BsBarChartFill, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, BsPeopleFill,
   BsBuilding, BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck,BsFillEnvelopeFill} from 'react-icons/bs'
   import logo from "../assets/logo.png"
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
                 <li onClick={() => setActivePage("dashboard")}><BsHouseFill className="icon"></BsHouseFill><a href="main.jsx" onClick={() => setActivePage("dashboard")}>DASHBORD</a></li>
                 <li><BsBoxes className='icon'></BsBoxes><a href="" onClick={() => setActivePage("assets")}>ASSETS</a></li>
                 <li  onClick={() => setActivePage("stock")}><BsBoxSeam className='icon'></BsBoxSeam><a href="">STOCK</a></li>
                 <li><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a href="">RECEIVING</a></li>
                 <li><BsClipboardCheck className='icon'></BsClipboardCheck><a href="">ISSURING</a></li>
                 <li><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a href="">RETURNS</a></li>
                 <li><BsArrowLeftRight className='icon'></BsArrowLeftRight><a href="">TRANSFERS</a></li>
                 <li><BsExclamationTriangle className='icon'></BsExclamationTriangle><a href="">DAMAGE/LOOSE</a></li>
                 <li><BsPersonCircle className='icon'></BsPersonCircle><a href="">EMPLOYEES</a></li>
                 <li><BsBuilding className="icon"></BsBuilding><a href="">DEPARTMENTS</a></li>
                 <li><BsPeopleFill className='icon'></BsPeopleFill><a href="">USERS</a></li>
                 <li><BsBarChartFill className='icon'></BsBarChartFill><a href="">REPORTS</a></li>
              </ul>
         </nav>
      
    </div>
  )
}

export default sidebar