import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import '../App.css';
import './formcategoria.css';
import axios from 'axios';
import { Icon } from '@iconify/react';

function FormEditarCategoria() {
  const { id_categoria } = useParams();
  const [infoCate, setInfoCate] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  /* Recupera Info de la categoría */
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const responseCategoria = await axios.get(`https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`);
        const infoCategoria = responseCategoria.data;
        infoCate.nombre_categoria = infoCategoria.nombre_categoria 
        infoCate.descripcion_categoria = infoCategoria.descripcion_categoria
        console.log("INFORMACION CATEGORÍA RECUPERADA:", infoCategoria);
        setInfoCate(infoCategoria);
      } catch (error) {
        console.error('Error al obtener la Categoría:', error);
      }
    };
    fetchCategoria();
  }, [id_categoria]);

  /* Actualizar o modificar categoría */
  const handleSubmit = async (values) => {
    try {
      const { nombre_categoria, descripcion_categoria } = values;

      // Realiza una solicitud PUT para actualizar la categoría
      const response = await axios.put(`https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`, {
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
    }
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    window.history.back();
  };

  return (
    <div className="division">
      <div className="division2">
      <Formik
        initialValues={infoCate} // Establece los valores iniciales del formulario con infoCategoria
        onSubmit={handleSubmit}
      >
        <Form>
        <h2 className="txt-form">Editar categoría</h2>
          <label className="labelC">Nombre de categoría*</label>
          <Field id="nombre_categoria" name="nombre_categoria" type="text" className="inputC" />

          <label className="labelC">Descripción (opcional)</label>
          <Field id="descripcion_categoria" name="descripcion_categoria" type="text" className="inputC" />

          <div className="btns-cancel-save">
          <button type="submit" className="bontosave" onClick={handleCancelClick}>
            Guardar
            <Icon icon="lets-icons:check-fill" color="white" width="25" height="25" />
            </button>
          <button type="button" className="botoncancel" onClick={handleCancelClick}>
            Cancelar
            <Icon icon="material-symbols:cancel" color="white" width="25" height="25" />
          </button>
          </div>
        </Form>
      </Formik>

      </div>
    </div>
  );
};

export default FormEditarCategoria;
