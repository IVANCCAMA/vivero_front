import React, { useState, useEffect } from "react";
import axios from "axios";
import FormProducto from "./FormProducto"; // Assuming FormProducto is the correct component
import { Link } from "react-router-dom";
import "./productoLista.css";

const ProductoLista = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id_producto) => {
    console.log("ID de producto a eliminar:", id_producto);
    // Realiza la solicitud de eliminación con el ID del producto
    axios
      .delete(`http://localhost:4000/api/productos/${id_producto}`)
      .then((response) => {
        if (response.status === 200) {
          // Actualiza el estado después de eliminar el producto
          setProductos(productos.filter((producto) => producto.id_producto !== id_producto));
        } else {
          console.error("Error al eliminar el producto. Respuesta inesperada:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  const handleEditar = (producto) => {
    console.log("Handle Editar llamado con el producto:", producto);
    setProductoAEditar(producto);
    setFormularioAbierto(true);
  };

  return (
    <div className="listaProducto">
      <table className="listaP">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock Actual</th>
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
              <td>{producto.stock_actual_producto}</td>
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

      {formularioAbierto && (
        <FormProducto productoAEditar={productoAEditar} onClose={() => setFormularioAbierto(false)} />
      )}
    </div>
  );
};

export default ProductoLista;
