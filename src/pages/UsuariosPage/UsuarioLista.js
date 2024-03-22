import React, { useState, useEffect } from "react";
import axios from "axios";

/* import FormUsuario from "./FormUsuario"; */
import { Link } from "react-router-dom";
import FormUsuario from "./FormUsuario";
import { Icon } from "@iconify/react";
import "./Usuario.scss";
function UsuarioLista() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://viverobackend-production.up.railway.app/api/usuarios"
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleDelete = async (id_usuario) => {
    try {
      const response = await axios.delete(
        `https://viverobackend-production.up.railway.app/api/usuarios/${id_usuario}`
      );
      if (response.status === 200) {
        // Actualiza el estado después de eliminar el producto
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id_usuario !== id_usuario)
        );
      } else {
        console.error(
          "Error al eliminar el usuario. Respuesta inesperada:",
          response
        );
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
  const handleEditar = (usuario) => {
    setUsuarioAEditar(usuario);
    setFormularioAbierto(true);
  };

  const handleToggleActivity = async (id_usuario, isActive) => {
    try {
      const response = await axios.put(
        `https://viverobackend-production.up.railway.app/api/usuarios/${id_usuario}`,
        {
          activo_usuario: !isActive, // Invertir el estado actual
        }
      );

      if (response.status === 200) {
        // Actualizar el estado después de cambiar la actividad del usuario
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id_usuario === id_usuario
              ? { ...usuario, activo_usuario: !isActive }
              : usuario
          )
        );
      } else {
        console.error(
          "Error al cambiar el estado de la actividad del usuario. Respuesta inesperada:",
          response
        );
      }
    } catch (error) {
      console.error(
        "Error al cambiar el estado de la actividad del usuario:",
        error
      );
    }
  };

  return (
    <div className="table-responsive pb-5">
      <table className="listaP table">
        <thead className="txt-usuario ">
          <tr className="text-center">
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`switch-${usuario.id_usuario}`}
                    checked={usuario.activo_usuario}
                    onChange={() =>
                      handleToggleActivity(
                        usuario.id_usuario,
                        usuario.activo_usuario
                      )
                    }
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor={`switch-${usuario.id_usuario}`}
                  >
                    {usuario.activo_usuario ? "Activo" : "Inactivo"}
                  </label>
                </div>
              </td>
              <td className="d-flex align-items-center">
                <Link
                  className="btn btn-dark verP"
                  to={`/usuarios/ver/${usuario.id_usuario}`}
                >
                  <Icon
                    className="icon"
                    icon="carbon:view-filled"
                    color="white"
                    width="18"
                    height="18"
                  />
                  Ver
                </Link>

                <Link
                  to={`/usuarios/editarUsuario/${usuario.id_usuario}`}
                  className="btn btn-warning me-2 editarP ms-2"
                  onClick={() => handleEditar(usuario)}
                >
                  <Icon
                    className="icon mb-1"
                    icon="mdi:edit"
                    color="white"
                    width="18"
                    height="18"
                  />
                  Editar
                </Link>
                <button
                  type="button"
                  className="btn btn-danger borrarP"
                  onClick={() => handleDelete(usuario.id_usuario)}
                >
                  <Icon
                    className="icon mb-1"
                    icon="material-symbols:delete"
                    color="white"
                    width="18"
                    height="18"
                  />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formularioAbierto && (
        <FormUsuario
          usuarioAEditar={usuarioAEditar}
          onClose={() => setFormularioAbierto(false)}
        />
      )}
    </div>
  );
}
export default UsuarioLista;
