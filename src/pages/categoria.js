import React, { useState, useEffect } from 'react';
import SubMenuInventario from '../components/SubMenuInventario';
import { Link } from 'react-router-dom';
import './categoria.css';
import CategoriaLista from '../components/CategoriaLista';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import penImage from '../img/logo.png';
import { Icon } from '@iconify/react';


const Categoria = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchData();
  }, []);

  const generarPDFcategorias = () => {
    if (categorias.length > 0) {
      const doc = new jsPDF();
      const imageURL = penImage;
  
      // Asegúrate de que las coordenadas y dimensiones sean válidas
      doc.addImage(imageURL, 'JPEG', 10, 10, 25, 15);
  
      // Definir formato del documento
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Lista de Categorías', 90, 20);
  
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
  
      // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
      doc.text('Vivero Corazon de Bolivia', 25, 30);
  
      const startY = 40;
  
      // Agregar detalles de las categorías usando jspdf-autotable
      const columns = ['Id', 'Nombre', 'Descripción'];
      const data = categorias.map((categoria) => [
        categoria.id_categoria,
        categoria.nombre_categoria,
        categoria.descripcion_categoria,
      ]);
  
      doc.autoTable({
        head: [columns],
        body: data,
        startY: startY,
        headStyles: {
          fillColor: [40, 84, 48], // Color verde fuerte en formato RGB
        },
        bodyStyles: {
          fillColor: [229, 217, 182], // Color verde fuerte en formato RGB
        },
      }); 

      doc.save('Lista Categorias.pdf');
    }
  };
    
  return (
    <div >
      <p className='TextoCategoria'>Categoría</p>
      <SubMenuInventario />
      <div className="botonesCat">
        <div className="crearcat">
          <button className="botonImprimirLista" onClick={generarPDFcategorias}>
            Descargar PDF
            <Icon icon="line-md:download-loop" color="white" width="26" height="24" onClick={generarPDFcategorias} />
          </button>
          <Link to="/inventario/categoria/formcategoria">
            <button className="botonCategoria">
            Crear Categoría
           {/*  <Icon icon="gridicons:create" color="white" width="20" height="20" /> */}
            </button>
          </Link>
        </div>
      </div>
      <div className="CategoriaLista">
        <CategoriaLista />
      </div>
    </div>
  );
};
export default Categoria;
