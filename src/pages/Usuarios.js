import '../App.css';
import './Usuario.css'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import UsuarioLista from './UsuarioLista';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import penImage from '../img/logo.png';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

        useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get('http://localhost:4000/api/usuarios');
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
            doc.text('Lista de Usuarios', 90, 20);
        
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
        
            // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
            doc.text('Vivero Corazon de Bolivia', 25, 30);
        
            const startY = 40;
        
            // Agregar detalles de las categorías usando jspdf-autotable
            const columns = ['Id', 'Nombre completo', 'CI','Celular','Correo Electronico','Rol','Fecha de Creacion', 'Fecha de modificacion'];
            const data = usuarios.map((usuario) => [
                usuario.id_usuario,
                usuario.nombre_usuario,
                usuario.ci_usuario,
                usuario.celular_usuario,
                usuario.correo_usuario,
                usuario.id_tipo_usuario,
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
        <p>Lista de Usuarios</p>
        <div className='botonUsuario'>
        <Button onClick={generarPDFUsuarios}  
        type=""
        style={{ backgroundColor: '#4f350f'}}>
        Imprimir</Button> {' '}
        <Button href="/usuarios/crearUsuario"  
        type="submit"
        style={{ backgroundColor: '#5F8D4E' }}>
        Agregar usuario</Button>
        </div>
        <UsuarioLista/>
        
    </div>
    );
}
export default Usuarios;