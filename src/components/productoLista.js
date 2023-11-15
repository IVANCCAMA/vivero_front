import React, { useState, useEffect } from "react";
import axios from "axios";
import './productoLista.css';
import FormProducto from "./FormProducto";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import penImage from '../img/logo.png';

function ProductoLista({ searchQuery }) {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  /* const [sortedBy, setSortedBy] = useState(''); */

  useEffect(() => {
    fetchData();
  }, []); // Dependencias vacías para que se ejecute solo una vez|

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

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



//GenerarPDF
const generarPDFListaProductos = () => {
  if (productos.length>0) {
      const doc = new jsPDF();

      const imageURL = penImage;

      // Asegúrate de que las coordenadas y dimensiones sean válidas
      doc.addImage(imageURL, 'JPEG', 1, 1,25,15);

            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            doc.setFontSize(10);
            doc.text('Vivero Corazon de Bolivia', 25, 10); 
      
      // Definir formato del documento
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Lista de productos', 80, 20);
      const startY = 30;
      

      // Agregar detalles del producto usando jspdf-autotable
      const columns = ['Codigo','Nombre','Categoria','Stock actual', 'Stock minimo','Precio total','Tamaño','Fecha creacion','Fecha modificacion'];
      const data = productos.map((product) => [
          product.cod_producto,
          product.nombre_producto,
          product.id_categoria,
          product.stok_actual_producto,
          product.stok_min_producto,
          product.precio_total_producto,
          product.tamanio_producto,
          product.fecha_creacion,
          product.fecha_modificacion 
      ]);

      doc.autoTable(columns, data, {
          startY: startY,
          headStyles: {
              fillColor: [40, 84, 48] // Color verde fuerte en formato RGB
          },
          bodyStyles: {
          fillColor: [229, 217, 182] // Color verde fuerte en formato RGB 
          }
      });

      doc.save('Lista Productos.pdf');
  }
/* 
 // Ordena A - Z
 const handleSortBy = (key) => {
  const sortedProducts = [...productos];

  if (sortedBy === key) {
    sortedProducts.reverse();
  } else {
    if (key === 'nombre_producto' || key === 'id_categoria') {
      sortedProducts.sort((a, b) => a[key].localeCompare(b[key]));
    } else {
      sortedProducts.sort((a, b) => a[key] - b[key]);
    }
  }

  setProductos(sortedProducts);
  setSortedBy(key);
}; */


};
  return (
  <div>
    <div className="container">
          <input
            className="input1"
            type="text"
            placeholder="Buscar"
            /* value={searchQuery} */
            onChange={(event) => filterProducts(event.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        {/* <button onClick={() => sortedBy('nombre_producto')}>Ordenar por Nombre</button>
       */} 
        <div className="botones-A-I">
        <button className='botonPdfListaP' onClick={generarPDFListaProductos}>Imprimir</button>
        <Link to="/inventario/producto/formProducto">
            <button className="botonA">Agregar producto</button>
        </Link>
        </div>
      </div>
      
    <div className="listaProductos">
      
      <div className="listaProducto">
      {productoNoEncontrado ? (
        <div className="producto-no-encontrado">
        <div className="texto-Producto">
          No se ha encontrado el producto para tu búsqueda, intenta con otro producto o agregar producto para tu inventario
        </div>
        <div className="emoji-sad">😞</div>
      </div>
      ) : (
        <table className="listaP">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock actual</th>
              <th>Stock minimo</th>
              <th>Precio total</th>
              <th>Tamaño</th>
              <th>Fecha creacion</th>
              <th>Fecha modificacion</th>
              <th>Acciones</th> 
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.cod_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.nombre_categoria}</td>
                <td>{producto.stok_actual_producto}</td>
                <td>{producto.stok_min_producto}</td>
                <td>{producto.precio_total_producto}</td>
                <td>{producto.tamanio_producto}</td>
                <td>{producto.fecha_creacion}</td>
                <td>{producto.fecha_modificacion}</td> 
                
                <td>
                  <Link to={`/inventario/producto/ver/${producto.id_producto}`}>
                    <button className="verP">Ver</button>
                  </Link>
                  <Link to={`/inventario/producto/editarProducto/${producto.id_producto}`}>
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
   </div>
  );
}

export default ProductoLista;
