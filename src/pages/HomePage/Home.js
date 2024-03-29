import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faListAlt,
  faUsers,
  faExchangeAlt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./home.scss";
import { useAuth } from "../../auth/AuthContext";

const Home = () => {
  const { authState } = useAuth();
  const [productosCantidad, setProductosCantidad] = useState(0);
  const [CategoriasCantidad, setCategoriasCantidad] = useState(0);
  const [UsuariosCantidad, setUsuariosCantidad] = useState(0);
  const [TransaccionesCantidad, setTransaccionesCantidad] = useState(0);
  useEffect(() => {
    fetch("https://viverobackend-production.up.railway.app/api/productos")
      .then((response) => response.json())
      .then((data) => {
        // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
        if (Array.isArray(data)) {
          setProductosCantidad(data.length);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de productos :", error);
      });

    fetch("https://viverobackend-production.up.railway.app/api/categorias")
      .then((response) => response.json())
      .then((data) => {
        // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
        if (Array.isArray(data)) {
          setCategoriasCantidad(data.length);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de productos :", error);
      });

    fetch("https://viverobackend-production.up.railway.app/api/usuarios")
      .then((response) => response.json())
      .then((data) => {
        // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
        if (Array.isArray(data)) {
          setUsuariosCantidad(data.length);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de productos :", error);
      });

    fetch("https://viverobackend-production.up.railway.app/api/transaccion")
      .then((response) => response.json())
      .then((data) => {
        // Aquí asumimos que la respuesta es un array de productos y obtenemos la longitud
        if (Array.isArray(data)) {
          setTransaccionesCantidad(data.length);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de productos :", error);
      });
  }, []);

  return (
    <div>
      {authState.isAuthenticated ? (
        <div className="Inventario">
          <h5>Paneles</h5>
          <div className="paneles row row-cols-1 row-cols-md-3 ">
            <div className="col-md">
              <Link to="/inventario/producto" className="panel-Producto">
                <div className="icon-panel">
                  <FontAwesomeIcon icon={faBoxes} size="3x" />
                </div>
                <div className="panel-letras">
                  <h5>Productos</h5>
                  <p>{productosCantidad}</p>
                </div>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/inventario/categoria" className="panel-Categoria">
                <div className="icon-panel">
                  <FontAwesomeIcon icon={faListAlt} size="3x" />
                </div>
                <div className="panel-letras">
                  <h5>Categorias</h5>
                  <p>{CategoriasCantidad}</p>
                </div>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/usuarios" className="panel-Usuario">
                <div className="icon-panel">
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                </div>
                <div className="panel-letras">
                  <h5>Usuarios</h5>
                  <p>{UsuariosCantidad}</p>
                </div>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/transacciones" className="panel-Transaccion">
                <div className="icon-panel">
                  <FontAwesomeIcon icon={faExchangeAlt} size="3x" />
                </div>
                <div className="panel-letras">
                  <h5>Transacciones</h5>
                  <p>{TransaccionesCantidad}</p>
                </div>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/reportes" className="panel-Reporte">
                <div className="icon-panel">
                  <FontAwesomeIcon icon={faChartBar} size="3x" />
                </div>
                <div className="panel-letras">
                  <h5>Reportes</h5>
                  <p>9</p>
                </div>
              </Link>
            </div>

            {/* <div className='panel-F'>
                            <div className='panel-letras'>
                            </div>
                        </div> */}
          </div>
        </div>
      ) : (
        <p>Inicia sesión para acceder a esta página.</p>
      )}
    </div>
  );
};
export default Home;
