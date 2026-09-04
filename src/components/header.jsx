import {BsJustify, BsPersonCircle} from 'react-icons/bs'
import './header.css'


function Header({ onMenuClick, onLogout }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout();
  };
  return (
    <div className='head'>
      <div className="headContent">
        <div className="menu-button" onClick={onMenuClick}>
         <BsJustify className="icon" />
        </div>
        <div className='admin'>
          <BsPersonCircle className='icon'></BsPersonCircle>
          <p onClick={handleLogout} style={{cursor:"pointer"}}>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Header