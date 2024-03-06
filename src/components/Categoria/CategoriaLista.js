import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategoria from "../../pages/FormCategoriaPage/Formcategoria";
import { Link } from "react-router-dom";
import "./CategoriaLista.scss";
import { Icon } from "@iconify/react";

const CategoriaLista = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://viverobackend-production.up.railway.app/api/categorias"
        );
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
      .delete(
        `https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`
      )
      .then((response) => {
        if (response.status === 200) {
          // Actualiza el estado después de eliminar la categoría
          setCategorias(
            categorias.filter(
              (categoria) => categoria.id_categoria !== id_categoria
            )
          );
        } else {
          console.error(
            "Error al eliminar la categoría. Respuesta inesperada:",
            response
          );
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
    <div className="listaCategoria table-responsive pb-5">
      <table className="listaCat table">
        <thead>
          <tr>
            <th scope="col" >Nombre de la Categoría</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.nombre_categoria}</td>
              <td >{categoria.descripcion_categoria}</td>
              <td >
                <div className="d-flex align-items-center">
                  <Link
                    className="btn btn-warning me-2"
                    role="button"
                    to={`/inventario/categoria/editarCategoria/${categoria.id_categoria}`}
                    key={categoria.id_categoria}
                  >
                    <Icon
                      icon="tabler:edit"
                      width="18"
                      height="18"
                      className="mb-1"
                    />
                    Editar
                  </Link>
                  <button type="button" className="btn btn-danger">
                    <Icon
                      icon="material-symbols:delete-sharp"
                      width="18"
                      height="18"
                      className="mb-1"
                    />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formularioAbierto && (
        <FormCategoria
          categoriaAEditar={categoriaAEditar}
          onClose={() => setFormularioAbierto(false)}
        />
      )}
    </div>
  );
};
export default CategoriaLista;
