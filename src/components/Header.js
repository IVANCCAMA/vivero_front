import './Header.css';
import logo from '../img/logo.png';

function Header() {
    return (
      <header className="header">
        <img className='logo' src={logo} alt="Logo" />
        <p className='texto'>SISTEMA GESTION DE INVENTARIO</p>
      </header>
    );
  }

export default Header;