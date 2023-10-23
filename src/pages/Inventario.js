import React from "react";
import './inventario.css';
import '../App.css';
import SubMenuInventario from "../components/SubMenuInventario";
import { Link } from "react-router-dom";
import ProductoLista from "../components/productoLista";

function Inventario() {

  return (
    <div className="division">
      <div>
        <p className="Inventario">Inventario</p>
        <SubMenuInventario />
      </div>
      <Link to="/inventario/producto/formProducto" className="container">
        <button className="botonA">Agregar producto</button>
      </Link>
      <div className="ahi">
        <ProductoLista />
      </div>
    </div>
  );
}

export default Inventario;
