import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import './VerProductos.css';
import penImage from '../img/logo.png';
import { Icon } from '@iconify/react';


const VerProducto = () => {
    const { id_producto } = useParams();
    const [producto, setProducto] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [URL_imagen, setURL_imagen] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://viverobackend-production.up.railway.app/api/productos/${id_producto}`);
                setProducto(response.data);
                setURL_imagen(response.data.imagen_producto)
            } catch (error) {
                console.error("Error al obtener los detalles del producto:", error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generarPDF = async () => {
        if (producto) {
            const doc = new jsPDF();

            const imageURL = penImage;

            // Asegúrate de que las coordenadas y dimensiones sean válidas
            doc.addImage(imageURL, 'JPEG', 1, 1, 25, 15);

            // Definir formato del documento
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('Producto', 95, 40);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            doc.setFontSize(10);
            doc.text('Vivero Corazon de Bolivia', 25, 10);
            doc.text('NIT 5243380015', 25, 15);

            doc.text('PASCUAL CHAMBI DOMINGO', 130, 10);
            doc.text('CALLE INNOMINADA NRO.', 130, 15);
            doc.text('SN ZONA/BARRIO:', 130, 20);
            doc.text('TUSCAPUGIO ALTO COCHABAMBA', 130, 25);

            if (producto.imagen_producto) {
                try {

                    console.log("ANTES>>>", URL_imagen);
                    
                    const imgX = 2;
                    const imgY = 100;
                    const imgWidth = 80;
                    const imgHeight = 80;

                    // Agregar la imagen al documento
                    doc.addImage(URL_imagen, 'JPEG', imgX, imgY, imgWidth, imgHeight);
                } catch (error) {
                    console.error('Error al cargar o agregar la imagen:', error.message);
                }
            }

            doc.text('Detalle de producto:', 15, 118);
            const startY = 120;
            /* const lineHeight = 10; */

            // Agregar detalles del producto usando jspdf-autotable
            const columns = ['Campo', 'Valor'];
            const data = [
                ['Id', producto.id_producto],
                ['Codigo', producto.cod_producto],
                ['Nombre', producto.nombre_producto],
                ['Categoría', producto.nombre_categoria],
                ['Precio inicial', producto.precio_inicial_producto],
                ['Margen', producto.margen_producto],
                ['Precio total', producto.precio_total_producto],
                ['Tamaño', producto.tamanio_producto],
                ['Descripción', producto.descripcion_producto],
                /* ['Stock actual', producto.stock_actual_producto], */
                ['Stock actual', producto.stok_actual_producto],
                ['Stock mínimo', producto.stok_min_producto],
                ['Fecha creacion', producto.fecha_creacion],
                ['Fecha modificacion', producto.fecha_modificacion]
            ];

            doc.autoTable({
                head: [columns],
                body: data,
                startY: startY,
                headStyles: {
                    fillColor: [40, 84, 48]
                },
                bodyStyles: {
                    fillColor: [229, 217, 182]
                }
            });

            doc.save(`VerProducto_${producto.id_producto}.pdf`);
        }
    };

    return (
        <div>
            <h2 className='h22'>Producto</h2>
            <div>

                {producto ? (
                    <div className="detalle">
                        <div className='imagenV'>
                            {producto.imagen_producto && (
                                <img
                                    src={producto.imagen_producto}
                                    alt="Producto"
                                    style={{ maxWidth: '180px' }}
                                />
                            )}
                        </div>
                        <table className="product-details-table">
                            <tbody className='LetraVerProducto'>
                                <tr className='campoV'>

                                    <td><strong >Campo</strong></td>
                                    <td><strong>Valor</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Id:</strong></td>
                                    <td>{producto.id_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Codigo:</strong></td>
                                    <td>{producto.cod_producto}</td>
                                </tr>
                                <tr >
                                    <td><strong>Nombre:</strong></td>
                                    <td>{producto.nombre_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Categoría:</strong></td>
                                    <td>{producto.nombre_categoria}</td>
                                </tr>
                                <tr >
                                    <td><strong>Precio inicial:</strong></td>
                                    <td>{producto.precio_inicial_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Margen:</strong></td>
                                    <td>{producto.margen_producto}</td>
                                </tr>
                                <tr>
                                    <td><strong>Precio total:</strong></td>
                                    <td>{producto.precio_total_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Tamaño:</strong></td>
                                    <td>{producto.tamanio_producto}</td>
                                </tr>
                                <tr>
                                    <td><strong>Descripción:</strong></td>
                                    <td>{producto.descripcion_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Stock actual:</strong></td>
                                    <td>{producto.stok_actual_producto}</td>
                                </tr>
                                <tr>
                                    <td><strong>Stock mínimo:</strong></td>
                                    <td>{producto.stok_min_producto}</td>
                                </tr>
                                <tr className='fila'>
                                    <td><strong>Fecha creacion:</strong></td>
                                    <td>{producto.fecha_creacion}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fecha modificacion:</strong></td>
                                    <td>{producto.fecha_modificacion}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button className='botonPdf' onClick={generarPDF}>
                            Descargar PDF
                            <Icon icon="line-md:download-loop" color="white" width="26" height="24" onClick={generarPDF} />
                        </button>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
};

export default VerProducto;