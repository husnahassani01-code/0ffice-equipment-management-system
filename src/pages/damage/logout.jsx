import React from 'react';

export default function Header({ onMenuClick, onLogout }) {
  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await fetch('http://localhost:8002/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {

      localStorage.removeItem('token');
      if (onLogout) {
        onLogout();
      }
    }
  };

  return (
    <header className="header">
      <button onClick={onMenuClick}>☰</button>
      <h2>Equipment Track Management System</h2>

      <button onClick={handleLogout} className="logoutBtn">
        Logout
      </button>
    </header>
  );
}