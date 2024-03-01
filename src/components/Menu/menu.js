import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";

const Menu = () => {
  const location = useLocation();
  const rutasParaOcultarMenu = ["/inventario/producto/formProducto"];
  const ocultarMenu = rutasParaOcultarMenu.includes(location.pathname);
  const { dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [isLightTheme, setIsLightTheme] = useState(
    !localStorage.getItem("light")
  );

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
  };

  return (
    <div className="wrapper">
      {!ocultarMenu && <div className="menu-lateral"></div>}
      <aside
        id="sidebar"
        className={`js-sidebar ${isLightTheme ? "" : "collapsed"}`}
      >
        <div className="h-100">
          <ul className="menu-list">
            <li className="menu-listM">
              <Link to="/" className="menu-link">
                <i className="fa-solid fa-house"></i> Inicio
              </Link>
            </li>
            <li className="menu-listM">
              <Link to="/inventario/producto" className="menu-link bg-cyan">
                <i className="fa-solid fa-seedling"></i> Inventario
              </Link>
            </li>
            <li className="menu-listM">
              <Link to="/usuarios" className="menu-link bg-cyan">
                <i className="fa-solid fa-users"></i> Usuarios
              </Link>
            </li>
            <li className="menu-listM">
              <Link to="/transacciones" className="menu-link bg-cyan">
                <i className="fa-solid fa-layer-group"></i> Transacciones
              </Link>
            </li>
            <li className="menu-listM">
              <Link to="/reportes" className="menu-link bg-cyan">
                <i className="fa-solid fa-signal"></i> Reportes
              </Link>
            </li>
            <li className="cerrarSesion">
              <Link to="/" className="menu-link bg-cyan" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Menu;
