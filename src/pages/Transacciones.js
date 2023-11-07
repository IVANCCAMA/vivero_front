import Button from 'react-bootstrap/Button';

function Transacciones() {
    return (
    <div className="division">
        <p>Transacciones</p>
        <Button href="/transacciones/formTransacciones">Entradas-Salidas</Button>{" "}
        <Button href="/transacciones/formTransacciones">Entradas</Button>{" "}
        <Button href="/transacciones/formTransacciones">Salidas</Button>{" "}
        <div>

        </div>
    </div>
    );
}
export default Transacciones;