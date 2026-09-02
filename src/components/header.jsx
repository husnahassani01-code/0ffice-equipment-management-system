import {
  BsJustify,
  BsPersonCircle
} from "react-icons/bs";

function Header({ onMenuClick }) {

  return (
    <div className="head">

      <div className="headContent">

        <div
          className="menu-button"
          onClick={onMenuClick}
        >
          <BsJustify className="icon" />
        </div>

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

        </div>

      </div>

    </div>
  );
}

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