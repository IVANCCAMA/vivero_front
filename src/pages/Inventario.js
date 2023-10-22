import React, { useState } from "react";
import './inventario.css'
import '../App.css';
import SubMenuInventario from "../components/SubMenuInventario";
import { Link } from "react-router-dom";
import ProductoLista from "../components/productoLista";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input className="input1"
        type="text"
        placeholder="Buscar"
        onChange={(event) => setQuery(event.target.value)}
      />
      <i className="fas fa-search" onClick={() => onSearch(query)}></i>
    </div>
  );
}


function CategoryDropdown({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <select className="select1"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

function AddProductButton() {
  return (
    <div className="agregarproductoo">
<Link to="/inventario/producto/formProducto">
      <button  className="botonA">Agregar producto</button>
    </Link>
    </div>
  );
}

function Invetario() {
  return (
    <div className="division">
        <div>
      <p>Inventario</p>
      <SubMenuInventario /> 
    </div>
    <div className="container">
      < CategoryDropdown   categories={["Nombre", "Producto", "Tamaño"]} />
      
    
    <SearchBar onSearch={(query) => { /* Lógica de búsqueda aquí */ }} />
      <AddProductButton />
      <div> 
      </div>
    </div>
    <div className="ahi">
          <ProductoLista/>

    </div>
    </div>
  );
}

export default Invetario;
