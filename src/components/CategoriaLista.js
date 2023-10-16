import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategoria from "../pages/Formcategoria"; // Importa el formulario de creación

const CategoriaLista = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/categorias");
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
    axios.delete(`http://localhost:4000/api/categorias/${id_categoria}`)
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
    console.log("Handle Editar llamado con la categoría:", categoria); // Agrega este console.log
    setCategoriaAEditar(categoria);
    setFormularioAbierto(true);
  };

  return (
    <div className="listaCat">
      <table className="listaCat">
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td className="listaCat1">{categoria.nombre_categoria}</td>
              <td className="descripcionCC">{categoria.descripcion_categoria}</td>
              
              <td className="botones2">
                <button className="borrar" onClick={() => handleDelete(categoria.id_categoria)}>Borrar</button>
                <button
                  className="editar"
                  onClick={() => {
                    console.log("Categoría a editar:", categoria);
                    handleEditar(categoria);
                  }}
                >
                  Editar
                </button>
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
