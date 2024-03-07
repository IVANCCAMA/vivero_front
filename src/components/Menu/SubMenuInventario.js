import "./submenu.css";
import React from "react";
import { Link } from "react-router-dom";

function SubMenuInventario() {
  return (
    <div className="container">
      <div className="row">
        <div className="col pb-5">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className="nav-link botonC"
                aria-current="page"
                to="/inventario/producto"
              >
                Producto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link botonC"
                to="/inventario/categoria"
              >
                Categoría
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubMenuInventario;
