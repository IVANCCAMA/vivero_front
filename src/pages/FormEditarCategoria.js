import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";

import '../App.css';
import './formcategoria.css';
import axios from 'axios';

function FormEditarCategoria() {
  const { id_categoria } = useParams();
  const [infoCategoria, setInfoCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  /* Recupera Info de la categoría */
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const responseCategoria = await axios.get(`http://localhost:4000/api/categorias/${id_categoria}`);
        const infoCategoria = responseCategoria.data;
        console.log("INFORMACION CATEGORÍA RECUPERADA:", infoCategoria);
        setInfoCategoria(infoCategoria);
      } catch (error) {
        console.error('Error al obtener la Categoría:', error);
      }
    };
    fetchCategoria();
  }, [id_categoria]);

  /* Actualizar o modificar categoría */
  const handleSubmit = async (values) => {
   /*  try {
      const { nombre_categoria, descripcion_categoria } = values;

      const response = await axios.put(`http://localhost:4000/api/categorias/${categoriaAEditar.id_categoria}`, {
        nombre_categoria,
        descripcion_categoria,
      });

      if (response.status === 200) {
        console.log("Categoría actualizada con éxito");
        // Puedes realizar otras acciones si es necesario
      } else {
        console.error("Error al actualizar la categoría. Respuesta inesperada:", response);
        // Puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Puedes mostrar un mensaje de error al usuario
    } */
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    window.history.back();
  };

  return (
    <div className="division">
      <div className="division2">
        
      <Formik
        initialValues={infoCategoria} // Establece los valores iniciales del formulario con infoCategoria
        onSubmit={handleSubmit}
      >
        <Form>
          <label className="labelC">Nombre de categoría*</label>
          <Field id="nombre_categoria" name="nombre_categoria" type="text" className="inputC" />

          <label className="labelC">Descripción (opcional)</label>
          <Field id="descripcion_categoria" name="descripcion_categoria" type="text" className="inputC" />

          <button type="submit" className="bontosave">Guardar cambios</button>
          <button type="button" className="botoncancel" onClick={handleCancelClick}>
            Cancelar
          </button>
        </Form>
      </Formik>

      </div>
    </div>
  );
};

export default FormEditarCategoria;
