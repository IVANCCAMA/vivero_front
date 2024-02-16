import React from "react";
import './inventario.css';
import '../../App.css';
import SubMenuInventario from "../../components/SubMenuInventario";
import ProductoLista from "../../components/productoLista";

function Inventario() {

  return (
    <div className="">
      <div>
        <h5 className="Inventario">Inventario</h5>
        <SubMenuInventario />
      </div>
      <div className="ahi">
        <ProductoLista />
      </div>
    </div>
  );
}

export default Inventario;
