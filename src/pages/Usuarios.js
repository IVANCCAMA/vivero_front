import '../App.css';
import './Usuario.css'
import React, { useState, useEffect } from 'react';
import UsuarioLista from './UsuarioLista';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import penImage from '../img/logo.png';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://viverobackend-production.up.railway.app/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchData();
    }, []);

    const generarPDFUsuarios = () => {
        if (usuarios.length > 0) {
            const doc = new jsPDF();
            const imageURL = penImage;

            // Asegúrate de que las coordenadas y dimensiones sean válidas
            doc.addImage(imageURL, 'JPEG', 10, 10, 25, 15);

            // Definir formato del documento
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text('Lista de Usuarios', 90, 40);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

             // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
             doc.setFontSize(10);
             doc.text('Vivero Corazon de Bolivia', 25, 10);
             doc.text('NIT 5243380015', 25, 15); 
 
             doc.text('PASCUAL CHAMBI DOMINGO', 120, 10);
             doc.text('CALLE INNOMINADA NRO.', 120, 15); 
             doc.text('SN ZONA/BARRIO:', 120, 20); 
             doc.text('TUSCAPUGIO ALTO COCHABAMBA', 120, 25);
     

            const startY = 50;

            // Agregar detalles de las categorías usando jspdf-autotable
            const columns = ['Id', 'Nombre completo', 'CI', 'Celular', 'Correo Electronico', 'Rol', 'Fecha de Creacion', 'Fecha de modificacion'];
            const data = usuarios.map((usuario) => [
                usuario.id_usuario,
                usuario.nombre_usuario,
                usuario.ci_usuario,
                usuario.celular_usuario,
                usuario.correo_usuario,
                usuario.tipo_usuario,
                usuario.fecha_registro_usuario,
            ]);

            doc.autoTable(columns, data, {
                startY: startY,
                headStyles: {
                    fillColor: [40, 84, 48], // Color verde fuerte en formato RGB
                },
                bodyStyles: {
                    fillColor: [229, 217, 182], // Color verde fuerte en formato RGB
                },
            });

            doc.save('Lista Usuarios.pdf');
        }
    };

    return (
        <div className="">
            <h5>Usuarios</h5>
            <div className='botonUsuario'>
                <button className='btn-usuarioD' onClick={generarPDFUsuarios}>
                    Descargar PDF
                    <Icon icon="line-md:download-loop" color="white" width="26" height="24" onClick={generarPDFUsuarios} />
                </button> {' '}
                <Link to='/usuarios/crearUsuario'>
                    <button className='btn-usuarioC'>
                        Agregar usuario
                    </button>
                </Link>
            </div>
            <UsuarioLista />
        </div>
    );
}
export default Usuarios;