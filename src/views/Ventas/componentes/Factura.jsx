import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import TablaCliente from './TablaCliente';

import Logo from '../imagenes/logoOriginal.png'
import '../css/Factura.css'

const Factura = ({ listaDetalles, sub, iva, factura, setFactura }) => {
    const cookies = new Cookies();

    const [listaClientes, setListaClientes] = useState([]);
    const [listaCUpdated, setlistaCUpdated] = useState(false)

    //Datos a guardar de la venta

    //no requeridos
    const [usuario, setUsuario] = useState("");
    const [apellido, setApellido] = useState("");

    const [nruc, setNRuc] = useState(0)//ruc
    //otros


    //------------ Operaciones
    //los datos se muestran al cargar la pagina
    useEffect(() => {
        const getUser = async () => {
            //datos del usuario logueado
            setFactura({...factura, id_usuario: cookies.get('id')});
            // setIdUser(cookies.get('id'));
            setUsuario(cookies.get('nombre'));
            setApellido(cookies.get('apellido'));
        }
        getUser();
    }, []);

    useEffect(() => {
        const getClientes = async () => {
            // setLoading(true);
            try {
                // const { data } = await axios.get(`http://54.161.143.47:8080/api/clientes/all`);
                const { data } = await axios.get(`http://localhost:3050/api/clientes/all`);
                setListaClientes(data.rows);
            } catch (error) {
                console.log(error);
                throw error
            }
        }

        getClientes();
        setlistaCUpdated(false)

    }, [listaCUpdated]);

    const guardarF = async (factura) => {
        try {
            // const { data } = await axios.post(`http://54.161.143.47:8080/api/clientes/`, cliente);
            const { data } = await axios.post(`http://localhost:3050/api/ventas/`, factura);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. No se pudo Facturar',
                    showConfirmButton: true,
                })
            }
            else {
                // setlistUpdated(true)
                // ResetC();
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.error(err)
            return
        }
    }

    // const envialo = (fac) => {
    //     console.log(fac);
    // }
    return (
        <div className="factura p-4 border border-dark d-flex flex-md-column">
            <img className="logo" src={Logo} alt="" />

            <header className="w-100 d-flex justify-content-between mt-3">
                {/* Formulario para la venta */}
                <form onSubmit={(e) => { e.preventDefault(); guardarF(factura) }} className="row g-2 needs-validation w-100 d-flex justify-content-between" novalidate>
                    <div className="col-md-4 d-flex flex-md-column">
                        <div className="col-md-8 d-flex flex-md-column">
                            <label className="">N° Factura:</label>
                            <input onChange={(e) => { setFactura({...factura, num_factura: e.target.value}) }} type="number" required />
                        </div>
                        <div className="col-md-8 d-flex flex-md-column">
                            <label className="mt-3">Vendedor:</label>
                            <input type="text" readOnly value={usuario + " " + apellido} />
                        </div>
                    </div>
                    
                    <div className="col-md-4 col-sm-2">

                    </div>

                    <div className="col-md-4 d-flex flex-md-column">
                        <div className="col-md-12 d-flex flex-md-column ">
                            <label className="">Cliente</label>
                            <span className="d-flex">
                                <button onClick={() => { setlistaCUpdated(true) }} className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalClientes"><i className="fas fa-plus-circle"></i></button>
                                <input className="col-md-10" type="text" value={factura.nombre_cliente} readOnly required />
                            </span>
                        </div>

                        <div className="col-md-12 d-flex flex-md-column ">
                            <label className="mt-2">N° RUC:</label>
                            <input type="text" readOnly value={factura.nruc} />
                        </div>

                        <div className="col-md-3 mt-3">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label" >Crédito</label>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-success me-2" type="submit">Facturar</button>
                    </div>
                </form>
            </header>

            <div className="table-responsive">
                <table className="mt-3 table table-striped">
                    <thead className="bg-dark text-white">
                        <tr>
                            {/* <th className="fw-bold">Quitar</th> */}
                            <th className="fw-bold">Cantidad</th>
                            <th className="fw-bold">Producto</th>
                            <th className="fw-bold">Precio</th>
                            <th className="fw-bold">Porcentaje</th>
                            <th className="fw-bold">IVA</th>
                            <th className="fw-bold">Sub-total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaDetalles.map(fila =>
                                <tr key={fila.idP}>
                                    {/* <td> <button className="btn btn-danger">Quit</button> </td> */}
                                    <td>{fila.cantP}</td>
                                    <td>{fila.nombreP}</td>
                                    <td>{fila.precP}</td>
                                    <td>{fila.porP}</td>
                                    <td>{fila.ivaP}</td>
                                    <td>{fila.subT}</td>
                                </tr>,

                            )
                        }

                    </tbody>
                </table>

                <div className="mt-5 d-flex justify-content-end">
                    <label htmlFor="">IVA:</label>
                    <input className="TotalBox" type="number" readOnly value={factura.iva} />

                    <label className="ms-3" htmlFor="">Monto Total:</label>
                    <input className="TotalBox" type="number" readOnly value={factura.monto} />
                </div>

            </div>

            {/* modal de seleccion de clientes */}
            <div className="modal fade" id="modalClientes" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Agregar a Factura</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/*----------- Lista de clientes --------------------*/}
                            <TablaCliente listaClientes={listaClientes}  factura={factura} setFactura={setFactura} />
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
            {/* fin modal */}
        </div>
    )
}

export default Factura
