import { BsHouseFill, BsBarChartFill, BsExclamationTriangle, BsPersonCircle, BsBoxSeam, BsPeopleFill,
   BsBuilding, BsBoxes, BsArrowLeftRight, BsArrowReturnLeft,BsClipboardCheck,BsFillEnvelopeFill} from 'react-icons/bs'
   import logo from "../assets/logo.png"
  //  import {useState} from "react"
   
function Sidebar({ setActivePage, activePage }) {
  

  return (
    <div className='asides'>
         <div className="logo">
                <img src={logo} alt="" id='sdImage'/>
                <h3>Equipment Track Management</h3>
          </div>
         <nav className="navigation">
             <ul>
                 <li className={activePage === "main" ? "activeNav" : ""} onClick={() => setActivePage("main")}><BsHouseFill className="icon"></BsHouseFill><a href="#" onClick={(event) => event.preventDefault()}>DASHBOARD</a></li>
                 <li><BsBoxes className='icon'></BsBoxes><a href="" onClick={() => setActivePage("assets")}>ASSETS</a></li>
                 <li className={activePage === "stock" ? "activeNav" : ""} onClick={() => setActivePage("stock")}><BsBoxSeam className='icon'></BsBoxSeam><a href="#" onClick={(event) => event.preventDefault()}>STOCK</a></li>
                 <li className={activePage === "receiving" ? "activeNav" : ""} onClick={() => setActivePage("receiving")}><BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill><a href="#" onClick={(event) => event.preventDefault()}>RECEIVING</a></li>
                 <li className={activePage === "issuing" ? "activeNav" : ""} onClick={() => setActivePage("issuing")}><BsClipboardCheck className='icon'></BsClipboardCheck><a href="#" onClick={(event) => event.preventDefault()}>ISSUING</a></li>
                 <li className={activePage === "returns" ? "activeNav" : ""} onClick={() => setActivePage("returns")}><BsArrowReturnLeft className='icon'></BsArrowReturnLeft><a href="#" onClick={(event) => event.preventDefault()}>RETURNS</a></li>
                 <li><BsArrowLeftRight className='icon'></BsArrowLeftRight><a href="">TRANSFERS</a></li>
                 <li><BsExclamationTriangle className='icon'></BsExclamationTriangle><a href="">DAMAGE/LOOSE</a></li>
                 <li><BsPersonCircle className='icon'></BsPersonCircle><a href="">EMPLOYEES</a></li>
                 <li className={activePage === "departments" ? "activeNav" : ""} onClick={() => setActivePage("departments")}><BsBuilding className="icon"></BsBuilding><a href="#" onClick={(event) => event.preventDefault()}>DEPARTMENTS</a></li>
                 <li><BsPeopleFill className='icon'></BsPeopleFill><a href="">USERS</a></li>
                 <li><BsBarChartFill className='icon'></BsBarChartFill><a href="">REPORTS</a></li>
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