import { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Stock from './pages/stock';
import Assets from './pages/assets';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className= {`mainContainer ${sidebarOpen ? "sidebarOpen" : ""}`}>
      <Header onMenuClick={toggleSidebar}/>
      <Sidebar sidebarOpen={sidebarOpen}
        setActivePage={setActivePage}/>
      <main className='pageContent'>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "stock" && <Stock />}
        {activePage === "assets" && <Assets />}
      </main>
    </div>
  )
}

export default App
