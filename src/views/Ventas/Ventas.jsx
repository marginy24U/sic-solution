import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
//Componentes
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import ProdVenta from './componentes/ProdVenta';
import FrmAddF from './componentes/FrmAddF';
import Factura from './componentes/Factura';
import Customers from './componentes/Customers';

const Ventas = () => {
    // ---------- MENU ---------------
    const [mOpen, setmOpen] = useState(true);
    const abreCierraMenu = () => {
        if (mOpen) {
            setmOpen(false);
        }
        else {
            setmOpen(true);
        }
    }
    //-------------------------------
    const [factura, setFactura] = useState({
        id_usuario: 0,
        id_cliente: 0,
        monto: 0,
        credito: "NO",
        nruc: "",
        nombre_cliente: "",
        fecha_venc: "2025-07-08",
        iva: 0,
        num_factura: 0,
        anulada: "NO",
        tcambio: "X",

        id_producto: [],
        cantidad: [],
        precio: [],
        porcentaje: []
    });

    //Campos del Producto
    const [idProd, setIdProd] = useState(0);
    const [producto, setProducto] = useState("");//Nombre P. NO Requerido (Solo referencia al usuario)
    const [stock, setStock] = useState(0);//NO Requerido (Solo referencia a la validacion de campos en factura)
    //precios de producto
    // const [precio, setPrecio] = useState(0);
    const [precios, setPrecios] = useState({
        precio1:0,
        precio2:0,
        precio3:0,
        precio4:0
    });

    //comisiones de producto
    const [comisiones, setComisiones] = useState({
        comision1:0,
        comision2:0,
        comision3:0,
        comision4:0
    });

    //valores que intervienen en la venta
    const [cantidad, setCantidad] = useState(0);
    const [iva, setIva] = useState(0);
    const [siva, setSubIva] = useState(0);
    const [subtotal, setSubTotal] = useState(0);

    //Lista de detalles de la venta
    const [listDet, setListDet] = useState([]);
    const [cant, setCant] = useState([]);
    const [prec, setPrec] = useState([]);
    const [porcent, setPorcent] = useState([]);
    const [sub, setSub] = useState(0);

    //------- FUNCIONES ---------------
    const ResetF = () => setFactura({
        id_usuario: 0, id_cliente: 0, monto: 0, credito: "", nruc: "",
        nombre_cliente: "", fecha_venc: "2025-07-08", iva: 0, num_factura: 0,
        anulada: "NO", tcambio: "",
        //Detalles
        id_producto: [],
        cantidad: [],
        precio: [],
        porcentaje: []
    });

    //--------
    const llenaCampos = (id, nom, st, p1, p2,
        p3, p4, c1, c2, c3, c4) => {
        setIdProd(id);
        setProducto(nom)
        setStock(st);
        setPrecios({
            precio1: p1,
            precio2: p2,
            precio3: p3,
            precio4: p4
        })
        setComisiones({
            comision1: c1,
            comision2: c2,
            comision3: c3,
            comision4: c4
        })
    }

    //Datos a insetar en los registros de la pestaña Factura
    const crearFila = (id, cantidad, producto, precio, comision, siva, subtotal) => {
        const obj = {
            idP: id,
            cantP: cantidad,
            nombreP: producto,
            precP: precio,
            porP: comision,
            ivaP: siva,
            subT: subtotal
        }
        if (factura.id_producto.includes(id)) {
            Swal.fire({
                icon: 'error',
                title: 'En Factura',
                text: 'Ya has agregado este producto a la Factura'
            })
            return
        }
        else if (cantidad > stock) {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad Errónea',
                text: 'La cantidad sobrepasa el stock del producto a vender'
            })
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Agregado a Factura',
            showConfirmButton: false,
            timer: 1000
        })
        setFactura({
            ...factura,
            id_producto: factura.id_producto.concat(id),
            cantidad: factura.cantidad.concat(cantidad),
            precio: factura.precio.concat(precio),
            porcentaje: factura.porcentaje.concat(comision),
            iva: factura.iva + siva,
            monto: factura.monto + subtotal
        })
        // setSub(sub + subtotal);
        // setIva(iva + siva);
        setListDet(listDet.concat(obj));
    }

    //PARA LOS TEST
    const imprime = () => {
        console.log(`datos de factura: 
        Num_Fac -> ${factura.num_factura}
        ID User -> ${factura.id_usuario}
        Id Cliente -> ${factura.id_cliente}
        Cliente-> ${factura.nombre_cliente}
        RUC -> ${factura.nruc}
        IVA -> ${factura.iva}
        Total -> ${factura.monto}`);

        console.log(`datos del Detalle: 
        ID Prod -> ${factura.id_producto}
        Cantidades -> ${factura.cantidad}
        Comisiones-> ${factura.porcentaje}
        Precios-> ${factura.precio}`);
    }

    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>
                <h2 onClick={() => imprime()} className="pb-2 border-bottom border-dark">Ventas</h2>

                <div className="card mt-4 mx-auto text-center">
                    <div className="card-header">
                        {/*----------- Pestañas de Navegacion --------------------*/}
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="productos-tab" data-bs-toggle="tab" data-bs-target="#productos"
                                    type="button" role="tab" aria-controls="productos" aria-selected="true">Productos</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="factura-tab" data-bs-toggle="tab" data-bs-target="#factura"
                                    type="button" role="tab" aria-controls="factura" aria-selected="false">Factura</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="cliente-tab" data-bs-toggle="tab" data-bs-target="#cliente"
                                    type="button" role="tab" aria-controls="cliente" aria-selected="false">Cliente</button>
                            </li>
                        </ul>

                        {/*----------- Contenedor con cada uno de los componentes que se verán segun la pestaña activa --------------------*/}
                    </div>
                    <div className="tab-content card-body table-responsive">
                        <div className="tab-pane fade show active" id="productos" role="tabpanel" aria-labelledby="productos-tab"><ProdVenta llenaCampos={llenaCampos} /></div>
                        <div className="tab-pane fade" id="factura" role="tabpanel" aria-labelledby="factura-tab"><Factura listaDetalles={listDet} sub={sub} iva={iva} factura={factura} setFactura={setFactura}/></div>
                        <div className="tab-pane fade" id="cliente" role="tabpanel" aria-labelledby="cliente-tab"><Customers /></div>

                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>
            </div>

            {/*----------- Modal que envia los datos a la Factura --------------------*/}
            <div className="modal fade" id="modalAddF" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Agregar a Factura</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/*----------- Formulario que envia los detalles de Factura --------------------*/}
                            <p className="text-center">Todos los campos son obligatorios. Por favor rellene los campos con datos válidos</p>

                            <FrmAddF crearFila={crearFila} idProd={idProd} nombreP={producto} precios={precios} comisiones={comisiones} 
                            siva={siva} setSubIva={setSubIva} subtotal={subtotal} setSubTotal={setSubTotal} />
                        
                        </div>
                        <div className="modal-footer"> 

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Ventas;