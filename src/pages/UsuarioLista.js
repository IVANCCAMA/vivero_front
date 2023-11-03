function UsuarioLista (){
return(
    <div>
            <table className="listaP">
            <thead>
                <tr>
                <th>Nombre completo</th>
                <th>CI</th>
                <th>Celular</th>
                <th>Correo Electronico</th>
                <th>rol</th>
                <th>Acciones</th> 
                </tr>
            </thead>
           {/*  <tbody>
            {usuarios.map((usuario) => (
                <tr key={usuario.nombre_usuario}>
                <td>{usuario.nombre_producto}</td>
                <td>{usuario.ci_usuario}</td>
                <td>{usuario.celular_usuario}</td>
                <td>{usuario.correo_usuario}</td>
                <td>{usuario.rol_usuario}</td> */}

                {/* <td>
                <Link to={`/inventario/usuario/ver/${usuario.id_producto}`}>
                    <button className="verP">Ver</button>
                </Link>
                <Link to={`/inventario/usuario/editarProducto/${usuario.id_producto}`}>
                    <button className="editarP" onClick={() => handleEditar(usuario)}>
                    Editar
                    </button>
                </Link>
                <button className="borrarP" onClick={() => handleDelete(usuario.id_producto)}>
                    Borrar
                </button> 
                
                </td> */}
                {/*   </tr>
                    ))}
                </tbody> */}
                    </table>
                </div>

)
}
export default UsuarioLista;