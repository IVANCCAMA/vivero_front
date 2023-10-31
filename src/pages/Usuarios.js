import '../App.css';
import { Link } from 'react-router-dom';
function Usuarios() {
    return (
    <div className="division">
        <p>Pagina de Empleados</p>
        <Link to="/usuarios/crearUsuario" className="container">
        <button className="botonUruario">Agregar usuario</button>
        </Link>
    </div>
    );
}
export default Usuarios;