
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faListAlt, faUsers, faExchangeAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    const [productosCantidad, setProductosCantidad] = useState(0);
    const [CategoriasCantidad, setCategoriasCantidad] = useState(0);
    const [UsuariosCantidad, setUsuariosCantidad] = useState(0);
    const [TransaccionesCantidad, setTransaccionesCantidad] = useState(0);
    useEffect(() => {
        fetch('http://localhost:4000/api/productos')
            .then((response) => response.json())
            .then((data) => {
                // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
                if (Array.isArray(data)) {
                    setProductosCantidad(data.length);
                }
            })
            .catch((error) => {
                console.error('Error al obtener la cantidad de productos :', error);
            });


            fetch('http://localhost:4000/api/categorias')
            .then((response) => response.json())
            .then((data) => {
                // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
                if (Array.isArray(data)) {
                    setCategoriasCantidad(data.length);
                }
            })
            .catch((error) => {
                console.error('Error al obtener la cantidad de productos :', error);
            });


            fetch('http://localhost:4000/api/usuarios')
            .then((response) => response.json())
            .then((data) => {
                // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
                if (Array.isArray(data)) {
                    setUsuariosCantidad(data.length);
                }
            })
            .catch((error) => {
                console.error('Error al obtener la cantidad de productos :', error);
            });


            fetch('http://localhost:4000/api/transaccion')
            .then((response) => response.json())
            .then((data) => {
                // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
                if (Array.isArray(data)) {
                    setTransaccionesCantidad(data.length);
                }
            })
            .catch((error) => {
                console.error('Error al obtener la cantidad de productos :', error);
            });
    }, []);

    
    return (
    <div className="division">
        
        <Link to="/inventario/producto" className='panel-Producto'>
                <div className='icon-panel'>
                    <FontAwesomeIcon icon={faBoxes} size="3x" />
                </div>
                <div className='panel-letras'>
                    <h5>Productos</h5>
                    <p>{productosCantidad}</p>
                </div>
            </Link>
        
        <Link to="/inventario/categoria" className='panel-Categoria'>
            <div className='icon-panel'>
            <FontAwesomeIcon icon={faListAlt} size="3x" />
            </div>
                <div className='panel-letras'>
                <h5>Categorias</h5>
                    <p>{CategoriasCantidad}</p>
                </div>
        </Link>

        <Link to="/usuarios" className='panel-Usuario'>
            <div className='icon-panel'>
            <FontAwesomeIcon icon={faUsers} size="3x" />
            </div>
                <div className='panel-letras'>
                <h5>Usuarios</h5>
                    <p>{UsuariosCantidad}</p>
                </div>
        </Link>

        <Link to="/transacciones" className='panel-Transaccion'>
            <div className='icon-panel'>
            <FontAwesomeIcon icon={faExchangeAlt} size="3x" />
            </div>
                <div className='panel-letras'>
                <h5>Transacciones</h5>
                    <p>{TransaccionesCantidad}</p>
                </div>     
        </Link>

        <Link to="/reportes" className='panel-Reporte'>
            <div className='icon-panel'>
            <FontAwesomeIcon icon={faChartBar} size="3x" />
            </div>
                <div className='panel-letras'>
                <h5>Reportes</h5>
                    <p>18</p>
                </div>
        </Link>

        <div className='panel-F'>
        <div className='panel-letras'>``
        <h5>.</h5>
            <p>18</p>
        </div>
            
        </div>
    </div>
    );
}
export default Home;