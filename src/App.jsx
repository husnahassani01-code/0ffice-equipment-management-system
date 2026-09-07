import { useState } from 'react';
<<<<<<< HEAD
import Header from './components/header'
import Sidebar from './components/sidebar'
import Login from './pages/login'
import Main from './pages/main'
import Stock from './pages/stock'
import Receiving from './pages/Receiving'
import Issuing from './pages/Issuing'
import Returns from './pages/Return'
import Departments from './pages/Department'
import Transfer from './pages/transfer'
import DamageLoss from './pages/damage/damage_loss'

import './App.css'

function App() {
  //   const [sidebarOpen, setSidebarOpen] = useState(true);
  //    const toggleSidebar = () => {
  //     setSidebarOpen(!sidebarOpen);
  //   };
  const [activePage, setActivePage] = useState("main");
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Stock from './pages/stock';
import Assets from './pages/assets';
import Employee from './pages/employee';
import Receiving from './pages/receiving';
import Issuing from './pages/issuing';
import './App.css'

function App() {
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
<<<<<<< HEAD
    <div className={`mainContainer ${sidebarOpen ? "sidebarOpen" : "sidebarClosed"}`}>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <Header onMenuClick={toggleSidebar} />
      <main className="appPage">
        {activePage === "main" && <Main />}
        {activePage === "stock" && <Stock />}
        {activePage === "receiving" && <Receiving />}
        {activePage === "issuing" && <Issuing />}
        {activePage === "returns" && <Returns />}
        {activePage === "departments" && <Departments />}
        {activePage === "transfer" && <Transfer />}
        {activePage === "damage" && <DamageLoss />}
      </main>
    </div>
  );
=======
    <BrowserRouter>
     <div className= {`mainContainer ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <Header onMenuClick={toggleSidebar}  onLogout={handleLogout}/>
        <Sidebar sidebarOpen={sidebarOpen}
          setActivePage={setActivePage}/>
        <main className='pageContent'>
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "stock" && <Stock />}
          {activePage === "assets" && <Assets />}
          {activePage === "employee" && <Employee />}
          {activePage === "receiving" && <Receiving />}
          {activePage === "issuing" && <Issuing />}


        </main>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
      </div>
    </BrowserRouter>
  )
>>>>>>> 894444045000230c6e5ffacc4a851fc6c568499c
}

export default App
