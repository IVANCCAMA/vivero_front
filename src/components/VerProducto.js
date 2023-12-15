    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import { jsPDF } from 'jspdf';
    import 'jspdf-autotable';
    import axios from 'axios';
    import './VerProductos.css';
    import penImage from '../img/logo.png'; 


    const VerProducto = () => {
        const { id_producto } = useParams();
        const [producto, setProducto] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/productos/${id_producto}`);
                    setProducto(response.data);
                } catch (error) {
                    console.error("Error al obtener los detalles del producto:", error);
                }
            };

            fetchData();
        }, [id_producto]);

        const generarPDF = () => {
            if (producto) {
                const doc = new jsPDF();
        
                const imageURL = penImage;

                // Asegúrate de que las coordenadas y dimensiones sean válidas
                doc.addImage(imageURL, 'JPEG', 1, 1,25,15);
        
                // Definir formato del documento
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(16);
                doc.setTextColor(0, 0, 0);
                doc.text('Producto', 95, 20);
        
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                doc.text('Detalles de producto', 13, 115);
        
                // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
                doc.setFontSize(10);
                doc.text('Vivero Corazon de Bolivia', 25, 10); 
        
                if (producto.imagen_producto) {
                    const imgData = `data:image/jpeg;base64,${producto.imagen_producto}`;
        
                    // Asegúrate de que las coordenadas sean válidas
                    const imgX = 2;
                    const imgY = 100;
        
                    // Ajusta el tamaño de la imagen según tus necesidades
                    const imgWidth = 80;
                    const imgHeight = 80;
        
                    doc.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight);
                } else {
                    // URL de una imagen de marcador de posición de Lorem Picsum
                    const placeholderImageURL = 'https://picsum.photos/200/200';
        
                    // Asegúrate de que las coordenadas sean válidas
                    const imgX = 70;
                    const imgY = 30;
        
                    // Ajusta el tamaño de la imagen según tus necesidades
                    const imgWidth = 80;
                    const imgHeight = 80;
        
                    doc.addImage(placeholderImageURL, 'JPEG', imgX, imgY, imgWidth, imgHeight);
                }
                
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
                    ['Fecha modificacion',producto.fecha_modificacion] 
                ];

                doc.autoTable(columns, data, {
                    startY: startY,
                    headStyles: {
                        fillColor: [40, 84, 48] // Color verde fuerte en formato RGB
                    },
                    bodyStyles: {
                    fillColor: [229, 217, 182] // Color verde fuerte en formato RGB 
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

                        <button className='botonPdf' onClick={generarPDF}>Imprimir</button>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
            </div>
        );
    };

    export default VerProducto;