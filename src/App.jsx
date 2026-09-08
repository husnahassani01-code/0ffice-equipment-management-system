import { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/assets';
import Employee from './pages/employee';
import Users from './pages/user';
import Stock from './pages/stock';
import Receiving from './pages/Receiving';
import Issuing from './pages/Issuing';
import Returns from './pages/Return';
import Departments from './pages/department';
import Transfer from './pages/transfer';
import DamageLoss from './pages/damage/damage_loss';

import './App.css';
// import Receiving from './pages/receiving';
// import Issuing from './pages/issuing';
import Department from './pages/department';
import Report from './pages/report';
import './App.css'


function App() {
    const [activePage, setActivePage] = useState('main');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen((isOpen) => !isOpen);
    };

    if (!isLoggedIn) {
        return <Login onLogin={() => setIsLoggedIn(true)} />;
    }

    return (
        <div className={`mainContainer ${sidebarOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
            <Sidebar setActivePage={setActivePage} activePage={activePage} />
            <Header onMenuClick={toggleSidebar} />
            <main className="appPage">
                {activePage === 'main' && <Dashboard />}
                {activePage === 'assets' && <Assets />}
                {activePage === 'employee' && <Employee />}
                {activePage === 'users' && <Users />}
                {activePage === 'stock' && <Stock />}
                {activePage === 'receiving' && <Receiving />}
                {activePage === 'issuing' && <Issuing />}
                {activePage === 'returns' && <Returns />}
                {activePage === 'departments' && <Departments />}
                {activePage === 'transfer' && <Transfer />}
                {activePage === 'damage' && <DamageLoss />}
            </main>
        </div>
    );

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
          {activePage === "department" && <Department />}
          {activePage === "report" && <Report />}

        </main>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
