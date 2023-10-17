import '../App.css';
import React from 'react';
import SubMenuInventario from '../components/SubMenuInventario';
import { Link } from "react-router-dom";
import './categoria.css'
import CategoriaLista from '../components/CategoriaLista';

const Categoria = () => {
  return (
    <div className="division">
      <p>Categoría</p>
      <SubMenuInventario /> 
      <div className="crearcat">
      <Link to="/inventario/categoria/formcategoria">
      <button  className="botonC">Crear categoria</button>
    </Link>
    </div>
    <table className='tablee'>
          <th className='namec'>Nombre</th>
              <th className='desc'>Descripción</th>
              <th className='acci'>Acciones</th>
              </table>
            <div>
            <CategoriaLista/>
            </div>
           
          
          
    </div>
  );
};

export default Categoria;
