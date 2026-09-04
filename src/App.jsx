import { useState } from 'react';
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
}

export default App
