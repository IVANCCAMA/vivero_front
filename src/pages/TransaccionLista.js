import React, { useState, useEffect } from "react";
import axios from "axios";

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
            <thead>
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
            <tbody>
            {transacciones.map((transaccion) => (
                <tr key={transaccion.id_transaccion}>
                <td>{transaccion.id_transaccion}</td>
                <td>{transaccion.id_usuario}</td>
                <td>{transaccion.id_producto}</td>
                <td>{transaccion.id_tipo_transaccion}</td>
                <td>{transaccion.cantidad_ingreso}</td>
                <td>{transaccion.cantidad_salida}</td>
                <td>{transaccion.fecha_transaccion}</td>
                <td><button> ver</button></td> 
                </tr>
                    ))}
                </tbody> 
                    </table>
        </div>
    )
}
export default TransaccionLista;