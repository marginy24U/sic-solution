//Hooks
import React, { useState, useEffect } from 'react';
//Librerias
import axios from 'axios';
import Swal from 'sweetalert2'
import md5 from 'md5';

//Componentes
import Navbar from '../../components/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import Tabla from './components/Tabla';
import FrmActions from './components/FrmActions';

const Usuarios = () => {
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
    const [listaUsuarios, setListaUsuarios] = useState([]);//datos traidos
    const [listUpdated, setlistUpdated] = useState(false);//referencia para actualizar la lista de datos

    const [id_usuario, setIdUsuario] = useState(0);
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        nick: "",
        pass: "",
        cargo: "",
        permiso: ""
    })

    //Funcion para rellenar campos del formulario
    const formFill = (name, ape, nic, pas, car, per) => {
        setUsuario({
            nombre: name, apellido: ape, nick: nic,
            pass: pas, cargo: car, permiso: per
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetU = () => {
        setIdUsuario(0);
        setUsuario({
            nombre: "", apellido: "", nick: "",
            pass: "", cargo: "", permiso: ""
        })
    }

    //-----CRUD
    useEffect(() => {

        const getUsuarios = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://54.161.143.47:8080/api/usuarios/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/usuarios/all`);
                setListaUsuarios(data.rows);
                setLoading(false);
                setTotalReg(data.message)

            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getUsuarios();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarU = async () => {
                
        try {
            // const nuevoUser = { nombre, apellido, nick, pass: md5(pass), cargo, permiso };
            const { data } = await axios.post(`http://54.161.143.47:8080/api/usuarios/`, usuario);
            // const {data} = await axios.post(`http://localhost:3050/api/usuarios/`, nuevoUser);
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
                ResetU();
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
    // Editar Info Usuario
    const ActualizaU = async () => {
        try {
            const { data } = await axios.put(`http://54.161.143.47:8080/api/usuarios/${id_usuario}`, usuario);
            // const { data } = await axios.put(`http://localhost:3050/api/usuarios/${id_usuario}`, usuario);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. La información no se actualizó',
                    showConfirmButton: true,
                })
                console.log(data);
                return
            }
            else {
                setlistUpdated(true)
                console.log(data);
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

    // ------------------------------------------
    //----------- Eliminar ----------------------
    const deleteU = async (id) => {
        try {
            const { data } = await axios.delete(`http://54.161.143.47:8080/api/usuarios/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/usuarios/${id}`);
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
                <h2 className="pb-2 border-bottom border-dark">Usuarios</h2>

                <div className="card mt-4 mx-auto text-center">

                    <div className="card-header p-3 d-flex justify-content-between">

                        <button onClick={() => { ResetU(); setIsEditar(false) }} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddEU">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>

                    <div className="card-body">
                        <Tabla listaUsuarios={listaUsuarios} setIdUsuario={setIdUsuario} deleteU={deleteU} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEU" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {
                                            isEditar
                                                ?
                                                <h5 className="modal-title" id="exampleModalLabel">Actualizar Info Usuario</h5>
                                                :
                                                <h5 className="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                                        }
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body">
                                        <p className="text-center">Todos losc campos son obligatorios. Por favor rellene los campos con datos válidos</p>

                                        {/*----------- Formulario que ejecuta las Funciones --------------------*/}
                                        <FrmActions usuario={usuario} setUsuario={setUsuario} guardarU={guardarU} ActualizaU={ActualizaU} isEditar={isEditar} />
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

export default Usuarios;