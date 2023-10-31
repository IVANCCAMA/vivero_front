import React from "react";
import './inventario.css';
import '../App.css';
import SubMenuInventario from "../components/SubMenuInventario";
import ProductoLista from "../components/productoLista";

function Inventario() {

  return (
    <div className="">
      <div>
        <p className="Inventario">Inventario</p>
        <SubMenuInventario />
      </div>
      <div className="ahi">
        <ProductoLista />
      </div>
    </div>
  );
}

export default Inventario;
