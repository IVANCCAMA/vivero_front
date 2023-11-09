import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import './formproducto.css' 

const FormProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const navegar = useNavigate();
  const [precioInicial, setPrecioInicial] = useState(0);
  const [margen, setMargen] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(''); // Estado para Precio Total

  const initialValues = {
    id_categoria: undefined,
    nombre_producto: "",/* 
    precio_inicial_producto: undefined,
    margen_producto: undefined,
    precio_total_producto: undefined, // Inicialmente en blanco */
    tamanio_producto: undefined,
    imagen_producto: undefined,
    descripcion_producto: undefined,
    stok_actual_producto: undefined,
    stok_min_producto: undefined,
  };

  useEffect(() => {
    // Hacer una solicitud GET para obtener la lista de categorías
    if (!isNaN(precioInicial) && !isNaN(margen)) {
      setPrecioTotal(precioInicial + (precioInicial*margen/100));
    } else {
      setPrecioTotal(""); // Si el valor no es un número válido, establece una cadena vacía
    }

    axios.get('http://localhost:4000/api/categorias')
      .then(response => {
        setCategorias(response.data); // Almacena las categorías en el estado
      })
      .catch(error => {
        console.error("Error al cargar las categorías:", error);
      });
  }, [margen, precioInicial, precioTotal]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const producto = values;
    console.log("Producto objeto>>>> ", producto);

    // Verificamos que los campos obligatorios no estén vacíos
    if (producto.nombre_producto || producto.id_categoria || producto.precio_inicial_producto 
      || producto.precio_total_producto || producto.margen_producto || producto.tamanio_producto 
      || producto.stok_actual_producto|| producto.stok_min_producto)
      {
      try {
        const response = await axios.post('http://localhost:4000/api/productos', producto);
  
        if (response.status === 201) {
          console.log("Producto creado con éxito");
          /* window.close(); */
          navegar('/inventario/producto');

        } else {
          console.error("Error al crear el producto. Respuesta inesperada:", response);
        }
        setSubmitting(false);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    } else {
      alert("Llenes los campos");
      console.log('llene todo')
      setSubmitting(false);
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
        <Formik initialValues={initialValues}
          onSubmit={handleSubmit}
          /* validationSchema={validationSchema} */
        >
          {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <h3 className='h3-registrar'>Registrar producto</h3>
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
                      onChange={(e) => setPrecioInicial(parseFloat(e.target.value))} // Actualiza el estado de Margen
                      value={precioInicial}
                    />
                    <ErrorMessage name="precio_inicial_producto" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>

                <Col md="4">
                  <Form.Group controlId="validationFormik04">
                    <Form.Label>Margen %*</Form.Label>
                    
                    <Field
                      type="number"
                      name="margen_producto"
                      placeholder="Precio inicial"
                      className={`form-control ${touched.margen_producto && errors.margen_producto ? 'is-invalid' : ''}`}
                      style={{ backgroundColor: '#A4BE7B' }}
                      onChange={(e) => setMargen(parseFloat(e.target.value))} // Actualiza el estado de Margen
                      value={margen}
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
                      className={`form-control `}
                      style={{ backgroundColor: '#A4BE7B' }}
                      value={precioTotal}
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
                      type="file"
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
                <Button type="submit" variant="primary">
                  Guardar
                </Button>{" "}
                <Button variant="danger" onClick={handleCancelClick}>
                  Cancelar
                </Button> 
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormProducto;
