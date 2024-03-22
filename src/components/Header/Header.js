import logo from '../../img/logo.png';

const Header = () => {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
      };
  
    return (
      <header className='header navbar navbar-expand px-3 border-bottom'>
        <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar} data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27white%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e")' }}></span>
        </button>
        <div>
          <img className='logo' src={logo} alt="Logo" />
          {/* <h4 className='texto'>GESTION DE INVENTARIO</h4> */}
        </div>
      </header>
    );
  }
  
  export default Header;
