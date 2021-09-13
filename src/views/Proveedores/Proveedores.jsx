//Hooks
import React, { useState, useEffect } from 'react';
//Librerias
import axios from 'axios';
import Swal from 'sweetalert2';
//Componentes
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Tabla from './components/Tabla';
import FrmActions from './components/FrmActions';

const Proveedores = () => {
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
    const [loading, setLoading] = useState(false)//Referencia para spiner
    const [isEditar, setIsEditar] = useState(false)//referencia para tipo de accion de formulario
    const [totalReg, setTotalReg] = useState("");//referencia de datos cargados
    const [listUpdated, setlistUpdated] = useState(false);//referencia para actualizar la lista de datos

    const [listaProveedores, setListaProveedores] = useState([]);//datos traidos
    const [id_proveedor, setIdProveedor] = useState(0);
    const [proveedor, setProveedor] = useState({
        nombre: "",
        descripcion: "",
        telefono: 0,
        nombre_contacto: "",
        email: ""
    })

    //Funcion para rellenar campos del formulario
    const formFill = (name, desc, tel, nc, em) => {
        setProveedor({
            nombre: name, descripcion: desc, telefono: tel,
            nombre_contacto: nc, email: em
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetProv = () => {
        setIdProveedor(0);
        setProveedor({
            nombre: "", descripcion: "",
            telefono: 0, nombre_contacto: "", email: ""
        })
    }

    //-----CRUD
    useEffect(() => {
        const getProveedor = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://54.161.143.47:8080/api/proveedores/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/proveedores/all`);
                setListaProveedores(data.rows);
                setLoading(false);
                setTotalReg(data.message)
            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getProveedor();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarProv = async () => {
        try {
            const { data } = await axios.post(`https://54.161.143.47:8080/api/proveedores/`, proveedor);
            //const { data } = await axios.post(`http://localhost:3050/api/proveedores/`, proveedor);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. Dato no guardado',
                    showConfirmButton: true,
                })
            }
            else {
                setlistUpdated(true)
                ResetProv();
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

    // Editar Info Proveedor
    const ActualizaProv = async () => {
        try {
            const { data } = await axios.put(`https://54.161.143.47:8080/api/proveedores/${id_proveedor}`, proveedor);
            // const { data } = await axios.put(`http://localhost:3050/api/proveedores/${id_proveedor}`, proveedor);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. La información no se actualizó',
                    showConfirmButton: true,
                })
                return
            }
            else {
                setlistUpdated(true)
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

    //Eliminar
    const deleteProv = async (id) => {
        try {
            const { data } = await axios.delete(`https://54.161.143.47:8080/api/proveedores/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/proveedores/${id}`);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'No se ha completado la acción. Probablemente este dato sea importante para otros procesos',
                    showConfirmButton: true,
                })
            }
            else {
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido eliminado.',
                    'success'
                )
                setlistUpdated(true)
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>

                <h2 className="pb-2 border-bottom border-dark">Proveedores</h2>

                <div className="card mt-4 mx-auto text-center">
                    {/* card-header  */}
                    <div className="card-header p-3 d-flex justify-content-between">
                        <button onClick={() => { ResetProv(); setIsEditar(false) }} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddEProv">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>

                    {/* card-body */}
                    <div className="card-body">
                        <Tabla listaProveedores={listaProveedores} setIdProveedor={setIdProveedor} deleteProv={deleteProv} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEProv" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {
                                            isEditar
                                                ?
                                                <h5>Actualizar información</h5>
                                                :
                                                <h5>Agregar Nuevo</h5>
                                        }
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-center">Los campos marcados con asterisco son obligatorios. Por favor rellene los campos con datos válidos</p>

                                        {/*----------- Formulario que ejecuta las Funciones --------------------*/}
                                        <FrmActions proveedor={proveedor} setProveedor={setProveedor} guardarProv={guardarProv} ActualizaProv={ActualizaProv} isEditar={isEditar} />
                                    </div>
                                    <div className="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin Modal  */}

                    </div>

                    {/* Footer Tarjeta */}
                    <div className="card-footer text-muted">

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Proveedores
