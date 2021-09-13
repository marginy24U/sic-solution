import React from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({ materia, setMateria, guardarM, ActualizaM, isEditar }) => {
    //hacemos destructuring del objeto cliente para manipular sus atributos como variables simples.    
    const { nombre, descripcion, unidad, stock,
        minimo, ubicacion } = materia;

    //Función para cambiar los valores del objeto cliente
    const handleChange = (e) => {
        setMateria({
            ...materia,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (nombre === "" || descripcion === "" || ubicacion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Hay campos que son requeridos y debes llenar!'
            })
            return
        }
        else if (stock <= 0 || minimo < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Campo numerico no Válido',
                text: `Los campos numericos no pueden ser menores a cero, o puede que 
                un caracter ingresado no sea un número.
                Vuelva a intentarlo.`
            })
            return
        }
        else {
            if (isEditar) {
                ActualizaM()
                return
            }
            guardarM();
        }
    }
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Nombre</label>
                <input onChange={handleChange} name="nombre" value={nombre} type="text" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"> Unidad</label>
                <input onChange={handleChange} name="unidad" value={unidad} type="text" className="form-control" />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> stock</label>
                <input onChange={handleChange} name="stock" value={stock} type="number" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"> minimo</label>
                <input onChange={handleChange} name="minimo" value={minimo} type="number" className="form-control" />
            </div>
            <div className="col-md-8">
                <label className="form-label"><span className="text-danger">*</span> Ubicacion</label>
                <input onChange={handleChange} name="ubicacion" value={ubicacion} type="text" className="form-control" required/>
            </div>
            <div className="col-md-12 mx-auto">
                <label className="form-label"><span className="text-danger">*</span> Descripción</label>
                <textarea onChange={handleChange} name="descripcion" value={descripcion} id="" cols="50" rows="2" maxlength="200" required></textarea>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmActions
