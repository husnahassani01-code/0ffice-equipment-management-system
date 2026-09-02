import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Receiving from "./pages/Receiving";
import Issuing from "./pages/Issuing";
import Returns from "./pages/Return";
import Departments from "./pages/Department";

import "./App.css";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [currentPage, setCurrentPage] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`mainContainer ${
        sidebarOpen ? "sidebarOpen" : "sidebarClosed"
      }`}
    >

      <Sidebar setCurrentPage={setCurrentPage} />

      <Header onMenuClick={toggleSidebar} />

      <div className="pageArea">

        {currentPage === "Dashboard" && <Dashboard />}

        {currentPage === "Receiving" && <Receiving />}

        {currentPage === "Issuing" && <Issuing />}

        {currentPage === "Returns" && <Returns />}

        {currentPage === "Departments" && <Departments />}

      </div>

    </div>
  );
}

export default App;










// import { useState } from 'react';
// import Sidebar from './components/sidebar'
// import Main from './components/main'
// import Header from './components/header'
// import Stock from './components/stock'
// import Receiving from './pages/Receiving'

// import './App.css'

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//    const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className= {`mainContainer ${sidebarOpen ? "sidebarOpen" : "sidebarClosed"}`}>
//       <Sidebar/>
//       <Header onMenuClick={toggleSidebar} />
//       <Main/>
//       <Stock/>
//       <Receiving/>
//     </div>
//   )
// }


// export default App
