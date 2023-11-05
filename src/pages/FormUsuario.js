import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './FormUsuario.css';


function FormUsuario() {

  const navegar = useNavigate();
  const [tipodeUsuarios, settipodeUsuarios] = useState([]);

  useEffect(() => {
    // Hacer una solicitud GET para obtener la lista de categorías
    axios.get('http://localhost:4000/api/tipoUsuario')
      .then(response => {
        settipodeUsuarios(response.data); // Almacena las categorías en el estado
      })
      .catch(error => {
        console.error("Error al cargar las categorías:", error);
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const usuario = values;
    console.log("Usuario objeto>>>> ", usuario);

    // Verificamos que los campos obligatorios no estén vacíos
    if (usuario.nombre_usuario ||usuario.id_tipo_usuario|| usuario.ci_usuario || usuario.celular_usuario 
      || usuario.correo_usuario || usuario.contrasenia_usuario || usuario.fecha_nacimiento_usuario
      || usuario.genero_usuario|| usuario.rol_usuario)
      {
      try {
        const response = await axios.post('http://localhost:4000/api/usuarios', usuario);
  
        if (response.status === 201) {
          console.log("usuario creado con éxito");
          /* window.close(); */
          navegar('/usuarios');

        } else {
          console.error("Error al crear el usuario. Respuesta inesperada:", response);
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
    id_tipo_usuario:yup.number().required("Campo obligatorio"),
    nombre_usuario: yup.string().required('Campo obligatorio'),
    ci_usuario: yup.string().required('Campo obligatorio'),
    celular_usuario: yup.string().required('Campo obligatorio'),
    correo_usuario: yup.string().required('Campo obligatorio'),
    contrasenia_usuario: yup.string().required('Campo obligatorio'),
    fecha_nacimiento_usuario: yup.string().required('Campo obligatorio'),
    genero_usuario: yup.string().required('Campo obligatorio'),
    /* rol_usuario: yup.string().required('Campo obligatorio'), */
  });

  return (
      <div className='form-containerUsuario'>
      <div className='form-contentUsuario'>
    <Formik
      initialValues={{
        id_tipo_usuario: undefined,
        nombre_usuario: undefined,
        ci_usuario: undefined,
        celular_usuario: undefined,
        correo_usuario: undefined,
        contrasenia_usuario: undefined,
        fecha_nacimiento_usuario: undefined,
        genero_usuario: undefined
        /* rol_usuario: '', */
      }}
      onSubmit={handleSubmit} 
        validationSchema={validationSchema}
      
      
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>Registrar usuario</h3>
          <Form.Group as={Row} className="mb-1" controlId="validationFormik01">
            <Form.Label column sm="2" >Nombre Completo:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="text"
              name="nombre_usuario"
              /* value={values.nombre_usuario} */
              placeholder='Nombre completo'
              onChange={handleChange}
              isInvalid={touched.nombre_usuario && !!errors.nombre_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            
            <Form.Control.Feedback type="invalid">
              {errors.nombre_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1" controlId="validationFormik02">
            <Form.Label column sm="2">Cédula de Identidad:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="number"
              name="ci_usuario"
              /* value={values.ci_usuario} */
              placeholder='Numero de Cedula de identidad'
              onChange={handleChange}
              isInvalid={touched.ci_usuario && !!errors.ci_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ci_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1" controlId="validationFormik03">
            <Form.Label column sm="2">Numero de celular:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="number"
              name="celular_usuario"
              /* value={values.celular_usuario} */
              placeholder='Numero de celular'
              onChange={handleChange}
              isInvalid={touched.celular_usuario && !!errors.celular_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.celular_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1" controlId="validationFormik04">
            <Form.Label column sm="2">Correo Electronico:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="email"
              name="correo_usuario"
              /* value={values.correo_usuario} */
              placeholder='Correo Electronico'
              onChange={handleChange}
              isInvalid={touched.correo_usuario && !!errors.correo_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.correo_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="validationFormik05">
            <Form.Label column sm="2">Contraseña:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="password"
              name="contrasenia_usuario"
              /* value={values.contrasenia_usuario} */
              placeholder='Contraseña'
              onChange={handleChange}
              isInvalid={touched.contrasenia_usuario && !!errors.contrasenia_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contrasenia_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1" controlId="validationFormik06">
            <Form.Label column sm="2">Fecha de nacimiento:</Form.Label>
            <Col sm="10">
            <Form.Control
              type="date"
              name="fecha_nacimiento_usuario"
              /* value={values.fecha_nacimiento_usuario} */
              placeholder='Fecha de nacimiento'
              onChange={handleChange}
              isInvalid={touched.fecha_nacimiento_usuario && !!errors.fecha_nacimiento_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha_nacimiento_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="validationFormik07">
            <Form.Label column sm="2">Genero:</Form.Label>
            <Col sm="10">
            <Form.Select
              aria-label="Default select example"
              type="text"
              name="genero_usuario"
              /* value={values.genero_usuario} */
              onChange={handleChange}
              isInvalid={touched.genero_usuario && !!errors.genero_usuario}
              style={{ backgroundColor: '#A4BE7B' }}
            >
              <option value="">Seleccionar</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.genero_usuario}
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="validationFormik08">
              <Form.Label column sm="2">Rol:</Form.Label>
              <Col sm="10">
              <Form.Select
                aria-label="Default select example"
                type="text"
                name="id_tipo_usuario"
                value={values.id_tipo_usuario} 
                onChange={handleChange}
                isInvalid={touched.id_tipo_usuario && !!errors.id_tipo_usuario}
                style={{ backgroundColor: '#A4BE7B' }}
              >
                <option value="">Seleccionar</option>
                {tipodeUsuarios.map(usuarioT =>(
                  <option key={usuarioT.id_tipo_usuario} value={usuarioT.id_tipo_usuario}>
                  {usuarioT.tipo_usuario}
                    </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.id_tipo_usuario}
              </Form.Control.Feedback>
              </Col>
            </Form.Group>

          <div className='btn-form'>
          <Button type="submit" className='btn-usuario'>Guardar Usuario</Button>{" "}
          <Button variant="danger" onClick={handleCancelClick}> Cancelar</Button> 
          </div>
        </Form>
      )}
    </Formik>
      </div>
      </div>
  );
}

export default FormUsuario;
