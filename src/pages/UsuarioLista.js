import React, { useState, useEffect } from "react";
import axios from "axios";
/* import FormUsuario from "./FormUsuario"; */
import { Link } from "react-router-dom";
import FormUsuario from "./FormUsuario";
function UsuarioLista() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);
    const [formularioAbierto, setFormularioAbierto] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const handleDelete = async (id_usuario) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/usuarios/${id_usuario}`);
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
            const response = await axios.put(`http://localhost:4000/api/usuarios/${id_usuario}`, {
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
        <div>
            <table className="listaP">
                <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>CI</th>
                        <th>Celular</th>
                        <th>Correo Electronico</th>
                        <th>Rol</th>
                        <th>Fecha de creacion</th>
                        <th>Fecha de modificacion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
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
                                    <button className="verP">Ver</button>
                                </Link>
                                <Link to={`/usuarios/editarUsuario/${usuario.id_usuario}`}>
                                    <button className="editarP" onClick={() => handleEditar(usuario)}>
                                        Editar
                                    </button>
                                </Link>
                                <button className="borrarP" onClick={() => handleDelete(usuario.id_usuario)}>
                                    Borrar
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