import logo from '../../img/logo.png';
function Header() {
    return (
        <header className='header'>
            <div>
                <img className='logo' src={logo} alt="Logo" />
                <h4 className='texto'>SISTEMA GESTION DE INVENTARIO</h4>
            </div>
        </header>
    )

}
export default Header;