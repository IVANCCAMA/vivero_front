import React, { useState } from "react";
import "./Login.css";
import imgLogin from "../img/imgLogin.png";
import Button from 'react-bootstrap/Button';

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;
  
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Correo electrónico no válido");
    } else {
      setemailError("");
    }
  
    if (!password.match(/^[0-9a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "La contraseña debe tener al menos 8 caracteres y como máximo 22 caracteres, y puede incluir letras mayúsculas, letras minúsculas y números."
      );
    } else {
      setpasswordError("");
    }
  
    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
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
                type="email"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Ingrese email"
                style={{ backgroundColor: "#E0E0E0" }}
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
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
                onChange={(event) => setPassword(event.target.value)}
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
            <Button href="/home">Iniciar Sesión</Button>
            {/* <button type="submit" className="btn-login btn-primary">
              Iniciar Sesión
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
