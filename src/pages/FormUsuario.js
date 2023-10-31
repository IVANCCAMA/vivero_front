import './FormUsuario.css';
import React, { Component } from 'react';

class RegistroUsuario extends Component {
  constructor() {
    super();
    this.state = {
      nombre: '',
      email: '',
      password: '',
      rol: 'empleado',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del usuario al servidor o realizar otras acciones.
    console.log('Datos del usuario:', this.state);
  }

  render() {
    return (
      <div className="form-container">
        <h2>Registro de Usuario</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              className="form-input"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-input"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-input"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rol:</label>
            <select
              className="form-select"
              name="rol"
              value={this.state.rol}
              onChange={this.handleChange}
            >
              <option value="administrador">Administrador</option>
              <option value="gerente">Gerente</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>
          <button type="submit" className="form-button">Registrarse</button>
        </form>
      </div>
    );
  }
}

export default RegistroUsuario;
