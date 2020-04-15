import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';


const NuevoProducto = ({ history }) => {

    // State del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    // Usar use Dispatch y devuelve una funcion
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    // Mandar a llamar al action de productoAction
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));


    // Cuando el usuario haga nuevo submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar formulario
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }

        // Revisar que no haya errores

        // Crear nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar al home
        history.push('/');

    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando</p> : null}

                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>);
}

export default NuevoProducto;