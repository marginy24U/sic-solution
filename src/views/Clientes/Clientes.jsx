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
//Estilos
import './css/Clientes.css';

const Clientes = () => {
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
    
    const [listaClientes, setListaClientes] = useState([]);//datos traidos
    const [id_cliente, setIdCliente] = useState(0);
    const [cliente, setCliente] = useState({
        nombre: "",
        telefono: 0,
        direccion: "",
        ciudad: "",
        email: "",
        ruc: "",
        persona_contacto: "",
    })

    //Funcion para rellenar campos del formulario
    const formFill = (name, tel, dir, city, correo, ruc, pc) => {
        setCliente({
            nombre: name, telefono: tel, direccion: dir,
            ciudad: city, email: correo, ruc: ruc, persona_contacto: pc,
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetC = () => {
        setIdCliente(0);
        setCliente({
            nombre: "", telefono: 0, direccion: "",
            ciudad: "", email: "", ruc: "", persona_contacto: ""
        })
    }

    //-----CRUD
    useEffect(() => {
        const getClientes = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://54.161.143.47:8080/api/clientes/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/clientes/all`);
                setListaClientes(data.rows);
                setLoading(false);
                setTotalReg(data.message)

            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getClientes();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarC = async () => {
        try {
            const { data } = await axios.post(`http://54.161.143.47:8080/api/clientes/`, cliente);
            //const { data } = await axios.post(`http://localhost:3050/api/clientes/`, cliente);
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
                ResetC();
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

    // Editar Info Cliente
    const ActualizaC = async () => {
        try {
            const { data } = await axios.put(`http://54.161.143.47:8080/api/clientes/${id_cliente}`, cliente);
            // const { data } = await axios.put(`http://localhost:3050/api/clientes/${id_cliente}`, cliente);
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
    const deleteC = async (id) => {
        try {
            const { data } = await axios.delete(`http://54.161.143.47:8080/api/clientes/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/clientes/${id}`);
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
                <h2 className="pb-2 border-bottom border-dark">Clientes</h2>

                <div className="card mt-4 mx-auto text-center">
                    <div className="card-header p-3 d-flex justify-content-between">

                        <button onClick={() => { ResetC(); setIsEditar(false) }} data-bs-toggle="modal" data-bs-target="#modalAddEC" type="button" className="btn btn-success">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>


                    <div className="card-body">
                        <Tabla listaClientes={listaClientes} setIdCliente={setIdCliente}  deleteC={deleteC} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEC" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <FrmActions cliente={cliente} setCliente={setCliente} guardarC={guardarC} ActualizaC={ActualizaC} isEditar={isEditar} />
                                    </div>
                                    <div className="modal-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin Modal  */}

                    </div>

                    <div className="card-footer text-muted">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Clientes;