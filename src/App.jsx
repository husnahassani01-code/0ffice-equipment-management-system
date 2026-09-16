import { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Register from './register';
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

function App() {
  const [activePage, setActivePage] = useState('main');
  const [authPage, setAuthPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((isOpen) => !isOpen);
  };

  if (!isLoggedIn) {
    if (authPage === 'register') {
      return <Register onSwitchToLogin={() => setAuthPage('login')} />;
    }
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onSwitchToRegister={() => setAuthPage('register')}
      />
    );
  }

  return (
    <div className={`mainContainer ${sidebarOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <Header onMenuClick={toggleSidebar} onLogout={() => setIsLoggedIn(false)} />
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
}

export default App;