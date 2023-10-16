import React, { useState } from "react";
import './inventario.css'
import '../App.css';
import SubMenuInventario from "../components/SubMenuInventario";
import { Link } from "react-router-dom";


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
    <table className="inventory-table">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Tamaño</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>Categoría 1</td>
              <td>10</td>
              <td>$20.00</td>
              <td>Tamaño 1</td>
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>Categoría 2</td>
              <td>5</td>
              <td>$15.00</td>
              <td>Tamaño 2</td>
            </tr>
            {/* Agrega descripciones debajo de los datos */}
            <tr>
              <td>Descripción de Producto 1</td>
              <td>Descripción de Categoría 1</td>
              <td>Descripción de Stock 1</td>
              <td>Descripción de Precio 1</td>
              <td>Descripción de Tamaño 1</td>
            </tr>
            
          </tbody>
        </table>

    </div>
    </div>
  );
}

export default Invetario;
