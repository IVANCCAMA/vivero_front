import React, { useState, useEffect } from "react";
import axios from "axios";
import './productoLista.css';
import FormProducto from "./FormProducto";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function ProductoLista({ searchQuery }) {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Dependencias vacías para que se ejecute solo una vez

  const filterProducts = (query) => {
    // Primero, verifica si la consulta está vacía, y si lo está, restablece los productos
    if (!query) {
      fetchData();
      setProductoNoEncontrado(false);
    } else {
      const queryLower = query.toLowerCase();
      const filteredProductos = productos.filter((producto) => {
        const nombre = producto.nombre_producto.toLowerCase();
        const tamanio = producto.tamanio_producto.toLowerCase();
        return nombre.includes(queryLower) || tamanio.includes(queryLower);
      });

      setProductos(filteredProductos);
      setProductoNoEncontrado(filteredProductos.length === 0);
    }
  };

  const handleDelete = async (id_producto) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/productos/${id_producto}`);
      if (response.status === 200) {
        // Actualiza el estado después de eliminar el producto
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id_producto));
      } else {
        console.error("Error al eliminar el producto. Respuesta inesperada:", response);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleEditar = (producto) => {
    console.log("Handle Editar llamado con el producto:", producto);
    setProductoAEditar(producto);
    setFormularioAbierto(true);
  };

  return (
    
    <div className="listaProductos">
      <div className="container">
        <div className="search-container">
          <input
            className="input1"
            type="text"
            placeholder="Buscar"
            /* value={searchQuery} */
            onChange={(event) => filterProducts(event.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <Link to="/inventario/producto/formProducto" className="container">
        <button className="botonA">Agregar producto</button>
      </Link>
      </div>
      <div className="listaProducto">
      {productoNoEncontrado ? (
        <div className="producto-no-encontrado">
        <div className="texto">
          No se ha encontrado el producto para tu búsqueda, intenta con otro producto o agregar producto para tu inventario
        </div>
        <div className="emoji-sad">😞</div>
      </div>
      ) : (
        <table className="listaP">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock Actual</th>
              <th>Stock minimo</th>
              <th>Precio Total</th>
              <th>Tamaño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.nombre_producto}</td>
                <td>{producto.id_categoria}</td>
                <td>{producto.stok_actual_producto}</td>
                <td>{producto.stok_min_producto}</td>
                <td>{producto.precio_total_producto}</td>
                <td>{producto.tamanio_producto}</td>
                <td>
                  <Link to={`/inventario/producto/ver/${producto.id_producto}`} key={producto.id_producto}>
                    <button className="verP">Ver</button>
                  </Link>
                  <Link to={`/inventario/producto/editarProducto/${producto.id_producto}`} key={producto.id_producto}>
                    <button className="editarP" onClick={() => handleEditar(producto)}>
                      Editar
                    </button>
                  </Link>
                  <button className="borrarP" onClick={() => handleDelete(producto.id_producto)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formularioAbierto && (
        <FormProducto productoAEditar={productoAEditar} onClose={() => setFormularioAbierto(false)} />
      )}
    </div>
    </div>
  );
}

export default ProductoLista;
