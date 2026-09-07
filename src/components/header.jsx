<<<<<<< HEAD
import {
  BsJustify,
  BsPersonCircle
} from "react-icons/bs";

function Header({ onMenuClick }) {
=======
import {BsJustify, BsPersonCircle} from 'react-icons/bs'
import './header.css'


function Header({ onMenuClick, onLogout }) {
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout();
  };
  return (
    <div className="head">

      <div className="headContent">

        <div
          className="menu-button"
          onClick={onMenuClick}
        >
          <BsJustify className="icon" />
        </div>
<<<<<<< HEAD

        <div className="search">

          <input
            id="inpt"
            type="text"
            placeholder="Search here..."
          />

        </div>

        <div className="admin">

          <BsPersonCircle className="icon" />

          <p>Admin</p>

=======
        <div className='admin'>
          <BsPersonCircle className='icon'></BsPersonCircle>
          <p onClick={handleLogout} style={{cursor:"pointer"}}>Logout</p>
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c
        </div>

      </div>
<<<<<<< HEAD

=======
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c
    </div>
  );
}

<<<<<<< HEAD
export default Header;




// import {BsJustify, BsPersonCircle} from 'react-icons/bs'


// function header({ onMenuClick }) {

//   return (
//     <div className='head'>
//       <div className="headContent">
//         <div className="menu-button" onClick={onMenuClick}>
//          <BsJustify className="icon" />
//         </div>
//         <div class="search">
//           <input id="inpt" type="text" placeholder='Search here...' />
//         </div>
//         <div className='admin'>
//           <BsPersonCircle className='icon'></BsPersonCircle>
//           <p>Admin</p>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default header
=======
export default Header
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c
