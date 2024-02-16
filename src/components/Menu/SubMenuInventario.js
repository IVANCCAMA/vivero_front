import './submenu.css'
import React from 'react';
import { Link } from 'react-router-dom';

function SubMenuInventario() {
  return (
    
        <div className="submenu">
          <div className="sub-menu">
          <Link to="/inventario/producto">
            <button className="botonC">Producto</button>
          </Link>
          <Link to="/inventario/categoria">
            <button className="botonC">Categoría</button>
          </Link>
        </div>
    </div>
  );
}

export default SubMenuInventario;
