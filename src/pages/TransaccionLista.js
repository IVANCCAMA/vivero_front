import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
import './transaccion.css'
import { Link } from "react-router-dom";

function TransaccionLista (){
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        fetchData();
        }, []); 
    
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/transaccion");
            setTransacciones(response.data);
        } catch (error) {
            console.error("Error al obtener las transacciones:", error);
        }
        };
    return(
        <div>
            <table className="listaP">
            <thead className="txt-transaccion">
                <tr>
                <th>ID</th>
                <th>Ralizado por</th>
                <th>producto</th>
                <th>Tipo transaccion</th>
                <th>Cantidad entrada</th>
                <th>Cantidad salida</th>
                <th>Fecha de Transaccion</th>
                <th>Acciones</th> 
                </tr>
            </thead>
            <tbody className="txt-transaccion">
            {transacciones.map((transaccion) => (
                <tr key={transaccion.id_transaccion}>
                <td>{transaccion.id_transaccion}</td>
                <td>{transaccion.nombre_usuario}</td>
                <td>{transaccion.nombre_producto}</td>
                <td>{transaccion.tipo_transaccion}</td>
                <td>{transaccion.cantidad_ingreso}</td>
                <td>{transaccion.cantidad_salida}</td>
                <td>{transaccion.fecha_transaccion}</td>
                <td>
                <Link to={`/transacciones/ver/${transaccion.id_transaccion}`}>
                <button className="btn-ver-transaccion">
                <Icon className="icon"  icon="carbon:view-filled" color="white" width="18" height="18" />
                    ver
                </button>
                </Link>
                </td> 
                </tr>
                    ))}
                </tbody> 
                    </table>
        </div>
    )
}
export default TransaccionLista;