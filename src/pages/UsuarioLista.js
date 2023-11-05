import React, { useState, useEffect } from "react";
import axios from "axios";
/* import FormUsuario from "./FormUsuario"; */
import { Link } from "react-router-dom";
import FormUsuario from "./FormUsuario";
function UsuarioLista (){
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

        

return(
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
                <td>{usuario.id_tipo_usuario}</td>
                <td>{usuario.fecha_registro_usuario}</td> 
                <td>{usuario.fecha_modificacion}</td>  

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