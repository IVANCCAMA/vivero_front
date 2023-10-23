import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu.css';


function Menu() {
    const location = useLocation();
    const rutasParaOcultarMenu = ["/inventario/producto/formProducto"];
    const ocultarMenu = rutasParaOcultarMenu.includes(location.pathname);

    return (
        <div className="sidebar">
            {!ocultarMenu && (
                <div className="menu-lateral">
                </div>
            )}
            <ul className="menu-list">
                <li>
                    <Link to="/" className="menu-link">
                        <i className="fa-solid fa-house"></i> Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/inventario/producto" className="menu-link bg-cyan">
                        <i className="fa-solid fa-seedling"></i> Inventario
                    </Link>
                </li>
                <li>
                    <Link to="/empleados" className="menu-link bg-cyan">
                        <i className="fa-solid fa-users"></i> Empleados
                    </Link>
                </li>
                <li>
                    <Link to="/transacciones" className="menu-link bg-cyan">
                        <i className="fa-solid fa-layer-group"></i> Transacciones
                    </Link>
                </li>
                <li>
                    <Link to="/reportes" className="menu-link bg-cyan">
                        <i className="fa-solid fa-signal"></i> Reportes
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
