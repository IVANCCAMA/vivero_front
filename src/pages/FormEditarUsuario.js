import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './FormUsuario.css';
import { Icon } from '@iconify/react';

function FormEditarUsuario() {
    const { id_usuario } = useParams();
    const [infoUsuario, setinfoUsuario] = useState({
        id_tipo_usuario: "",
        nombre_usuario: "",
        ci_usuario: "",
        celular_usuario: "",
        correo_usuario: "",
        contrasenia_usuario: "",
        fecha_nacimiento_usuario: "",
        genero_usuario: ""
    });   


    const [tipodeUsuarios, settipodeUsuarios] = useState([]);
    const navegar = useNavigate();

        useEffect(() => {
    // Hacer una solicitud GET para obtener la lista de categorías
    axios.get('http://localhost:4000/api/tipoUsuario')
        .then(response => {
            settipodeUsuarios(response.data); // Almacena las categorías en el estado
        })
        .catch(error => {
        console.error("Error al cargar los tipos de usuarios:", error);
        });
        }, []);

/* Recupera Info de usuario
 */
            useEffect(() => {
                const fetchUsuario = async () => {
                try {
                    const responseUsuario = await axios.get(`http://localhost:4000/api/usuarios/${id_usuario}`);
                    const infoUser = responseUsuario.data;
                    infoUsuario.id_tipo_usuario = infoUser.id_tipo_usuario 
                    infoUsuario.nombre_usuario = infoUser.nombre_usuario
                    infoUsuario.ci_usuario = infoUser.ci_usuario
                    infoUsuario.celular_usuario = infoUser.celular_usuario
                    infoUsuario.correo_usuario = infoUser.correo_usuario
                    infoUsuario.contrasenia_usuario = infoUser.contrasenia_usuario
                    infoUsuario.fecha_nacimiento_usuario = infoUser.fecha_nacimiento_usuario
                    infoUsuario.genero_usuario = infoUser.genero_usuario
                    
                    console.log("INFORMACION DE USUARIO RECUPERADO:", infoUsuario);
                    setinfoUsuario(infoUser);
                } catch (error) {
                    console.error('Error al obtener el usuario:', error);
                }
                };
                fetchUsuario();
            }, [id_usuario]);

 /*Actualizar usuario*/
 const handleSubmit = async (values) => {
    try {
      const { 
        nombre_usuario,
        id_tipo_usuario,
        ci_usuario,
        celular_usuario,
        correo_usuario,
        contrasenia_usuario,
        fecha_nacimiento_usuario,
        genero_usuario,
        rol_usuario} = values;
  
        console.log('valores enviados', values);
  
      // Realiza una solicitud PUT para actualizar el producto
      const response = await axios.put(`http://localhost:4000/api/usuarios/${id_usuario}`, {
        nombre_usuario,
        id_tipo_usuario,
        ci_usuario,
        celular_usuario,
        correo_usuario,
        contrasenia_usuario,
        fecha_nacimiento_usuario,
        genero_usuario,
        rol_usuario
    });
  
        if (response.status === 200) {
        console.log("Usuario actualizado con éxito");
        // Puedes realizar otras acciones si es necesario
        navegar('/usuarios');
        } else {
        console.error("Error al actualizar el usuario. Respuesta inesperada:", response);
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
        <Formik initialValues={infoUsuario}
        onSubmit={handleSubmit} 
            validationSchema={validationSchema}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
            <h3>Editar usuario</h3>
            <Form.Group as={Row} className="mb-1" controlId="validationFormik01">
                <Form.Label column sm="2" >Nombre Completo:</Form.Label>
                <Col sm="10">
                <Form.Control
                type="text"
                name="nombre_usuario"
                placeholder='Nombre completo'
                value={values.nombre_usuario}
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
                placeholder='Numero de Cedula de identidad'
                value={values.ci_usuario}
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
                placeholder='Numero de celular'
                value={values.celular_usuario}
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
                placeholder='Correo Electronico'
                value={values.correo_usuario}
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
                placeholder='Contraseña'
                value={values.contrasenia_usuario}
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
                placeholder='Fecha de nacimiento'
                value={values.fecha_nacimiento_usuario}
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
                value={values.genero_usuario}
                onChange={handleChange}
                isInvalid={touched.genero_usuario && !!errors.genero_usuario}
                style={{ backgroundColor: '#A4BE7B' }}
                >
                <option value="">Seleccionar:</option>
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
            <Button type="submit" className='btn-usuario'>
                Guardar
                <Icon icon="lets-icons:check-fill" color="white" width="25" height="25" />
                </Button>{" "}
            <Button variant="danger" onClick={handleCancelClick}>
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
    }

export default FormEditarUsuario;
