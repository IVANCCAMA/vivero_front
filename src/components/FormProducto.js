import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import './formproducto.css'

const FormProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  

  useEffect(() => {
    // Hacer una solicitud GET para obtener la lista de categorías
    axios.get('http://localhost:4000/api/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las categorías:", error);
      });
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Realiza una solicitud POST para crear producto
      console.log('Producto>>>>', values);
      const response = await axios.post('http://localhost:4000/api/productos', values);

      if (response.status === 201) {
        console.log("Producto creado con éxito");
        // Puedes realizar otras acciones si es necesario
        window.close();
      } else {
        console.error("Error al crear el producto. Respuesta inesperada:", response);
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
      <div className='division1'>
      <Formik
  initialValues={{
    id_categoria: "",
    nombre_producto: "",
    precio_total_producto: "",
    tamanio_producto: "",
    imagen_producto: "",
    descripcion_producto: "",
    stok_actual_producto: "",
    stok_min_producto: "",
    precio_inicial_producto: "",
    margen_producto: ""
  }}
  validate={values => {
    const errors = {};

    if (!values.nombre_producto) {
      errors.nombre_producto = "Campo obligatorio";
    }

    if (!values.id_categoria) {
      errors.id_categoria = "Campo obligatorio";
    }

    if (!values.precio_inicial_producto) {
      errors.precio_inicial_producto = "Campo obligatorio";
    }

    if (!values.margen_producto) {
      errors.margen_producto = "Campo obligatorio";
    }

    if (!values.precio_total_producto) {
      errors.precio_total_producto = "Campo obligatorio";
    }

    if (!values.tamanio_producto) {
      errors.tamanio_producto = "Campo obligatorio";
    }

    if (!values.stok_actual_producto) {
      errors.stok_actual_producto = "Campo obligatorio";
    }

    if (!values.stok_min_producto) {
      errors.stok_min_producto = "Campo obligatorio";
    }

    return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (isFormSubmitted) {
              setSubmitting(true); // Evita múltiples envíos del formulario

              if (Object.keys(values).every(key => values[key])) {
                // Si todos los campos requeridos están completos, puedes enviar el formulario
                handleSubmit(values);
              }
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <h2>Registrar producto</h2>
              <div className="parte1">
                <div>
                  <label htmlFor="nombre_producto">Nombre de producto*</label>
                  <Field type="text" name="nombre_producto" className={`labelf ${errors.nombre_producto ? 'has-error' : ''}`} />
                  <ErrorMessage name="nombre_producto" component="div" className="error-message"/>
                </div>
                <div>
                  <label htmlFor="id_categoria">Categoría*</label>
                  <Field as="select" name="id_categoria" className={`labelf ${errors.nombre_producto ? 'has-error' : ''}`}>
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {categorias.map(categoria => (
                      <option key={categoria.id_categoria} value={categoria.nombre_categoria}>
                        {categoria.nombre_categoria} 
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="nombre_categoria" component="div" className="error-message"/>
                </div>
              </div>
              <div className="parte2">
                <div>
                  <label htmlFor="precio_inicial_producto">Precio inicial*</label>
                  <Field type="number" name="precio_inicial_producto" className={`labelfff ${errors.nombre_producto ? 'has-error' : ''}`} />
                  <ErrorMessage name="precio_inicial_producto" component="div" className="error-message" />
                </div>
                <div>
                  <label htmlFor="margen_producto">Margen*</label>
                  <Field type="number" name="margen_producto" className={`labelfff ${errors.nombre_producto ? 'has-error' : ''}`} />
                  <ErrorMessage name="margen_producto" component="div" className="error-message" />
                </div>
                <div>
                  <label htmlFor="precio_total_producto">Precio total*</label>
                  <Field type="number" name="precio_total_producto" className={`labelfff ${errors.nombre_producto ? 'has-error' : ''}`}/>
                  <ErrorMessage name="precio_total_producto" component="div" className="error-message" />
                </div>
              </div>
              <div className="parte3">
                <div>
                  <label htmlFor="tamanio_producto">Tamaño*</label>
                  <Field as="select" name="tamanio_producto" className={`labelf1 ${errors.nombre_producto ? 'has-error' : ''}`}>
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="Grande">Grande</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Pequenio">Pequeño</option>
                  </Field>
                  <ErrorMessage name="tamanio_producto" component="div" className="error-message" />
                </div>
                <div>
                  <label htmlFor="imagen_producto">Subir imagen (opcional)</label>
                  <Field type="file" name="imagen_producto" className="labelf1" />
                  <ErrorMessage name="imagen_producto" component="div" />
                </div>
              </div>
              <div className="parte 4">
                <div>
                  <label htmlFor="descripcion_producto" className="desp">Descripcion (opcional)</label>
                  <Field type="textarea" name="descripcion_producto" style={{ height: '60px' }} className="labelff" />
                  <ErrorMessage name="descripcion_producto" component="div" />
                </div>
              </div>
              <div className="parte1">
                <div>
                  <label htmlFor="stok_actual_producto">Stock actual*</label>
                  <Field type="number" name="stok_actual_producto" className={`labelf2 ${errors.nombre_producto ? 'has-error' : ''}`} />
                  <ErrorMessage name="stok_actual_producto" component="div" className="error-message" />
                </div>
                <div>
                  <label htmlFor="stok_min_producto">Stock minimo*</label>
                  <Field type="number" name="stok_min_producto" className={`labelf2 ${errors.nombre_producto ? 'has-error' : ''}`} />
                  <ErrorMessage name="stok_min_producto" component="div" className="error-message" />
                </div>
              </div>

              <div className='botones'>
              <button
  className="botonverde"
  type="submit"
  onClick={() => {
    setIsFormSubmitted(true);

    if (!isSubmitting) {
      if (Object.keys(errors).length === 0) {
        // Si no hay errores en los campos requeridos, entonces puedes enviar el formulario
        handleSubmit();
      }
    }
  }}
  disabled={isSubmitting}
>
  Guardar
</button>
                <button className='botonrojo' onClick={handleCancelClick}>Cancelar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormProducto;
