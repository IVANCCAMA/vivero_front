
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import './formproducto.css'

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


/* Recupera Info de producto */
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const responseProducto = await axios.get(`http://localhost:4000/api/productos/${id_producto}`);
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
      const response = await axios.put(`http://localhost:4000/api/productos/${id_producto}`, {
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
    window.history.back();
  };

  return (

    <div>
      <div className='division1'>
      <Formik initialValues={infoProducto} onSubmit={handleSubmit}>
  <Form>
    <h2>Editar producto</h2>
    <div className="parte1">
      <div>
        <label htmlFor="nombre_producto">Nombre de producto*</label>
        <Field id="nombre_producto" type="text" name="nombre_producto" className="labelf" />
        <ErrorMessage name="nombre_producto" component="div" />
      </div>
      <div>
  <label htmlFor="id_categoria">Categoría*</label>
  <Field id="id_categoria" as="select" name="id_categoria" className="labelf">
    <option value="" disabled>
      Seleccionar
    </option>
    {categorias.map(categoria => (
      <option key={categoria.id_categoria} value={categoria.id_categoria}>
        {categoria.nombre_categoria} 
      </option>
    ))}
  </Field>
  <ErrorMessage name="id_categoria" component="div" />
</div>
    </div>
    <div className="parte2">
        <div>
          <label htmlFor="precio_inicial_producto">Precio inicial*</label>
          <Field id="precio_inicial_producto" type="number" name="precio_inicial_producto" className="labelfff"  />
          <ErrorMessage name="precio_inicial_producto" component="div" />
        </div>
        <div>
          <label htmlFor="margen_producto">Margen*</label>
          <Field id="margen_producto" type="number" name="margen_producto" className="labelfff"  />
          <ErrorMessage name="margen_producto" component="div" />
        </div>
        <div>
          <label htmlFor="precio_total_producto">Precio total*</label>
          <Field id="precio_total_producto" type="number" name="precio_total_producto"  className="labelfff" />
          <ErrorMessage name="precio_total_producto" component="div" />
        </div>
        </div>
        <div className="parte3">
        <div>
          <label htmlFor="tamanio_producto">Tamaño*</label>
          <Field id="tamanio_producto" as="select" name="tamanio_producto" className="labelf1" >
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
          <Field id="imagen_producto"  name="imagen_producto" className="labelf1"  />
          <ErrorMessage name="imagen_producto" component="div" />
        </div>
        </div>

        <div className="parte 4">
        <div>
          <label htmlFor="descripcion_producto" className="desp">Descripcion (opcional)</label>
          <Field  id="descripcion_producto" type="textarea" name="descripcion_producto" style={{ height: '60px' }}  className="labelff"  />
          <ErrorMessage name="descripcion_producto" component="div" />
        </div>
        </div>
        <div className="parte1">
        <div>
          <label htmlFor="stok_actual_producto">Stock actual*</label>
          <Field id="stok_actual_producto" type="number" name="stok_actual_producto" className="labelf2" />
          <ErrorMessage name="stok_actual_producto" component="div" />
        </div>
        <div>
          <label htmlFor="stok_min_producto">Stock minimo*
          </label>
          <Field id="stok_min_producto" type="number" name="stok_min_producto" className="labelf2" >
          </Field>
          <ErrorMessage name="stok_min_producto" component="div" />
        </div>
        </div>
    
    <div className='botones'>
      <button className='botonverde' type="submit" onClick={handleCancelClick}>Guardar</button>
      <button className='botonrojo' onClick={handleCancelClick}>Cancelar</button>
    </div>
  </Form>
</Formik>
      </div>
    </div>
  );
};

export default FormEditarProducto;
