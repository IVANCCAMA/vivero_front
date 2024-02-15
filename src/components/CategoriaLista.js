import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategoria from "../pages/Formcategoria";
import { Link } from "react-router-dom";
import "./CategoriaLista.css";
import { Icon } from '@iconify/react';

const CategoriaLista = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://viverobackend-production.up.railway.app/api/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id_categoria) => {
    console.log("ID de categoría a eliminar:", id_categoria);
    // Realiza la solicitud de eliminación con el ID de la categoría
    axios
      .delete(`https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`)
      .then((response) => {
        if (response.status === 200) {
          // Actualiza el estado después de eliminar la categoría
          setCategorias(categorias.filter((categoria) => categoria.id_categoria !== id_categoria));
        } else {
          console.error("Error al eliminar la categoría. Respuesta inesperada:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
      });
  };

  const handleEditar = (categoria) => {
    console.log("Handle Editar llamado con la categoría:", categoria);
    setCategoriaAEditar(categoria);
    setFormularioAbierto(true);
  };

  return (
    <div className="listaCategoria">
      <table className="listaCat">
        <thead>
          <tr>
            <th>Nombre de la Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td className="listaCat1">{categoria.nombre_categoria}</td>
              <td className="descripcionCC">{categoria.descripcion_categoria}</td>
              <td className="botonCRUD">
              <Link to={`/inventario/categoria/editarCategoria/${categoria.id_categoria}`} key={categoria.id_categoria}>
                  <button
                  className="editar" onClick={() => handleEditar(categoria)}>
                  <Icon className="icon" icon="mdi:edit" color="white" width="20" height="20" />
                    Editar
                  </button>
                </Link>
                <button className="Botonborrar" onClick={() => handleDelete(categoria.id_categoria)}>
                <Icon className="icon" icon="material-symbols:delete" color="white" width="20" height="20"/>
                  Eliminar
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formularioAbierto && (
        <FormCategoria categoriaAEditar={categoriaAEditar} onClose={() => setFormularioAbierto(false)} />
      )}
    </div>
  );
};

export default CategoriaLista;
