import Button from 'react-bootstrap/Button';
import './transacciones.css'
import TransaccionLista from './TransaccionLista';

function Transacciones() {
    return (
    <div className="transacione">
        <p>Transacciones</p>
        <div className="transaciones">
        <Button className='btn-transacciones' href="/transacciones/formTransacciones">Transaccion de producto</Button>{" "}
        </div>
        <TransaccionLista/>
    </div>
    );
}
export default Transacciones;