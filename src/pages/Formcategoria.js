import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import '../App.css';
import './formcategoria.css';
import axios from 'axios';

const FormCategoria = ({ categoriaAEditar }) => {
  const [nombre_categoria, setNombreCategoria] = useState("");
  const [descripcion_categoria, setDescripcionCategoria] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const obtenerCategoriaPorId = async (id_categoria) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/categorias/${id_categoria}`);
      const categoria = response.data;
      setNombreCategoria(categoria.nombre_categoria);
      setDescripcionCategoria(categoria.descripcion_categoria);
      setModoEdicion(true); 
    } catch (error) {
      console.error("Error al obtener los datos de la categoría:", error);
    }
  };

  useEffect(() => {
    if (categoriaAEditar) {
      obtenerCategoriaPorId(categoriaAEditar.id_categoria);
    }
  }, [categoriaAEditar]);

  const handleSubmit = async (values) => {
    try {
      const { nombre_categoria, descripcion_categoria } = values;

      if (modoEdicion) {
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
      } else {
        // Estás en modo de creación, realiza una solicitud POST para crear la categoría
        const response = await axios.post('http://localhost:4000/api/categorias', {
          nombre_categoria,
          descripcion_categoria,
        });

        if (response.status === 201) {
          console.log("Categoría creada con éxito");
          // Puedes realizar otras acciones si es necesario
        } else {
          console.error("Error al crear la categoría. Respuesta inesperada:", response);
          // Puedes mostrar un mensaje de error al usuario
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Puedes mostrar un mensaje de error al usuario
    }
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    window.history.back();
  };

  return (
    <div className="division">
      <div className="division2">
        <Formik initialValues={{ nombre_categoria, descripcion_categoria }} onSubmit={handleSubmit}>
          <Form>
            <h2>{modoEdicion ? "Editar categoría" : "Crear categoría"}</h2>
            <label htmlFor="nombre_categoria" className="labelC">Nombre de categoría*</label>
            <Field id="nombre_categoria" name="nombre_categoria" className="inputC" type="text" />
            <label htmlFor="descripcion_categoria" className="labelC">Descripción (opcional)</label>
            <Field id="descripcion_categoria" name="descripcion_categoria" type="text" className="inputC" />

            <button type="submit" className="bontosave">{modoEdicion ? "Guardar cambios" : "Guardar"}</button>
            <button type="button" className="botoncancel" onClick={handleCancelClick}>Cancelar</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormCategoria;
