import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import imgLogin from "../../img/imgLogin.png";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";

function Login() {
  const { dispatch } = useAuth();
  const [contrasenia_usuario, setContrasenia_usuario] = useState("");
  const [correo_usuario, setCorreo_usuario] = useState(""); // Corregido el nombre aquí
  const [passwordError, setpasswordError] = useState("");
  const [Correo_usuarioError, setCorreo_usuarioError] = useState("");
  const [recordarContrasenia, setRecordarContrasenia] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const passwordFromCookie = localStorage.getItem("rememberedPassword");
    if (passwordFromCookie) {
      setContrasenia_usuario(passwordFromCookie);
      setRecordarContrasenia(true);
    }
  }, []);

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
      setpasswordError(
        "La contraseña debe cumplir con los requisitos de seguridad."
      );
    } else {
      setpasswordError("");
    }

    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (correo_usuario !== "" && contrasenia_usuario !== "") {
      try {
        // Realiza una solicitud POST para autenticar al usuario
        const validacion = await axios.post(
          "https://viverobackend-production.up.railway.app/api/usuarios/autenticar",
          {
            correo_usuario: correo_usuario,
            contrasenia_usuario: contrasenia_usuario,
          }
        );

        if (validacion) {
          const user = validacion.data.user;
          dispatch({ type: "LOGIN", payload: user });
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

  const { authState } = useAuth();

  return !authState.isAuthenticated ? (
    <div className="fondo-login-hero">
      <div className="container d-flex justify-content-center align-items-center py-5">
        <div className="fondo-login p-5">
          <div className="row justify-content-center g-5">
            <div className="col-md-6">
              <div className="login-sidebar">
                <img
                  className="sidebar-image img-fluid object-fit-cover"
                  src={imgLogin}
                  alt="logo vivero corazon de Bolivia"
                />
              </div>
            </div>
            <div className="col-md-5 d-flex align-items-center justify-content-center">
              <form id="loginform" onSubmit={loginSubmit}>
                <h2 className="text-center ">Iniciar sesi&oacute;n </h2>
                <div className="form-group">
                  <div className="text-start">Email</div>
                  <input
                    type="correo_usuario"
                    className="form-control"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Ingrese correo electronico"
                    style={{ backgroundColor: "#E0E0E0" }}
                    onChange={(event) => setCorreo_usuario(event.target.value)} // Corregido el nombre aquí
                  />
                  <small id="emailHelp" className="text-danger form-text">
                    <p className="text-start">{Correo_usuarioError}</p>
                  </small>
                </div>
                <div className="form-group">
                  <div className="text-start">Contraseña</div>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Ingrese contraseña"
                    style={{ backgroundColor: "#E0E0E0" }}
                    onChange={(event) =>
                      setContrasenia_usuario(event.target.value)
                    }
                  />
                  <small id="passworderror" className="text-danger form-text">
                    <p className="text-start">{passwordError}</p>
                  </small>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={recordarContrasenia}
                    onChange={() => setRecordarContrasenia(!recordarContrasenia)}
                  />
                  <div className="form-check-label text-start">
                    Recordar contraseña
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  <div className="text-boton">Iniciar sesión</div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
