import React from "react";
import { Formik, Form, Field } from "formik";
import '../App.css';
import './formcategoria.css';
import axios from 'axios';
import { Icon } from '@iconify/react';
const FormCategoria = () => {
  const handleSubmit = async (values) => {
    try {
      const { nombre_categoria, descripcion_categoria } = values;

      // Realiza una solicitud POST para crear la categoría
      const response = await axios.post('http://localhost:4000/api/categorias', {
        nombre_categoria,
        descripcion_categoria,
      });

      if (response.status === 201) {
        console.log("Categoría creada con éxito");
        // Puedes realizar otras acciones si es necesario
        window.close();
      } else {
        console.error("Error al crear la categoría. Respuesta inesperada:", response);
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
    <div >
      <div className="division2">
        <Formik initialValues={{ nombre_categoria: "", descripcion_categoria: "" }} onSubmit={handleSubmit}>
          <Form>
            <h2 className="txt-form">Crear categoría</h2>
            <label htmlFor="nombre_categoria" className="labelC">Nombre de categoría*</label>
            <Field id="nombre_categoria" name="nombre_categoria" className="inputC" type="text" placeholder="Ingrese nombre de categoria" />
            <label htmlFor="descripcion_categoria" className="labelC">Descripción(opcional)</label>
            <Field id="descripcion_categoria" name="descripcion_categoria" type="text" className="inputC" placeholder="Ingrese descripcion" />
            
            <div className="botones-Categoria">
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

export default FormCategoria;
