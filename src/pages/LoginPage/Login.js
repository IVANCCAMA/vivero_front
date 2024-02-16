import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imgLogin from "../../img/imgLogin.png";
import axios from "axios";
import { useAuth } from '../../auth/AuthContext';


function Login() {
  const { dispatch } = useAuth();
  const [contrasenia_usuario, setContrasenia_usuario] = useState("");
  const [correo_usuario, setCorreo_usuario] = useState(""); // Corregido el nombre aquí
  const [passwordError, setpasswordError] = useState("");
  const [Correo_usuarioError, setCorreo_usuarioError] = useState("");
  const navigate = useNavigate();

  const handleValidation = () => {
    let formIsValid = true;

    if (!correo_usuario.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setCorreo_usuarioError("Correo electrónico no válido");
    } else {
      setCorreo_usuarioError("");
    }

    if (
      !contrasenia_usuario
      /* .match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,22}$/
      ) */
    ) {
      formIsValid = false;
      setpasswordError("La contraseña debe cumplir con los requisitos de seguridad.");
    } else {
      setpasswordError("");
    }

    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (correo_usuario !== "" && contrasenia_usuario !== "") {
      /* console.log("Correo recibido:", correo_usuario);
      console.log("Contraseña recibida:", contrasenia_usuario); */
  
      try {
        // Realiza una solicitud POST para autenticar al usuario
        const validacion = await axios.post("https://viverobackend-production.up.railway.app/api/usuarios/autenticar", {
          correo_usuario: correo_usuario,
          contrasenia_usuario: contrasenia_usuario,
        });

        console.log("USUARIO LOGEADO>>", validacion.data.user);
  
        if (validacion) {
          const user = validacion.data.user
          dispatch({ type: 'LOGIN', payload: user });
          navigate("/");
        } else {
          alert("Usuario no encontrado");
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al autenticar al usuario:", error);
        alert("Nombre de usuario o contraseña invalida.");
      }
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="login-sidebar">
            <img className="sidebar-image" src={imgLogin} alt="imgLogin" />
          </div>
        </div>
        <div className="col-md-5">
          <form id="loginform" onSubmit={loginSubmit}>
            <div className="form-group">
              <h2 className="text-center">Iniciar Sesión</h2>
              <label>Email</label>
              <input
                type="correo_usuario"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Ingrese correo_usuario"
                style={{ backgroundColor: "#E0E0E0" }}
                onChange={(event) => setCorreo_usuario(event.target.value)} // Corregido el nombre aquí
              />
              <small id="emailHelp" className="text-danger form-text">
                {Correo_usuarioError}
              </small>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ingrese contraseña"
                style={{ backgroundColor: "#E0E0E0" }}
                onChange={(event) => setContrasenia_usuario(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label">Recordar contraseña</label>
            </div>
            <button type="submit" className="btn-login btn-primary">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
