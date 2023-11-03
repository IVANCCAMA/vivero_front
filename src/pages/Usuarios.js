import '../App.css';
import './Usuario.css'
import Button from 'react-bootstrap/Button';
import UsuarioLista from './UsuarioLista';
function Usuarios() {
    return (
    <div className="">
        <p>Lista de Usuarios</p>
        <div className='botonUsuario'>
        <Button href="/usuarios/crearUsuario"  
        type=""
        style={{ backgroundColor: '#4f350f'}}>
        Imprimir</Button> {' '}
        <Button href="/usuarios/crearUsuario"  
        type="submit"
        style={{ backgroundColor: '#5F8D4E' }}>
        Agregar usuario</Button>
        </div>
        <UsuarioLista/>
        
    </div>
    );
}
export default Usuarios;