import Button from 'react-bootstrap/Button';
import './transacciones.css'
import TransaccionLista from './TransaccionLista';
import { Link } from 'react-router-dom';

function Transacciones() {
    return (
    <div className="transacione">
        <h5>Transacciones</h5>
        <div className="transaciones">
            <Link to="/transacciones/formTransacciones">
                <Button className='btn-transacciones'>
                    Realizar transaccion
                </Button>{" "}
            </Link>
        </div>
        <TransaccionLista/>
    </div>
    );
}
export default Transacciones;