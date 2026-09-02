import { useState } from 'react';
import Header from './components/header'
import Sidebar from './components/sidebar'
import Login from './pages/login'
import Main from './pages/main'
import Stock from './pages/stock'
import Receiving from './pages/Receiving'
import Issuing from './pages/Issuing'
import Returns from './pages/Return'
import Departments from './pages/Department'
import './App.css'

function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//    const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
  const [activePage, setActivePage] = useState("main");
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
      <Sidebar setActivePage={setActivePage} activePage={activePage}/>
      <Header onMenuClick={toggleSidebar}/>
      <main className="appPage">
        {activePage === "main" && <Main />}
        {activePage === "stock" && <Stock />}
        {activePage === "receiving" && <Receiving />}
        {activePage === "issuing" && <Issuing />}
        {activePage === "returns" && <Returns />}
        {activePage === "departments" && <Departments />}
      </main>
    </div>
  );
}

export default App
