import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import './formproducto.css'

const FormProducto =() =>{
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías

  useEffect(() => {
    // Hacer una solicitud GET para obtener la lista de categorías
    axios.get('http://localhost:4000/api/categorias')
      .then(response => {
        setCategorias(response.data); // Almacena las categorías en el estado
      })
      .catch(error => {
        console.error("Error al cargar las categorías:", error);
      });
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al cargar el componente

  const handleSubmit = async(values) => {
    try {
      const { 
        id_categoria,
        nombre_producto,
        precio_total_producto,
        tamanio_producto,
        imagen_producto,
        descripcion_producto,
        stok_actual_producto,
        stok_min_producto
      } = values;

      // Realiza una solicitud POST para crear producto
      const response = await axios.post('http://localhost:4000/api/productos', {
        id_categoria,
        nombre_producto,
        precio_total_producto,
        tamanio_producto,
        imagen_producto,
        descripcion_producto,
        stok_actual_producto,
        stok_min_producto
      });

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
      <Formik initialValues={{id_categoria: "",
                              nombre_producto: "",
                              precio_total_producto:"",
                              tamanio_producto: "",
                              imagen_producto: "",
                              descripcion_producto: "",
                              stok_actual_producto: "",
                              stok_min_producto: ""}} onSubmit={handleSubmit}>
  <Form>
    <h2>Registrar producto</h2>
    <div className="parte1">
      <div>
        <label htmlFor="nombre_producto">Nombre de producto*</label>
        <Field type="text" name="nombre_producto" className="labelf" />
        <ErrorMessage name="nombre_producto" component="div" />
      </div>
      <div>
  <label htmlFor="id_categoria">Categoría*</label>
  <Field as="select" name="id_categoria" className="labelf">
    <option value="" disabled>
      Seleccionar
    </option>
    {categorias.map(categoria => (
      <option key={categoria.id_categoria} value={categoria.id_categoria}>
        {categoria.id_categoria} 
      </option>
    ))}
  </Field>
  <ErrorMessage name="id_categoria" component="div" />
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
          <label htmlFor="precio_total_producto">Precio total*</label>
          <Field type="number" name="precio_total_producto"  className="labelfff" />
          <ErrorMessage name="precio_total_producto" component="div" />
        </div>
        </div>
        <div className="parte3">
        <div>
          <label htmlFor="tamanio_producto">Tamaño*</label>
          <Field as="select" name="tamanio_producto" className="labelf1" >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="Grande">Grande</option>
            <option value="Mediano">Mediano</option>
            <option value="Pequenio">Pequeño</option>
          </Field>
        </div>
        <div>
          <label htmlFor="imagen_producto">Subir imagen (opcional)</label>
          <Field type="file" name="imagen_producto" className="labelf1"  />
          <ErrorMessage name="imagen_producto" component="div" />
        </div>
        </div>

        <div className="parte 4">
        <div>
          <label htmlFor="descripcion_producto" className="desp">Descripcion (opcional)</label>
          <Field type="textarea" name="descripcion_producto" style={{ height: '60px' }}  className="labelff"  />
          <ErrorMessage name="descripcion_producto" component="div" />
        </div>
        </div>
        <div className="parte1">
        <div>
          <label htmlFor="stok_actual_producto">Stock actual*</label>
          <Field type="number" name="stok_actual_producto" className="labelf2" />
          <ErrorMessage name="stok_actual_producto" component="div" />
        </div>
        <div>
          <label htmlFor="stok_min_producto">Stock minimo*
          </label>
          <Field type="number" name="stok_min_producto" className="labelf2" >
          </Field>
          <ErrorMessage name="stok_min_producto" component="div" />
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
};

export default FormProducto;
