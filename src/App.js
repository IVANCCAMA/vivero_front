import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventario from './pages/Inventario'; // Cambia "Invetario" a "Inventario"
import Empleados from './pages/Empleados';
import Transacciones from './pages/Transacciones';
import Reportes from './pages/Reportes';
import NotFound from './pages/Notfound';
import Categoria from './pages/categoria';
/* import SubMenuInventario from './components/SubMenuInventario'; */
import FormProducto from './components/FormProducto'
import Formcategoria from './pages/Formcategoria'
import FormEditarCategoria from './pages/FormEditarCategoria';
function App() {
 
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Menu />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/inventario/producto" element={<Inventario />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/inventario/categoria" element={<Categoria />} />
            <Route path="/inventario/producto/formProducto" element={<FormProducto />} />
            <Route path="/inventario/categoria/formCategoria" element={<Formcategoria/>} />
            <Route path="/inventario/categoria/editar/:id" element={<Formcategoria/>} />
            <Route path="/inventario/categoria/editarCategoria/:id_categoria" element={<FormEditarCategoria/>} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
