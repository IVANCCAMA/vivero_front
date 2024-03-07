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
        <div className="d-flex flex-column flex-shrink-0 margin-5 ">
          <ul className="menu-list">
            <li>
              <Link to="/" className="sidebar-link">
                <i className="fa-solid fa-house"></i> Inicio
              </Link>
            </li>
            <li>
              <Link to="/inventario/producto" className="sidebar-link">
                <i className="fa-solid fa-seedling"></i> Inventario
              </Link>
            </li>
            <li>
              <Link to="/usuarios" className="sidebar-link ">
                <i className="fa-solid fa-users"></i> Usuarios
              </Link>
            </li>
            <li>
              <Link to="/transacciones" className="sidebar-link">
                <i className="fa-solid fa-layer-group"></i> Transacciones
              </Link>
            </li>
            <li>
              <Link to="/reportes" className="sidebar-link">
                <i className="fa-solid fa-signal"></i> Reportes
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link to="/" className="menu-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Cerrar Sesion</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Menu;
