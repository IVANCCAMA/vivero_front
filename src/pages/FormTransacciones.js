import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Icon } from '@iconify/react';

const FormTransacciones = () => {
    const {authState} = useAuth();
    const { user } = authState;

    const [productos, setProductos] = useState([]);
    const [transacciones, setTransacciones] = useState([]);
    const navegar = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState({
        nombre_producto: "",
        tamanio_producto: "",
        nombre_categoria: "",
    });
    const [id_producto_selecionado, setIdProducto] = useState('');
    const [producto, setProducto] = useState('')

    const initialValues = {
        id_tipo_transaccion: "",
        id_producto: "",
        cod_producto: "",
        cantidad_ingreso_salida: "",
        id_usuario: "",
        cantidad_salida: "",
        cantidad_ingreso: "",
        detalle_transaccion: "",
    };

    useEffect(() => {

        axios.get('https://viverobackend-production.up.railway.app/api/tipotransaccion')
        .then(response => {
            setTransacciones(response.data); // Almacena las categorías en el estado
        })
        .catch(error => {
            console.error("Error al cargar las transacciones:", error);
        });

        axios.get("https://viverobackend-production.up.railway.app/api/productos")
        .then((response) => {
            setProductos(response.data);
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
    }, []);

    const handleCodigoProductoChange = (event) => {
        const codigoProducto = event.target.value;
        // Busca el producto correspondiente al código ingresado
        //console.log(codigoProducto);
        const productoEncontrado = productos.find(
        (producto) => producto.cod_producto === codigoProducto
        );

        if (productoEncontrado) {
        // Si se encuentra un producto, asigna sus valores a selectedProduct
        setProducto(productoEncontrado);
        setIdProducto(productoEncontrado.id_producto);
        
        setSelectedProduct({
            nombre_producto: productoEncontrado.nombre_producto,
            tamanio_producto: productoEncontrado.tamanio_producto,
            nombre_categoria: productoEncontrado.nombre_categoria,
        });
        } else {
        // Si no se encuentra, resetea selectedProduct a sus valores iniciales
        setSelectedProduct({
            nombre_producto: "",
            tamanio_producto: "",
            nombre_categoria: "",
        });
        }
    };


    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        
        const transaccion = values;
        /* Posible bug o error al enviar valores en cadenas */
        // Entrada
        if (transaccion.id_tipo_transaccion === "1") {
            transaccion.cantidad_ingreso = transaccion.cantidad_ingreso_salida;
            transaccion.cantidad_ingreso = parseInt(transaccion.cantidad_ingreso);
            transaccion.cantidad_salida = 0;
        } 
        // Salida
        else if (transaccion.id_tipo_transaccion === "2") {
            transaccion.cantidad_salida = transaccion.cantidad_ingreso_salida;
            transaccion.cantidad_salida = parseInt(transaccion.cantidad_salida);
            transaccion.cantidad_ingreso = 0;
        }
        else {
            transaccion.cantidad_salida = 0;
            transaccion.cantidad_ingreso = 0;
            transaccion.cantidad_ingreso_salida = 0;
        }
        // Recuperacion de id del user 
        transaccion.id_usuario = user.id_usuario;
        transaccion.id_producto = id_producto_selecionado; 

        //console.log("Transaccion objeto>>>> ", transaccion); // Aquí se muestra el objeto de transacción
        
        if (
            transaccion.id_tipo_transaccion || 
            transaccion.id_producto || 
            transaccion.cod_producto || 
            transaccion.id_usuario || 
            transaccion.cantidad_ingreso_salida || 
            transaccion.cantidad_ingreso || 
            transaccion.detalle_transaccion
        ) {
                /* Control limite de salida */
            if ( transaccion.cantidad_salida > producto.stok_actual_producto) {
                console.log(producto.stok_actual_producto);
                alert('Cantidad insuficiente en inventario');
            } else {
                try {
                    const response = await axios.post('https://viverobackend-production.up.railway.app/api/transaccion', transaccion);
                    
                    console.log("Respuesta del servidor:", response); // Aquí se muestra la respuesta del servidor
                    
                    if (response.status === 201) {
                        console.log("Transaccion realizada con éxito");
                        navegar('/transacciones');
                    } else {
                        console.error("Error al crear la transaccion. Respuesta inesperada:", response);
                    }
                    setSubmitting(false);
                } catch (error) {
                    console.error("Error al enviar los datos:", error); // Aquí se muestra si hubo un error al enviar la transacción
                }
            }
            
        } else {
            alert("Llenes los campos");
            console.log('llene todo');
            setSubmitting(false);
        }
    };

    const handleCancelClick = () => {
        // Navega hacia atrás en la historia del navegador
        window.history.back();
    };

    const validationSchema = yup.object().shape({
        id_tipo_transaccion: yup.string().required("Campo obligatorio"),
        id_producto: yup.string().required("Campo obligatorio"),
        cod_producto: yup.string().required("Campo obligatorio"),
        id_usuario: yup.string().required("Campo obligatorio"),
        cantidad_ingreso: yup.string().required("Campo obligatorio"),
        cantidad_ingreso_salida: yup.string().required("Campo obligatorio"),
        detalle_transaccion: yup.string().required("Campo obligatorio"),
    });

    return (
        <div className="form-container">
        <div className="form-content">
            <Formik
            initialValues={initialValues}
            /*  validationSchema={validationSchema} */
            onSubmit={handleSubmit}
            >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                <h3 className="h3-registrar">Transaccion de producto</h3>
                <Row className="mb-5">
                    <Col md="6">
                    <Form.Group as={Col} controlId="validationFormik02">
                        <Form.Label>Codigo de producto*</Form.Label>
                        <Field
                        type="text"
                        name="cod_producto"
                        placeholder="Ingrese el código de producto"
                        className={`form-control ${
                            touched.cod_producto && errors.cod_producto
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ backgroundColor: "#A4BE7B" }}
                        onChange={(e) => {
                            handleChange(e);
                            handleCodigoProductoChange(e);
                        }}
                        />
                        <ErrorMessage
                        name="cod_producto"
                        component="div"
                        className="invalid-feedback"
                        />
                    </Form.Group>
                    </Col>

                        <Col md="6">
                        <Form.Group as={Col} controlId="validationFormik03">
                            <Form.Label>Nombre de producto</Form.Label>
                            <Form.Control
                            type="text"
                            name="nombre_producto"
                            value={selectedProduct.nombre_producto}
                            readOnly
                            style={{ backgroundColor: "#A4BE7B" }}
                            />
                        </Form.Group>
                        </Col>
                        <Col md="6">
                        <Form.Group as={Col} controlId="validationFormik04">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                            type="text"
                            name="nombre_categoria"
                            value={selectedProduct.nombre_categoria}
                            readOnly
                            style={{ backgroundColor: "#A4BE7B" }}
                            />
                        </Form.Group>
                        </Col>
                        <Col md="6">
                        <Form.Group as={Col} controlId="validationFormik05">
                            <Form.Label>Tamaño</Form.Label>
                            <Form.Control
                            type="text"
                            name="tamanio_producto"
                            value={selectedProduct.tamanio_producto}
                            readOnly
                            style={{ backgroundColor: "#A4BE7B" }}
                            />
                        </Form.Group>
                        </Col>
                    
                </Row>

                <Row className="mb-5">
                    <Col md="6">
                    <Form.Group as={Col} controlId="validationFormik06">
                        <Form.Label>Tipo de Transaccion</Form.Label>
                        <Form.Control
                        as="select"
                        name="id_tipo_transaccion"
                        value={values.id_tipo_transaccion}
                        onChange={handleChange}
                        style={{ backgroundColor: "#A4BE7B" }}
                        className={`form-control ${
                            touched.id_tipo_transaccion && errors.id_tipo_transaccion
                            ? "is-invalid"
                            : ""
                        }`}
                        >
                        <option  value="">Seleccionar</option>
                            {transacciones.map(transaccion => (
                                <option key={transaccion.id_tipo_transaccion} value={transaccion.id_tipo_transaccion}>
                                {transaccion.tipo_transaccion}
                                </option>
                            ))}
                        </Form.Control>
                        <ErrorMessage
                        name="id_tipo_transaccion"
                        component="div"
                        className="invalid-feedback"
                        />
                    </Form.Group>
                    </Col>

                    <Col md="6">
                    <Form.Group controlId="validationFormik07">
                        <Form.Label>Cantidad a ingresar o retirar*</Form.Label>
                        <Field
                        type="text"
                        name="cantidad_ingreso_salida"
                        placeholder="Ingrese la cantidad a ingresar o retirar"
                        className={`form-control ${
                            touched.cantidad_ingreso_salida && errors.cantidad_ingreso_salida
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ backgroundColor: "#A4BE7B" }}
                        />
                        <ErrorMessage
                        name="cantidad_ingreso_salida"
                        component="div"
                        className="invalid-feedback"
                        />                                                      
                    </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                        <Form.Group as={Col} md="12">
                        <Form.Label>Descripción (opcional)</Form.Label>
                        <Field
                            as="textarea"
                            name="detalle_transaccion"
                            placeholder="Descripción"
                            rows="3"
                            className={`form-control ${
                            touched.detalle_transaccion && errors.detalle_transaccion
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{ backgroundColor: "#A4BE7B" }}
                        />
                        <ErrorMessage
                            name="detalle_transaccion"
                            component="div"
                            className="invalid-feedback"
                        />
                        </Form.Group>
                    </Row>

                <div className="btn-form">
                    <Button type="submit" >
                    Guardar
                    <Icon icon="lets-icons:check-fill" color="white" width="25" height="25" />
                    </Button>{" "}
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

export default FormTransacciones;
