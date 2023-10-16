
import './submenu.css'
import React from 'react';
import { Link } from 'react-router-dom';


function SubMenuInventario() {
  return (
    <div className="sub-menu">
      <ul className="sub-menu-list">
        <li className='producto'>
          <Link to="/inventario/producto">Producto</Link>
        </li>
        <li className='categoria'>
          <Link to="/inventario/categoria">Categoría</Link>
        </li>
      </ul>
    </div>
  );
}

export default SubMenuInventario;

