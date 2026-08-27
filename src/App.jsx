import { useState } from 'react';
import Sidebar from './components/sidebar'
import Main from './components/main'
import Header from './components/header'

import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
   const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className= {`mainContainer ${sidebarOpen ? "sidebarOpen" : "sidebarClosed"}`}>
    <Sidebar/>
      <Header onMenuClick={toggleSidebar} />
      <Main/>
      
    </div>
  )
}


export default App
