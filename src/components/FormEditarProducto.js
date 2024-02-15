import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { useParams } from "react-router-dom";
import './formproducto.css' 
import { Icon } from '@iconify/react';

function FormEditarProducto () {
  const { id_producto } = useParams();
  const [infoProducto, setinfoProducto] = useState({
    id_categoria: "",
    nombre_producto: "",
    precio_total_producto:"",
    tamanio_producto: "",
    imagen_producto: "",
    descripcion_producto: "",
    stok_actual_producto: "",
    stok_min_producto: "",
    precio_inicial_producto:"",
    margen_producto:""
  });   

const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
const navegar = useNavigate();

useEffect(() => {
  // Hacer una solicitud GET para obtener la lista de categorías
  axios.get('https://viverobackend-production.up.railway.app/api/categorias')
    .then(response => {
      setCategorias(response.data); // Almacena las categorías en el estado
    })
    .catch(error => {
      console.error("Error al cargar los tipos de usuarios:", error);
    });
}, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al cargar el componente


/* Recupera Info de producto */
useEffect(() => {
  const fetchProducto = async () => {
    try {
      const responseProducto = await axios.get(`https://viverobackend-production.up.railway.app/api/productos/${id_producto}`);
      const infoProduct = responseProducto.data;
      infoProducto.id_categoria = infoProduct.id_categoria 
      infoProducto.precio_total_producto = infoProduct.precio_total_producto
      infoProducto.nombre_producto = infoProduct.nombre_producto
      infoProducto.tamanio_producto = infoProduct.tamanio_producto
      infoProducto.imagen_producto = infoProduct.imagen_producto
      infoProducto.descripcion_producto = infoProduct.descripcion_producto
      infoProducto.stok_actual_producto = infoProduct.stok_actual_producto
      infoProducto.stok_min_producto = infoProduct.stok_min_producto
      infoProducto.precio_inicial_producto = infoProduct.precio_inicial_producto
      infoProducto.margen_producto = infoProduct.margen_producto
      
      console.log("INFORMACION PRODUCTO RECUPERADA:", infoProducto);
      setinfoProducto(infoProduct);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };
  fetchProducto();
}, [id_producto]);

/* Actualizar o modificar produto */
const handleSubmit = async (values) => {
  try {
    const { 
      id_categoria,
      nombre_producto,
      precio_total_producto,
      tamanio_producto,
      imagen_producto,
      descripcion_producto,
      stok_actual_producto,
      stok_min_producto,
      precio_inicial_producto,
      margen_producto} = values;

      console.log('valores enviados', values);

    // Realiza una solicitud PUT para actualizar el producto
    const response = await axios.put(`https://viverobackend-production.up.railway.app/api/productos/${id_producto}`, {
      id_categoria,
      nombre_producto,
      precio_total_producto,
      tamanio_producto,
      imagen_producto,
      descripcion_producto,
      stok_actual_producto,
      stok_min_producto,
      precio_inicial_producto,
      margen_producto
    });

    if (response.status === 200) {
      console.log("Producto actualizado con éxito");
      // Puedes realizar otras acciones si es necesario
      navegar('/inventario/producto');
    } else {
      console.error("Error al actualizar el producto. Respuesta inesperada:", response);
      // Puedes mostrar un mensaje de error al usuario
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    // Puedes mostrar un mensaje de error al usuario
  }
};


  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    /* navegar('/inventario/producto') */
    window.history.back();
  };

  const validationSchema = yup.object().shape({
    id_categoria: yup.number().required("Campo obligatorio"),
    nombre_producto: yup.string().required("Campo obligatorio"),
    precio_inicial_producto: yup.number().required("Campo obligatorio"),
    margen_producto: yup.number().required("Campo obligatorio"),
    precio_total_producto: yup.number().required("Campo obligatorio"),
    tamanio_producto: yup.string().required("Campo obligatorio"),
    stok_actual_producto: yup.number().required("Campo obligatorio"),
    stok_min_producto: yup.number().required("Campo obligatorio"),
  });

  return (
    <div className="form-container">
      <div className="form-content">
        <Formik initialValues={infoProducto}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <h3 className='h3-registrar'>Editar producto</h3>
              <Row className="mb-3">
                <Col md="6">
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.Label>Nombre*</Form.Label>
                  <Field
                  placeholder="Nombre del producto"
                    type="text"
                    name="nombre_producto"
                    className={`form-control ${errors.nombre_producto ? 'is-invalid' : ''}`}
                    style={{ backgroundColor: '#A4BE7B' }}
                  />
                  <ErrorMessage name="nombre_producto" component="div" className="invalid-feedback" />
                </Form.Group>
                </Col>

                <Col md="6">
                <Form.Group as={Col}  controlId="validationFormik02">
                <Form.Label>Categoría*</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className={`form-control ${touched.id_categoria && errors.id_categoria ? 'is-invalid' : ''}`}
                  name="id_categoria"  // Debe ser "id_categoria" en lugar de "categoria"
                  value={values.id_categoria}
                  onChange={handleChange}
                  style={{ backgroundColor: '#A4BE7B' }}
                >
                  <option  value="">Seleccionar</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </Form.Select>
                {touched.id_categoria && errors.id_categoria && (
                  <div className="invalid-feedback">{errors.id_categoria}</div>
                )}
                </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="4">
                  <Form.Group controlId="validationFormik03">
                    <Form.Label>Precio inicial*</Form.Label>
                    <Field
                      type="number"
                      name="precio_inicial_producto"
                      placeholder="Precio inicial"
                      className={`form-control ${touched.precio_inicial_producto && errors.precio_inicial_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                    <ErrorMessage name="precio_inicial_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>

                <Col md="4">
                  <Form.Group controlId="validationFormik04">
                    <Form.Label>Margen*</Form.Label>
                    
                    <Field
                      type="number"
                      name="margen_producto"
                      placeholder="Margen"
                      className={`form-control ${touched.margen_producto && errors.margen_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                    <ErrorMessage name="margen_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>

                <Col md="4">
                  <Form.Group controlId="validationFormik05">
                    <Form.Label>Precio total*</Form.Label>
                    <Field
                      type="number"
                      name="precio_total_producto"
                      placeholder="Precio total"
                      className={`form-control ${touched.precio_total_producto && errors.precio_total_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                    <ErrorMessage name="precio_total_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="4">
                  <Form.Group controlId="validationFormik06">
                    <Form.Label>Tamaño*</Form.Label>
                    <Field as="select"
                      name="tamanio_producto"
                      className={`form-control ${touched.tamanio_producto && errors.tamanio_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Pequeño">Pequeño</option>
                      <option value="Mediano">Mediano</option>
                      <option value="Grande">Grande</option>
                    </Field>
                    <ErrorMessage name="tamanio_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>

                <Col md="8">
                  <Form.Group controlId="validationFormik07">
                    <Form.Label>Imagen(opcional)</Form.Label>
                    <Field
                      
                      name="imagen_producto"
                      className="form-control"
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Descripción(opcional)</Form.Label>
                  <Field
                    as="textarea"
                    name="descripcion_producto"
                    placeholder="Descripcion"
                    rows="3"
                    className={`form-control ${touched.descripcion_producto && errors.descripcion_producto ? 'is-invalid' : ''}`}
                    style={{ backgroundColor: '#A4BE7B' }}
                  />
                  <ErrorMessage name="descripcion_producto" component="div" className="invalid-feedback" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Col md="6">
                  <Form.Group controlId="validationFormik08">
                    <Form.Label>Stock actual*</Form.Label>
                    <Field
                      type="number"
                      name="stok_actual_producto"
                      placeholder="Stock actual"
                      className={`form-control ${touched.stok_actual_producto && errors.stok_actual_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                    <ErrorMessage name="stok_actual_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group controlId="validationFormik09">
                    <Form.Label>Stock mínimo*</Form.Label>
                    <Field
                      type="number"
                      name="stok_min_producto"
                      placeholder="Stock minino"
                      className={`form-control ${touched.stok_min_producto && errors.stok_min_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                    />
                    <ErrorMessage name="stok_min_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>

              <div className="btn-form">
                <Button type="submit">
                  Guardar
                  <Icon icon="lets-icons:check-fill" color="white" width="25" height="25" />
                </Button>{"   "}
                <Button className="btn-cancelar" onClick={handleCancelClick}>
                  Cancelar
                  <Icon icon="material-symbols:cancel" color="white" width="25" height="25" />
                </Button> 
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormEditarProducto;
