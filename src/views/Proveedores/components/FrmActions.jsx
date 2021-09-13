import React from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({proveedor, setProveedor, guardarProv, ActualizaProv, isEditar}) => {
    //hacemos destructuring del objeto cliente para manipular sus atributos como variables simples.    
    const { nombre, descripcion, telefono, nombre_contacto, email } = proveedor;

    //Función para cambiar los valores del objeto proveedor
    const handleChange = (e) => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (nombre === "" || descripcion === "" || telefono === "" || nombre_contacto === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Hay campos que son requeridos y debes llenar!'
            })
            return
        }
        else if (telefono <= 0 || isNaN(telefono)) {
            Swal.fire({
                icon: 'error',
                title: 'Campos teléfono no Válido',
                text: `Los campos numericos no pueden ser menores a cero, o puede que 
                un caracter ingresado no sea un número.
                Vuelva a intentarlo.`
            })
            return
        }
        else {
            if (isEditar) {
                ActualizaProv()
                return
            }
            guardarProv();
        }
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Nombre</label>
                <input onChange={handleChange} name="nombre" value={nombre} type="text" className="form-control" required />
            </div>
            <div className="col-md-8">
                <label className="form-label"><span className="text-danger">*</span> Descripcion</label>
                <input onChange={handleChange} name="descripcion" value={descripcion} type="text" className="form-control" required/>
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Telefono</label>
                <input onChange={handleChange} name="telefono" value={telefono} type="number" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Nombre Contacto</label>
                <input onChange={handleChange} name="nombre_contacto" value={nombre_contacto} type="text" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Correo</label>
                <input onChange={handleChange} name="email" value={email} type="email" className="form-control" />
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmActions
