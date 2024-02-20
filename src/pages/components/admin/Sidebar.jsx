import React from 'react';
import { useNavigate } from 'react-router-dom'; 


const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleItemClick = (path) => {
    navigate(path); 
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        GameSpeak
      </div>
      <ul className="sidebar-menu">
        <li onClick={() =>handleItemClick ('/admin')}>Dashboard</li>
        <li onClick={() => handleItemClick('/admin/words')}>Mots</li>
        <li onClick={() => handleItemClick('/admin/categories')}>Catégories</li>
        <li onClick={() => handleItemClick('/admin/users')}>Users</li>
      </ul>
    </div>
  );
};

export default Sidebar;