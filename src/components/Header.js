import logo from '../img/logo.png';
import { Icon } from '@iconify/react';
import './menu.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Header(){
    const { id_transaccion } = useParams();
  const [transaccion, setTransaccion] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(""); // Nuevo estado para almacenar el nombre del usuario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/transaccion/${id_transaccion}`);
        setTransaccion(response.data);
        setNombreUsuario(response.data.nombre_usuario); // Actualizar el estado con el nombre del usuario
      } catch (error) {
        console.error("Error al obtener los detalles del transaccion:", error);
      }
    };

    fetchData();
  }, [id_transaccion]);
    return(
        <header className='header'>
    <div className='header1'>
    <img className='logo' src={logo} alt="Logo" />
        <h4 className='texto'>SISTEMA GESTION DE INVENTARIO</h4>
        <div className='profile-container'>
        <p className='name-perfil'>Jhoselyn Ossio Mamani{nombreUsuario}</p>
        <Icon className='icono-perfil' icon="iconamoon:profile-circle-fill" color="white" width="50" height="50" /> 
        </div>
    </div>
    
    </header>
    )

}
export default Header;