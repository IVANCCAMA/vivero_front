import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventario from './pages/Inventario'; // Cambia "Invetario" a "Inventario"
import Usuarios from './pages/Usuarios';
import Transacciones from './pages/Transacciones';
import Reportes from './pages/Reportes';
import NotFound from './pages/Notfound';
import Categoria from './pages/categoria';
/* import SubMenuInventario from './components/SubMenuInventario'; */
import FormProducto from './components/FormProducto'
import Formcategoria from './pages/Formcategoria'
import FormEditarCategoria from './pages/FormEditarCategoria';
import FormEditarProducto from './components/FormEditarProducto';
import VerProducto from './components/VerProducto';
import FormUsuario from './pages/FormUsuario';
import logo from './img/logo.png';
function App() {

  return (
    <div className='grid-container'>
      <header className='header'>
      {/* <img className='logo' src={logo} alt="Logo" />
        <p className='texto'>SISTEMA GESTION DE INVENTARIO</p> */}
      </header>
        <Menu />
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario/producto" element={<Inventario />} />
            <Route path="/inventario/producto" element={<Inventario />} />
            <Route path="/Usuarios" element={<Usuarios />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/inventario/categoria" element={<Categoria />} />
            <Route path="/inventario/producto/formProducto" element={<FormProducto />} />
            <Route path="/inventario/categoria/formCategoria" element={<Formcategoria/>} />
            <Route path="/inventario/categoria/editar/:id_categoria" element={<Formcategoria/>} />
            <Route path="/inventario/categoria/editarCategoria/:id_categoria" element={<FormEditarCategoria/>} />
            <Route path="/inventario/producto/editarProducto/:id_producto" element={<FormEditarProducto/>} />
            <Route path="/inventario/producto/ver/:id_producto" element={<VerProducto/>}/>
            <Route path='/usuarios/crearUsuario' element={<FormUsuario/>}/>
            <Route path="/*" element={<NotFound />} />
          </Routes>
          </main>
      <footer className='footer'>Vivero Corazon de Bolivia & Todos los derechos reservados 2023</footer>
    </div>
  );
}
export default App;
