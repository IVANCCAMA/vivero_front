import React from "react";
import "./inventario.css";
import "../../App.css";
import SubMenuInventario from "../../components/Menu/SubMenuInventario";
import ProductoLista from "../../components/Producto/productoLista";
function Inventario() {
  return (
    <div className="main-inventario">
      <div>
        <h5 className="Inventario ms-2">Inventario</h5>
        <SubMenuInventario />
      </div>
      <div className="ahi">
        <ProductoLista />
      </div>
    </div>
  );
}

export default Inventario;
