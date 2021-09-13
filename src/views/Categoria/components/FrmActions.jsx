import React from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({ categoria, setCategoria, guardarCat, ActualizaCat, isEditar }) => {
    //hacemos destructuring del objeto categoria para manipular sus atributos como variables simples.    
    const { nombre, descripcion } = categoria;

    //Función para cambiar los valores del objeto categoria
    const handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (nombre === "" || descripcion === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Los campos son requeridos y debes llenarlos!'
            })
            return
        }
        else {
            if (isEditar) {
                ActualizaCat()
                return
            }
            guardarCat();
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Nombre</label>
                <input onChange={handleChange} name="nombre" value={nombre} type="text" className="form-control" required />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Descripción</label>
                <textarea onChange={handleChange} name="descripcion" value={descripcion} id="" cols="27" rows="2" maxlength="47" required></textarea>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmActions
