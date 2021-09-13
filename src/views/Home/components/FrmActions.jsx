import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const FrmActions = ({ producto, setProducto, guardarP, ActualizaP, isEditar }) => {
    //hacemos destructuring del objeto producto para manipular sus atributos como variables simples.    
    const { marca, modelo, stock, minimo, costo_impo,
        precio1, precio2, precio3, precio4,
        comision1, comision2, comision3, comision4,
        linea, descripcion } = producto;

    //Función para cambiar los valores del objeto producto
    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    //Esta funcion valida los campos requeridos antes de enviar los datos
    const validaCampos = () => {
        if (marca === "" || modelo === "" || descripcion === "" || precio1 === "" || comision1 === "" || stock === "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Hay campos que son requeridos y debes llenar!'
            })
            return
        }
        else if (precio1 <= 0 || isNaN(precio1) ||
            comision1 <= 0 || isNaN(comision1) ||
            stock <= 0 || isNaN(stock) || minimo < 0 || costo_impo < 0) {

            Swal.fire({
                icon: 'error',
                title: 'Campos numericos no Válidos',
                text: `Los campos numericos no pueden ser menores a cero, o puede que 
                un caracter ingresado no sea un número. También debe especificar al menos precio1 y comision1.
                Vuelva a intentarlo.`
            })
            return
        }
        else {
            if (isEditar) {
                ActualizaP()
                return
            }
            guardarP();
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); validaCampos(); e.target.reset(); }} className="row g-3 needs-validation" novalidate>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Marca</label>
                <input onChange={handleChange} name="marca" value={marca} type="text" className="form-control" required />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Modelo</label>
                <input onChange={handleChange} name="modelo" value={modelo} type="text" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label"><span className="text-danger">*</span> Stock</label>
                <input onChange={handleChange} name="stock" value={stock} type="number" className="form-control" required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Minimo</label>
                <input onChange={handleChange} name="minimo" value={minimo} type="number" className="form-control" />
            </div>
            <div className="col-md-4">
                <label className="form-label">Costo impo</label>
                <input onChange={handleChange} name="costo_impo" value={costo_impo} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label"><span className="text-danger">*</span> Precio 1</label>
                <input onChange={handleChange} name="precio1" value={precio1} type="number" className="form-control" required />
            </div>
            <div className="col-md-3">
                <label className="form-label">Precio 2</label>
                <input onChange={handleChange} name="precio2" value={precio2} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">Precio 3</label>
                <input onChange={handleChange} name="precio3" value={precio3} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">Precio 4</label>
                <input onChange={handleChange} name="precio4" value={precio4} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label"><span className="text-danger">*</span> Comisión 1</label>
                <input onChange={handleChange} name="comision1" value={comision1} type="number" className="form-control" required />
            </div>
            <div className="col-md-3">
                <label className="form-label">Comisión 2</label>
                <input onChange={handleChange} name="comision2" value={comision2} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">Comisión 3</label>
                <input onChange={handleChange} name="comision3" value={comision3} type="number" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">Comisión 4</label>
                <input onChange={handleChange} name="comision4" value={comision4} type="number" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">Línea</label>
                <input onChange={handleChange} name="linea" value={linea} type="text" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label"><span className="text-danger">*</span> Descripción</label>
                <textarea onChange={handleChange} name="descripcion" value={descripcion} id="" cols="27" rows="2" maxlength="200" required></textarea>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-primary me-2" type="submit">Guardar</button>
                <button className="btn btn-secondary " type="button" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </form>

    )
}

export default FrmActions
