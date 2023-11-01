import React, { useState, useEffect } from "react";
/* import { formik, Form, Field, ErrorMessage } from "formik"; */

import axios from "axios";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import './formproducto.css' 
import { Formik } from "formik";

  function FormProducto() {
    //const { Formik } = formik;

    const schema = yup.object().shape({
      nombre: yup.string().required(),
      categoria: yup.string().required(),
      PrecioIni: yup.number().required(),
      margen: yup.number().required(),
      precio_total: yup.number().required(),
      tamanio: yup.string().required(),
      image: yup.string().required(),
      descripcion: yup.string().required(),
      stock_actual: yup.number().required(),
      stock_minimo: yup.number().required(),
      
    });
  
    return (
      <div className="form-container">
      <div className="form-content">
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          nombre: '',
          categoria: '',
          PrecioIni:'',
          margen: '',
          precio_total:'',
          tamanio: '',
          image: '',
          descripcion:'',
          stock_actual:'',
          stock_minimo:''
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h3 className='h3-registrar'>Registrar producto</h3>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Categoria*</Form.Label>
                <Form.Select aria-label="Default select example"
                  className={`form-control ${touched.categoria && errors.categoria ? 'is-invalid' : ''}`}
                  name="categoria"
                  value={values.categoria}
                  onChange={handleChange}
                  style={{ backgroundColor: '#A4BE7B' }}
                >
                  <option value="">Seleccionar</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">G3</option>
                </Form.Select>
                {touched.categoria && errors.categoria && (
                  <div className="invalid-feedback">{errors.categoria}</div>
                )}
                
                </Form.Group>
            </Row>

            <Row className=" mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Precio inicial*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio inicial"
                  name="PrecioIni"
                  value={values.PrecioIni}
                  onChange={handleChange}
                  isInvalid={!!errors.PrecioIni}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.PrecioIni}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>Margen*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Margen"
                  name="margen"
                  value={values.margen}
                  onChange={handleChange}
                  isInvalid={!!errors.margen}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.margen}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationFormik05">
                <Form.Label>Precio total*</Form.Label>
                <Form.Control 
                  type="number"
                  placeholder="Precio total"
                  name="precio_total"
                  value={values.precio_total}
                  onChange={handleChange}
                  isInvalid={!!errors.precio_total}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.precio_total}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Tamaño*</Form.Label>
                <Form.Select aria-label="Default select example"
                  className={`form-control ${touched.tamanio && errors.tamanio ? 'is-invalid' : ''}`}
                  name="tamanio"
                  value={values.tamanio}
                  onChange={handleChange}
                  style={{ backgroundColor: '#A4BE7B' }}
                >
                  <option value="">Seleccionar</option>
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                </Form.Select>
                {touched.tamanio && errors.tamanio && (
                  <div className="invalid-feedback">{errors.tamanio}</div>
                )}
                
                </Form.Group>
                <Form.Group as={Col} md="8" controlId="validationFormik02">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  style={{ backgroundColor: '#A4BE7B' }}
                />
              </Form.Group>
              
            </Row>
            <Row className="mb-3">
            <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="inputPassworddescripcion5"
              aria-describedby="descripcion"
              placeholder="Descripcion"
              style={{ backgroundColor: '#A4BE7B' }}
            />
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik05">
                <Form.Label>Sstock actual*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stock actual"
                  name="stock actual"
                  value={values.stock_actual}
                  onChange={handleChange}
                  isInvalid={!!errors.stock_actual}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
  
                <Form.Control.Feedback type="invalid">
                  {errors.stock_actual}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormik05">
                <Form.Label>Stock minimo*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Stock minimo"
                  name="stock_minimo"
                  value={values.stock_minimo}
                  onChange={handleChange}
                  isInvalid={!!errors.stock_minimo}
                  style={{ backgroundColor: '#A4BE7B' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stock_minimo}
                </Form.Control.Feedback>
              </Form.Group>
              
            </Row>
            <div className="btn-form">
            <Button type="submit"  variant="primary" >
              Guardar
            </Button>{' '}
            <Button variant="danger" >
              Cancelar
            </Button>
          </div>
            
          </Form>
        )}
      </Formik>
      </div>
      </div>
    );
  }
  

export default FormProducto;
