    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import Button from "react-bootstrap/Button";
    import Col from "react-bootstrap/Col";
    import Form from "react-bootstrap/Form";
    import Row from "react-bootstrap/Row";
    import * as yup from "yup";
    import { Formik, Field, ErrorMessage } from "formik";

    const FormTransacciones = () => {
    const [productos, setProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({
        nombre_producto: "",
        tamanio_producto: "",
        nombre_categoria: "",
    });

    useEffect(() => {
        axios
        .get("http://localhost:4000/api/productos")
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
        const productoEncontrado = productos.find(
        (producto) => producto.cod_producto === codigoProducto
        );

        if (productoEncontrado) {
        // Si se encuentra un producto, asigna sus valores a selectedProduct
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

    const handleCancelClick = () => {
        // Navega hacia atrás en la historia del navegador
        window.history.back();
    };

    const initialValues = {
        id_tipo_transaccion: "",
        id_producto: "",
        cod_producto: "",
        id_usuario: "",
        cantidad_salida: "",
        detalle_transaccion: "",
    };

    const validationSchema = yup.object().shape({
        id_tipo_transaccion: yup.string().required("Campo obligatorio"),
        id_producto: yup.string().required("Campo obligatorio"),
        cod_producto: yup.string().required("Campo obligatorio"),
        id_usuario: yup.string().required("Campo obligatorio"),
        cantidad_salida: yup.string().required("Campo obligatorio"),
        detalle_transaccion: yup.string().required("Campo obligatorio"),
    });

    return (
        <div className="form-container">
        <div className="form-content">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
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
                    {selectedProduct.nombre_producto && (
                    <>
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
                    </>
                    )}
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
                        <option value="">Seleccionar</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Salida">Salida</option>
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
                        name="cantidad_salida"
                        placeholder="Ingrese la cantidad a ingresar o retirar"
                        className={`form-control ${
                            touched.cantidad_salida && errors.cantidad_salida
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ backgroundColor: "#A4BE7B" }}
                        />
                        <ErrorMessage
                        name="cantidad_salida"
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

    export default FormTransacciones;
