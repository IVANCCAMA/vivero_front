import React, { useState, useEffect } from "react";
import axios from "axios";

/* import FormUsuario from "./FormUsuario"; */
import { Link } from "react-router-dom";
import FormUsuario from "./FormUsuario";
import { Icon } from '@iconify/react';
import './Usuario.css'
function UsuarioLista (){

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);
    const [formularioAbierto, setFormularioAbierto] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://viverobackend-production.up.railway.app/api/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const handleDelete = async (id_usuario) => {
        try {
            const response = await axios.delete(`https://viverobackend-production.up.railway.app/api/usuarios/${id_usuario}`);
            if (response.status === 200) {
                // Actualiza el estado después de eliminar el producto
                setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id_usuario !== id_usuario));
            } else {
                console.error("Error al eliminar el usuario. Respuesta inesperada:", response);
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };
    const handleEditar = (usuario) => {
        console.log("Handle Editar llamado con el producto:", usuario);
        setUsuarioAEditar(usuario);
        setFormularioAbierto(true);
    };

    const handleToggleActivity = async (id_usuario, isActive) => {
        try {
            const response = await axios.put(`https://viverobackend-production.up.railway.app/api/usuarios/${id_usuario}`, {
                activo_usuario: !isActive, // Invertir el estado actual
            });

            if (response.status === 200) {
                // Actualizar el estado después de cambiar la actividad del usuario
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) =>
                        usuario.id_usuario === id_usuario ? { ...usuario, activo_usuario: !isActive } : usuario
                    )
                );
            } else {
                console.error("Error al cambiar el estado de la actividad del usuario. Respuesta inesperada:", response);
            }
        } catch (error) {
            console.error("Error al cambiar el estado de la actividad del usuario:", error);
        }
    };

    return (
        <div className="table-responsive">
            <table className="listaP table">
            <thead className="txt-usuario ">
                <tr>
                <th scope="col">Nombre completo</th>
                <th scope="col">CI</th>
                <th scope="col">Celular</th>
                <th scope="col">Correo Electronico</th>
                <th scope="col">Rol</th>
                <th scope="col">Fecha de creacion</th>
                <th scope="col">Fecha de modificacion</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody className="txt-usuario">
            {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.ci_usuario}</td>
                <td>{usuario.celular_usuario}</td>
                <td>{usuario.correo_usuario}</td>
                <td>{usuario.tipo_usuario}</td>
                <td>{usuario.fecha_registro_usuario}</td> 
                <td>{usuario.fecha_modificacion}</td>  
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`switch-${usuario.id_usuario}`}
                            checked={usuario.activo_usuario}
                            onChange={() => handleToggleActivity(usuario.id_usuario, usuario.activo_usuario)}
                        ></input>
                        <label className="form-check-label" htmlFor={`switch-${usuario.id_usuario}`}>
                            {usuario.activo_usuario ? "Activo" : "Inactivo"}
                        </label>
                    </div>
                </td>            
                <td>
                <Link to={`/usuarios/ver/${usuario.id_usuario}`}>
                    <button className="verP">
                    <Icon className="icon"  icon="carbon:view-filled" color="white" width="16" height="16" />
                        Ver
                        </button>
                </Link>
                <Link to={`/usuarios/editarUsuario/${usuario.id_usuario}`}>
                    <button className="editarP" onClick={() => handleEditar(usuario)}>
                    <Icon className="icon" icon="mdi:edit" color="white" width="16" height="16" />
                    Editar
                    </button>
                </Link> 
                <button className="borrarP" onClick={() => handleDelete(usuario.id_usuario)}>
                <Icon className="icon" icon="material-symbols:delete" color="white" width="16" height="16"/>
                    Eliminar
                </button> 
                </td> 
                </tr>
                    ))}
                </tbody>
            </table>
            {formularioAbierto && (
                <FormUsuario usuarioAEditar={usuarioAEditar} onClose={() => setFormularioAbierto(false)} />
            )}
        </div>

    )
}
export default UsuarioLista;