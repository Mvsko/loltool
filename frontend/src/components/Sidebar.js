import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>LoLTool</h2>
      </div>
      <ul className="menu">
        <li>
          <Link to="/" className='menu-link'>Accueil</Link>
        </li>
        <li>
          <Link to="/documentation" className='menu-link'>Documentation</Link>
        </li>
        <li className="has-submenu">
          Fonctionnalités
          <ul className="submenu">
            <li><Link to="/features" className='menu-link'>Datacreate</Link></li>
            <li><Link to="/dataall" className='menu-link'>DataAll</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/settings" className='menu-link'>Paramètres</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;