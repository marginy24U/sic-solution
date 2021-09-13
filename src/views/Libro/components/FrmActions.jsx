import React from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({libro, setLibro, guardarL, ActualizaL, isEditar }) => {
    //hacemos destructuring del objeto libro para manipular sus atributos como variables simples.    
    const { titulo, descripcion, stock, minimo, precio,
        ubicacion, id_categoria } = libro;

    //Función para cambiar los valores del objeto libro
    const handleChange = (e) => {
        setLibro({
            ...libro,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (titulo === "" || descripcion === "" || ubicacion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Hay campos que son requeridos y debes llenar!'
            })
            return
        }
        else if (precio <= 0 || precio <= 0) {
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
                ActualizaL()
                return
            }
            guardarL();
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Titulo</label>
                <input onChange={handleChange} name="titulo" value={titulo} type="text" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Descripcion</label>
                <input onChange={handleChange} name="descripcion" value={descripcion} type="text" className="form-control" required/>
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Stock</label>
                <input onChange={handleChange} name="stock" value={stock} type="number" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"> Minimo</label>
                <input onChange={handleChange} name="minimo" value={minimo} type="number" className="form-control" />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Precio</label>
                <input onChange={handleChange} name="precio" value={precio} type="number" className="form-control" required />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Ubicacion</label>
                <input onChange={handleChange} name="ubicacion" value={ubicacion} type="text" className="form-control" required/>
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span>Categoria</label>
                <input onChange={handleChange} name="id_categoria" value={id_categoria} type="number" className="form-control" readOnly required />
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>
    )
}

export default FrmActions
