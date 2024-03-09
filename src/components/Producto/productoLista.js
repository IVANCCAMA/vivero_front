import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productoLista.scss";
import FormProducto from "./FormProducto";
import { Link } from "react-router-dom";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import logoPDF from "../../img/logo.png";
import { Icon } from "@iconify/react";

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
      const response = await axios.get(
        "https://viverobackend-production.up.railway.app/api/productos"
      );
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
      const response = await axios.delete(
        `https://viverobackend-production.up.railway.app/api/productos/${id_producto}`
      );
      if (response.status === 200) {
        // Actualiza el estado después de eliminar el producto
        setProductos((prevProductos) =>
          prevProductos.filter(
            (producto) => producto.id_producto !== id_producto
          )
        );
      } else {
        console.error(
          "Error al eliminar el producto. Respuesta inesperada:",
          response
        );
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
    if (productos.length > 0) {
      const doc = new jsPDF();

      const imageURL = logoPDF;

      // Asegúrate de que las coordenadas y dimensiones sean válidas
      doc.addImage(imageURL, "JPEG", 1, 1, 25, 15);

      // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
      doc.setFontSize(10);
      doc.text("Vivero Corazon de Bolivia", 25, 10);
      doc.text("NIT 5243380015", 25, 15);

      doc.text("PASCUAL CHAMBI DOMINGO", 130, 10);
      doc.text("CALLE INNOMINADA NRO.", 130, 15);
      doc.text("SN ZONA/BARRIO:", 130, 20);
      doc.text("TUSCAPUGIO ALTO COCHABAMBA", 130, 25);

      // Definir formato del documento
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Lista de productos", 80, 40);
      const startY = 50;

      // Agregar detalles del producto usando jspdf-autotable
      const columns = [
        "Codigo",
        "Nombre",
        "Categoria",
        "Stock actual",
        "Stock minimo",
        "Precio total",
        "Tamaño",
        "Fecha creacion",
        "Fecha modificacion",
      ];
      const data = productos.map((product) => [
        product.cod_producto,
        product.nombre_producto,
        product.id_categoria,
        product.stok_actual_producto,
        product.stok_min_producto,
        product.precio_total_producto,
        product.tamanio_producto,
        product.fecha_creacion,
        product.fecha_modificacion,
      ]);

      doc.autoTable(columns, data, {
        startY: startY,
        headStyles: {
          fillColor: [40, 84, 48], // Color verde fuerte en formato RGB
        },
        bodyStyles: {
          fillColor: [229, 217, 182], // Color verde fuerte en formato RGB
        },
      });

      doc.save("Lista Productos.pdf");
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
        <div className="col-8 px-auto pb-2">
          <form class="d-flex" role="search">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
              onChange={(event) => filterProducts(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row btn-Categorias text-end">
          <div className="col">
          <button
          className="btn btn-secondary mb-2"
          onClick={generarPDFListaProductos}
        >
          <Icon
            icon="line-md:download-loop"
            color="white"
            width="26"
            height="24"
            onClick={generarPDFListaProductos}
          />
          Descargar PDF
        </button>
        <Link
          to="/inventario/producto/formProducto"
          className="btn btn-success ms-2 mb-2"
        >
          <Icon
                  icon="gridicons:create"
                  color="white"
                  width="26"
                  height="24"
                />  
          Crear producto
        </Link>
          </div>
        </div>
      </div>
      <div className="listaProductos">
        <div className="listaProducto">
          {productoNoEncontrado ? (
            <div className="producto-no-encontrado">
              <div className="texto-Producto">
                No se ha encontrado el producto para tu búsqueda, intenta con
                otro producto o agregar producto para tu inventario
              </div>
              <div className="emoji-sad">😞</div>
            </div>
          ) : (
            <div className="table-responsive pb-5">
              <table className="table">
                <thead>
                  <tr className="listaCat">
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Stock actual</th>
                    <th scope="col">Stock minimo</th>
                    <th scope="col">Precio total</th>
                    <th scope="col">Tamaño</th>
                    <th scope="col">Fecha creacion</th>
                    <th scope="col">Fecha modificacion</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id_producto}>
                      <th scope="row">{producto.cod_producto}</th>
                      <td>{producto.nombre_producto}</td>
                      <td>{producto.nombre_categoria}</td>
                      <td>{producto.stok_actual_producto}</td>
                      <td>{producto.stok_min_producto}</td>
                      <td>{producto.precio_total_producto}</td>
                      <td>{producto.tamanio_producto}</td>
                      <td>{producto.fecha_creacion}</td>
                      <td>{producto.fecha_modificacion}</td>
                      <td className="d-flex align-items-center">
                        <Link className="btn btn-dark verP"
                          to={`/inventario/producto/ver/${producto.id_producto}`}
                        >
                            <Icon
                              className="icon"
                              icon="carbon:view-filled"
                              color="white"
                              width="18"
                              height="18"
                            />
                            Ver
                        </Link>
                        <Link
                          to={`/inventario/producto/editarProducto/${producto.id_producto}`}
                          className="btn btn-warning me-2 editarP ms-2"
                            onClick={() => handleEditar(producto)}
                        >
                            <Icon
                              className="icon mb-1"
                              icon="mdi:edit"
                              color="white"
                              width="18"
                              height="18"
                            />
                            Editar
                        </Link>
                        <button
                        type="button"
                          className="btn btn-danger borrarP"
                          onClick={() => handleDelete(producto.id_producto)}
                        >
                          <Icon
                            className="icon mb-1"
                            icon="material-symbols:delete"
                            color="white"
                            width="18"
                            height="18"
                          />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {formularioAbierto && (
            <FormProducto
              productoAEditar={productoAEditar}
              onClose={() => setFormularioAbierto(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoLista;
