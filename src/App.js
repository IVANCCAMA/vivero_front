import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Home from './pages/HomePage/Home';
import Inventario from './pages/InventarioPage/Inventario';
import Usuarios from './pages/UsuariosPage/Usuarios';
import Transacciones from './pages/TransaccionesPage/Transacciones';
import Reportes from './pages/ReportesPage/Reportes';
import NotFound from './pages/NotForundPage/Notfound';
import Categoria from './pages/CategoriaPage/categoria';
import FormProducto from './components/FormProducto';
import Formcategoria from './pages/FormCategoriaPage/Formcategoria';
import FormEditarCategoria from './pages/FormCategoriaPage/FormEditarCategoria';
import FormEditarProducto from './components/FormEditarProducto';
import VerProducto from './components/VerProducto';
import FormUsuario from './pages/UsuariosPage/FormUsuario';
import FormEditarUsuario from './pages/UsuariosPage/FormEditarUsuario';
import VerUsuario from './pages/UsuariosPage/VerUsuario';
import Login from './pages/LoginPage/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import FormTransacciones from './pages/TransaccionesPage/FormTransacciones';
import VerTransaccion from './pages/TransaccionesPage/verTransaccion';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoutes from './PrivateRoutes'

function App() {
  return (
    <AuthProvider>
      <div className='grid-container'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={(
              <>
                <Header />
                <div className='row'>
                  <div className='col-2'>
                    <Menu />
                  </div>
                  <div className='col-10'>
                    <main className='main'>
                      <Routes>
                        <Route element={<PrivateRoutes />}>
                          <Route path='/' exact element={<Home />} />
                          <Route path="/usuarios" exact element={<Usuarios />} />
                          <Route path="/inventario/producto" element={<Inventario />} />
                          <Route path="/reportes" element={<Reportes />} />
                          <Route path="/transacciones" element={<Transacciones />} />
                          <Route path="/inventario/categoria" element={<Categoria />} />
                          <Route path="/inventario/producto/formProducto" element={<FormProducto />} />
                          <Route path="/inventario/categoria/formCategoria" element={<Formcategoria />} />
                          <Route path="/inventario/categoria/editar/:id_categoria" element={<Formcategoria />} />
                          <Route path="/inventario/categoria/editarCategoria/:id_categoria" element={<FormEditarCategoria />} />
                          <Route path="/inventario/producto/editarProducto/:id_producto" element={<FormEditarProducto />} />
                          <Route path="/inventario/producto/ver/:id_producto" element={<VerProducto />} />
                          <Route path='/usuarios/crearUsuario' element={<FormUsuario />} />
                          <Route path="/usuarios/editarUsuario/:id_usuario" element={<FormEditarUsuario />} />
                          <Route path="/usuarios/ver/:id_usuario" element={<VerUsuario />} />
                          <Route path='/transacciones/formTransacciones' element={<FormTransacciones />} />
                          <Route path="/transacciones/ver/:id_transaccion" element={<VerTransaccion />} />
                        </Route>
                        <Route path="/*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
                <Footer />
              </>
            )}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
