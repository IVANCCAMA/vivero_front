import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

import penImage from '../img/logo.png'; 


const VerTransaccion = () => {
    const { id_transaccion } = useParams();
    const [transaccion, setTransaccion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/transaccion/${id_transaccion}`);
                setTransaccion(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles del transaccion:", error);
            }
        };

        fetchData();
    }, [id_transaccion]);

    const generarPDF = () => {
        if (transaccion) {
            const doc = new jsPDF();
    
            const imageURL = penImage;

            // Asegúrate de que las coordenadas y dimensiones sean válidas
            doc.addImage(imageURL, 'JPEG', 1, 1,25,15);
    
            // Definir formato del documento
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('Transaccion', 95, 40);
    
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
    
            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            doc.setFontSize(10);
            doc.text('Vivero Corazon de Bolivia', 25, 10);
            doc.text('NIT 5243380015', 25, 15); 

            doc.text('PASCUAL CHAMBI DOMINGO', 130, 10);
            doc.text('CALLE INNOMINADA NRO.', 130, 15); 
            doc.text('SN ZONA/BARRIO:', 130, 20); 
            doc.text('TUSCAPUGIO ALTO COCHABAMBA', 130, 25);
    
            const startY = 50;
            /* const lineHeight = 10; */

            // Agregar detalles del transaccion usando jspdf-autotable
            const columns = ['Campo', 'Valor'];
            const data = [
                ['Id', transaccion.id_transaccion],
                /*['Codigo', transaccion.cod_producto],*/
                ['Nombre de producto', transaccion.nombre_producto],
                /*['Categoria', transaccion.nombre_categoria],
                ['Tamaño', transaccion.tamanio_producto],*/
                ['Realizado por:', transaccion.nombre_usuario],
                ['Tipo de transaccion', transaccion.id_tipo_transaccion],
                ['Cantidad de ingreso', transaccion.cantidad_ingreso],
                ['Cantidad de salida', transaccion.cantidad_salida],
                ['Detalle de transaccion', transaccion.detalle_transaccion],
                ['Fecha de transaccion', transaccion.fecha_transaccion]
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

            doc.save(`Transaccion ${transaccion.id_transaccion}.pdf`);
        }
    };
    return (
            <div>
                <h2 className='h22'>Transaccion</h2>
                <div>
                    
                    {transaccion ? (
                        <div className="detalle">
                            <table className="product-details-table">
        <tbody className='LetraVerProducto'>
        <tr className='campoV'>
            
                <td><strong >Campo</strong></td>
                <td><strong>Valor</strong></td>
            </tr>
            <tr className='fila'>
                <td><strong>Id:</strong></td>
                <td>{transaccion.id_transaccion}</td>
            </tr>
            {/* <tr className='fila'>
                <td><strong>Codigo:</strong></td>
                <td>{transaccion.cod_producto}</td>
            </tr> */}
            <tr>
                <td><strong>Nombre de producto:</strong></td>
                <td>{transaccion.nombre_producto}</td>
            </tr>
            {/*  <tr className='fila'>
                <td><strong>Categoria:</strong></td>
                <td>{transaccion.nombre_categoria}</td>
            </tr>
            <tr>
                <td><strong>Tamaño:</strong></td>
                <td>{transaccion.tamanio_producto}</td>
            </tr> */}
            <tr className='fila'>
                <td><strong>Realizado por:</strong></td>
                <td>{transaccion.nombre_usuario}</td>
            </tr>
            <tr>
                <td><strong>Tipo de transaccion:</strong></td>
                <td>{transaccion.id_tipo_transaccion}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Cantidad de ingreso:</strong></td>
                <td>{transaccion.cantidad_ingreso}</td>
            </tr>
            <tr>
                <td><strong>Cantidad de salida:</strong></td>
                <td>{transaccion.cantidad_salida}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Detalle de transaccion:</strong></td>
                <td>{transaccion.detalle_transaccion}</td>
            </tr>
            <tr>
                <td><strong>Fecha de transaccion:</strong></td>
                <td>{transaccion.fecha_transaccion}</td>
            </tr>
            
        </tbody>
    </table>

                    <button className='botonPdf' onClick={generarPDF}>Descargar PDF</button>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
        </div>
    );
};

export default VerTransaccion;