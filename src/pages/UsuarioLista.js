import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
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
            
            const [interruptoresEncendidos, setInterruptoresEncendidos] = useState({});

                useEffect(() => {
                // Inicializa todos los interruptores en el estado encendido (true) al cargar la página
                const initialInterruptores = {};
                usuarios.forEach((usuario) => {
                    initialInterruptores[usuario.id_usuario] = true;
                });
                setInterruptoresEncendidos(initialInterruptores);
                }, [usuarios]);
            
                const toggleInterruptor = (id_usuario) => {
                setInterruptoresEncendidos((prevInterruptores) => ({
                    ...prevInterruptores,
                    [id_usuario]: !prevInterruptores[id_usuario],
                }));
                };
        

return(
    <div>
            <table className="listaP">
            <thead className="txt-usuario">
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
                <Link to={`/usuarios/ver/${usuario.id_usuario}`}>
                    <button className="verP">
                    <Icon className="icon"  icon="carbon:view-filled" color="white" width="18" height="18" />
                        Ver
                        </button>
                </Link>
                <Link to={`/usuarios/editarUsuario/${usuario.id_usuario}`}>
                    <button className="editarP" onClick={() => handleEditar(usuario)}>
                    <Icon className="icon" icon="mdi:edit" color="white" width="18" height="18" />
                    Editar
                    </button>
                </Link> 
                <button className="borrarP" onClick={() => handleDelete(usuario.id_usuario)}>
                <Icon className="icon" icon="material-symbols:delete" color="white" width="18" height="18"/>
                    Eliminar
                </button> 
                <button className="switch">
                <Form>
                <Form.Check
                    type="switch"
                    id={`custom-switch-${usuario.id_usuario}`}
                    checked={interruptoresEncendidos[usuario.id_usuario]}
                    onChange={() => toggleInterruptor(usuario.id_usuario)}
                    className="custom-switch"
                    />
                </Form>
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