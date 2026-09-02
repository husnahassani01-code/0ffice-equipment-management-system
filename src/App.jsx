import { useState } from 'react';
import Header from './components/header'
import Sidebar from './components/sidebar'
import Login from './pages/login'
import Main from './pages/main'
import Stock from './pages/stock'
import './App.css'

function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//    const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
  const [activePage, setActivePage] = useState("main");
    <div className="navigation">
      {activePage === "dashboard" && <Main />}
      {activePage === "stock" && <Stock />}
      {/* {activePage === "assets" && <Assets />} */}
    </div>

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className= {`mainContainer ${sidebarOpen ? "sidebarOpen" : "sidebarClosed"}`}>
      <Sidebar onClick={() => setActivePage("dashboard")}/>
      <Header onMenuClick={toggleSidebar}/>
      <Main/>
      <Stock/>
      {/* <Assets/>  */}
    </div>
  )
}

export default App
