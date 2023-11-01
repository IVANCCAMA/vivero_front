import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import './formproducto.css'

const FormProducto =() =>{
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const navegar = useNavigate();

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

  const handleSubmit = async(values, {setSubmitting}) => {
    setSubmitting(true);

    const producto = values;
    console.log("Producto objeto>>>> ", producto);

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
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    /* navegar('/inventario/producto') */
    window.history.back();
  };

  return (
    <div>
      <div className='division1'>
        <Formik initialValues=
          {{id_categoria: undefined,
            nombre_producto:undefined,
            precio_inicial_producto: undefined,
            margen_producto:undefined,
            precio_total_producto: undefined,
            tamanio_producto:undefined,
            imagen_producto:undefined,
            descripcion_producto:undefined,
            stok_actual_producto:undefined,
            stok_min_producto:undefined,
          }} 
          onSubmit={handleSubmit}
        >
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
                <Field type="number" name="precio_inicial_producto" className="labelfff"  />
                <ErrorMessage name="precio_inicial_producto" component="div" />
              </div>
              <div>
                <label htmlFor="margen_producto">Margen*</label>
                <Field type="number" name="margen_producto" className="labelfff"  />
                <ErrorMessage name="margen_producto" component="div" />
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
