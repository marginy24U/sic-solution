import React from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({ cliente, setCliente, guardarC, ActualizaC, isEditar }) => {
    //hacemos destructuring del objeto cliente para manipular sus atributos como variables simples.    
    const { nombre, telefono, direccion, ciudad, email,
        ruc, persona_contacto } = cliente;

    //Función para cambiar los valores del objeto cliente
    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (nombre === "" || direccion === "" || ruc === "" || persona_contacto === "") {
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
                ActualizaC()
                return
            }
            guardarC();
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Nombre</label>
                <input onChange={handleChange} name="nombre" value={nombre} type="text" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Telefono</label>
                <input onChange={handleChange} name="telefono" value={telefono} type="number" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"> Ciudad</label>
                <input onChange={handleChange} name="ciudad" value={ciudad} type="text" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input onChange={handleChange} name="email" value={email} type="email" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> RUC</label>
                <input onChange={handleChange} name="ruc" value={ruc} type="text" className="form-control" required/>
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Persona Contacto</label>
                <input onChange={handleChange} name="persona_contacto" value={persona_contacto} type="text" className="form-control" required />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Dirección</label>
                <textarea onChange={handleChange} name="direccion" value={direccion} id="" cols="27" rows="2" maxlength="140" required></textarea>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmActions
