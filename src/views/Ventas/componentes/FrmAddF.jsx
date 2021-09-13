import React, { useState } from 'react'

const FrmAddF = ({idProd, crearFila, nombreP, precios, comisiones, siva, setSubIva, subtotal, setSubTotal }) => {
    
    const [cantidad, setCantidad] = useState(0)
    const [precio, setPrecio] = useState(0)
    const [comision, setComision] = useState(0)
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); e.target.reset(); crearFila(idProd, cantidad, nombreP, precio, comision, siva, subtotal); }} className="row">
            <div className="mt-2 col-md-6">
                <label className="form-label">Producto</label>
                <input type="text" className="form-control" required value={nombreP} readOnly />
            </div>
            <div className="mt-2 col-md-6">
                <label className="form-label">Precio</label>
                <select onChange={e => { setPrecio(e.target.value); setSubIva(e.target.value * 0.15); setSubTotal(e.target.value * cantidad + siva) }} className="form-select mx-2">
                    <option>0</option>
                    <option>{precios.precio1}</option>
                    <option>{precios.precio2}</option>
                    <option>{precios.precio3}</option>
                    <option>{precios.precio4}</option>
                </select>
            </div>

            <div className="mt-2 col-md-6">
                <label className="form-label">Cantidad</label>
                <input type="number" className="form-control" required value={cantidad} onChange={e => { setCantidad(e.target.value); setSubTotal(e.target.value * precio + siva) }} />
            </div>

            <div className="mt-2 col-md-6">
                <label className="form-label">Comision</label>
                <select onChange={e => { setComision(e.target.value) }} className="form-select mx-2">
                    <option defaultValue>0</option>
                    <option>{comisiones.comision1}</option>
                    <option>{comisiones.comision2}</option>
                    <option>{comisiones.comision3}</option>
                    <option>{comisiones.comision4}</option>
                </select>

            </div>

            <div className="mt-2 col-md-6">
                <label className="form-label">IVA</label>
                <input type="number" className="form-control" required readOnly value={siva} />
            </div>

            <div className="mt-2 col-md-6">
                <label className="form-label">Subtotal</label>
                <input type="number" className="form-control" required readOnly value={subtotal} />
            </div>

            <div className="mt-3 col-12 d-flex justify-content-center">

                <button type="submit" className="btn btn-sm btn-primary align-center" data-bs-dismiss="modal">Añadir</button>

            </div>
        </form>
    )
}

export default FrmAddF
