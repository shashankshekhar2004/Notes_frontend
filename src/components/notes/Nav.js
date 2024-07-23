import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header className="nav-header">
      <div className='logo'>
        <h1><Link to="/">Notes App</Link></h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Note</Link></li>
        <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
      </ul>
    </header>
  );
}

export default Nav;
