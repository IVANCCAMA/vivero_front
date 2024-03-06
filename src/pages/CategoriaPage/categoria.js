import React, { useState, useEffect } from "react";
import SubMenuInventario from "../../components/Menu/SubMenuInventario";
import { Link } from "react-router-dom";
import "./categoria.scss";
import CategoriaLista from "../../components/Categoria/CategoriaLista";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import logoPDF from "../../img/logo.png";
import { Icon } from "@iconify/react";

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://viverobackend-production.up.railway.app/api/categorias"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchData();
  }, []);

  const generarPDFcategorias = () => {
    if (categorias.length > 0) {
      const doc = new jsPDF();
      const imageURL = logoPDF;

      // Asegúrate de que las coordenadas y dimensiones sean válidas
      doc.addImage(imageURL, "JPEG", 10, 10, 25, 15);

      // Definir formato del documento
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Lista de Categorías", 90, 40);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // Ajusta las coordenadas para "Vivero Corazon de Bolivia"
      doc.setFontSize(10);
      doc.text("Vivero Corazon de Bolivia", 25, 10);
      doc.text("NIT 5243380015", 25, 15);

      doc.text("PASCUAL CHAMBI DOMINGO", 130, 10);
      doc.text("CALLE INNOMINADA NRO.", 130, 15);
      doc.text("SN ZONA/BARRIO:", 130, 20);
      doc.text("TUSCAPUGIO ALTO COCHABAMBA", 130, 25);

      const startY = 50;

      // Agregar detalles de las categorías usando jspdf-autotable
      const columns = ["Id", "Nombre", "Descripción"];
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

      doc.save("Lista Categorias.pdf");
    }
  };

  return (
    <div>
      <div className="container">
        <h5 className="TextoCategoria">Categoría</h5>
        <div className="row">
          <div className="col">
            <SubMenuInventario />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row btn-Categorias text-end">
          <div className="col">
            <button
              className="btn btn-secondary mb-2 text-center"
              onClick={generarPDFcategorias}
            >
              <Icon
                icon="line-md:download-loop"
                color="white"
                width="26"
                height="24"
                onClick={generarPDFcategorias}
              />
              Descargar PDF
            </button>
            <Link  className="btn btn-success ms-md-2  mb-2 text-center" to="/inventario/categoria/formcategoria">
                <Icon
                  icon="gridicons:create"
                  color="white"
                  width="24"
                  height="24"
                />
                Crear Categoría
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col p-2">
            <CategoriaLista />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categoria;
