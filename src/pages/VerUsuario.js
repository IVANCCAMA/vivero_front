import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
/* import './VerProductos.css'; */

import penImage from '../img/logo.png'; 


const VerUsuario = () => {
    const { id_usuario } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/usuarios/${id_usuario}`);
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles del usuario:", error);
            }
        };

        fetchData();
    }, [id_usuario]);

    const generarPDF = () => {
        if (usuario) {
            const doc = new jsPDF();
    
            const imageURL = penImage;

            // Asegúrate de que las coordenadas y dimensiones sean válidas
            doc.addImage(imageURL, 'JPEG', 1, 1,25,15);
    
            // Definir formato del documento
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('Usuario', 95, 20);
    
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
    
            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            doc.setFontSize(10);
            doc.text('Vivero Corazon de Bolivia', 25, 10); 
    
            const startY = 40;
            /* const lineHeight = 10; */

            // Agregar detalles del usuario usando jspdf-autotable
            const columns = ['Campo', 'Valor'];
            const data = [
                ['Id', usuario.id_usuario],
                ['Nombre completo', usuario.nombre_usuario],
                ['Cedula de Identidad', usuario.ci_usuario],
                ['Celular', usuario.celular_usuario],
                ['Correo', usuario.correo_usuario],
                ['Contraseña', usuario.contrasenia_usuario],
                ['Fecha de nacimiento', usuario.fecha_nacimiento_usuario],
                ['Genero', usuario.genero_usuario],
                ['Rol', usuario.tipo_usuario],
                ['Fecha de creacion', usuario.fecha_registro_usuario],
                ['Fecha de modificacion',usuario.fecha_modificacion] 
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

            doc.save(`VerUsuario_${usuario.id_usuario}.pdf`);
        }
    };
    return (
            <div>
                <h2 className='h22'>Usuario</h2>
                <div>
                    
                    {usuario ? (
                        <div className="detalle">
                            <table className="product-details-table">
        <tbody className='LetraVerProducto'>
        <tr className='campoV'>
            
                <td><strong >Campo</strong></td>
                <td><strong>Valor</strong></td>
            </tr>
            <tr>
                <td><strong>Id:</strong></td>
                <td>{usuario.id_usuario}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Nombre completo:</strong></td>
                <td>{usuario.nombre_usuario}</td>
            </tr>
            <tr>
                <td><strong>Cedula de Identidad:</strong></td>
                <td>{usuario.ci_usuario}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Celular:</strong></td>
                <td>{usuario.celular_usuario}</td>
            </tr>
            <tr>
                <td><strong>Correo:</strong></td>
                <td>{usuario.correo_usuario}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Contraseña:</strong></td>
                <td>{usuario.contrasenia_usuario}</td>
            </tr>
            <tr>
                <td><strong>Fecha de nacimiento:</strong></td>
                <td>{usuario.fecha_nacimiento_usuario}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Genero:</strong></td>
                <td>{usuario.genero_usuario}</td>
            </tr>
            <tr >
                <td><strong>Rol:</strong></td>
                <td>{usuario.tipo_usuario}</td>
            </tr>
            <tr className='fila'>
                <td><strong>Fecha de creacion:</strong></td>
                <td>{usuario.fecha_registro_usuario}</td>
            </tr>
            <tr >
                <td><strong>Fecha de modificacion:</strong></td>
                <td>{usuario.fecha_modificacion}</td>
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

export default VerUsuario;