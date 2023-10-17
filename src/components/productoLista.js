import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategoria from "./FormProducto";
import { Link } from "react-router-dom";

const ProductoLista = () => {
  const [productos, setProductos] = useState([]);
  /* const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false); */

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
    // Realiza la solicitud de eliminación con el ID de la categoría
    axios.delete(`http://localhost:4000/api/productos/${id_producto}`)
      .then((response) => {
        if (response.status === 200) {
          // Actualiza el estado después de eliminar la categoría
          setProductos(productos.filter((producto) => producto.id_producto !== id_producto));
        } else {
          console.error("Error al eliminar el producto. Respuesta inesperada:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  }; 

  /* const handleEditar = (categoria) => {
    console.log("Handle Editar llamado con la categoría:", categoria);
    setCategoriaAEditar(categoria);
    setFormularioAbierto(true);
  }; */

  return (
    <div className="listaCat">
      <table className="listaCat">
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td className="">{producto.nombre_producto}</td>
              <td className="">{producto.id_categoria}</td>
              <td className="">{producto.stok_actual_producto}</td>
              <td className="">{producto.precio_total_producto}</td>
              <td className="">{producto.tamanio_producto}</td>

              
               <td className="botones2">
                <button className="borrar" onClick={() => handleDelete(producto.id_producto)}>Borrar</button>
               {/*  <Link to={`/inventario/categoria/editarCategoria/${producto.id_producto}`} key={categoria.id_categoria}>
                  <button className="editar" onClick={() => handleEditar(categoria)}>
                    Editar
                  </button>
                </Link> */}
              </td> 
            </tr>
          ))}
        </tbody>
      </table>

      {/* {formularioAbierto && (
        <FormCategoria
          categoriaAEditar={categoriaAEditar}
          onClose={() => setFormularioAbierto(false)}
        />
      )} */}
    </div>
  );
};

export default ProductoLista;
