import './CategoriaLista.css'
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import './formproducto.css'

const initialValues = {
  name: "",
  category: "",
  initial_price: "",
  margin: "",
  total_price: "",
  size: "",
  image: "",
  description: "",
  stock_current: "",
  stock_minimum: "",
};

function FormProducto() {
  const handleSubmit = (values) => {
    axios
      .post("/api/products", values)
      .then((response) => {
        // Haz algo con la respuesta si es necesario
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    window.history.back();
  };

  return (
    <div className="division">
      <div className='division1'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <h2>Registrar producto</h2>
        <div className="parte1">
        <div>
          <label htmlFor="name">Nombre de producto*</label>
          <Field type="text" name="name" className="labelf" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="category">Categoría*</label>
          <Field as="select" name="category" className="labelf" >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="Arboles">Arboles</option>
          </Field>
          <ErrorMessage name="category" component="div" />
        </div>
        </div>
        <div className="parte2">
        <div>
          <label htmlFor="initial_price">Precio inicial*</label>
          <Field type="number" name="initial_price" className="labelfff"  />
          <ErrorMessage name="initial_price" component="div" />
        </div>
        <div>
          <label htmlFor="margin">Margen*</label>
          <Field type="number" name="margin" className="labelfff"  />
          <ErrorMessage name="margin" component="div" />
        </div>
        <div>
          <label htmlFor="total_price">Precio total*</label>
          <Field type="number" name="total_price"  className="labelfff" />
          <ErrorMessage name="total_price" component="div" />
        </div>
        </div>
        <div className="parte3">
        <div>
          <label htmlFor="size">Tamaño*</label>
          <Field as="select" name="size" className="labelf1" >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="Grande">Grande</option>
            <option value="Mediano">Mediano</option>
            <option value="Pequenio">Pequeño</option>
          </Field>
        </div>
        <div>
          <label htmlFor="image">Subir imagen (opcional)</label>
          <Field type="file" name="image" className="labelf1"  />
          <ErrorMessage name="image" component="div" />
        </div>
        </div>

        <div className="parte 4">
        <div>
          <label htmlFor="descrip" className="desp">Descripcion (opcional)</label>
          <Field type="textarea" name="descrip" style={{ height: '60px' }}  className="labelff"  />
          <ErrorMessage name="descrip" component="div" />
        </div>
        </div>
        <div className="parte1">
        <div>
          <label htmlFor="stocka">Stock actual*</label>
          <Field type="number" name="stocka" className="labelf2" />
          <ErrorMessage name="stocka" component="div" />
        </div>
        <div>
          <label htmlFor="stockm">Stock minimo*
          </label>
          <Field type="number" name="stockm" className="labelf2" >
          </Field>
          <ErrorMessage name="stockm" component="div" />
        </div>
        </div>
        <div className='botones'>
        <button className='botonverde' type="submit">Guardar</button>
        <button className='botonrojo' onClick={handleCancelClick}>Cancelar</button>
        </div>
      </Form>
    </Formik>
      </div>
        

    </div>
    
  );
}

export default FormProducto;
