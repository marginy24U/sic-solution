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

const Materiales = () => {
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

    const [listaMateriales, setListaMateriales] = useState([]);//datos traidos
    const [id_materia, setIdMateria] = useState(0);
    const [materia, setMateria] = useState({
        nombre: "",
        descripcion: "",
        unidad: "",
        stock: 0,
        minimo: 0,
        ubicacion: ""
    })

    //Funcion para rellenar campos del formulario
    const formFill = (name, desc, uni, st, min, ub) => {
        setMateria({
            nombre: name, descripcion: desc, unidad: uni,
            stock: st, minimo: min, ubicacion: ub
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetM = () => {
        setIdMateria(0);
        setMateria({
            nombre: "", descripcion: "", unidad: "",
            stock: 0, minimo: 0, ubicacion: ""
        })
    }

    //-----CRUD
    useEffect(() => {
        const getMateria = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://54.161.143.47:8080/api/materia/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/materia/all`);
                setListaMateriales(data.rows);
                setLoading(false);
                setTotalReg(data.message)
            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getMateria();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarM = async () => {
        try {
            const { data } = await axios.post(`http://54.161.143.47:8080/api/materia/`, materia);
            //const { data } = await axios.post(`http://localhost:3050/api/materia/`, materia);
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
                ResetM();
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

    // Editar Info Materia P
    const ActualizaM = async () => {
        try {
            const { data } = await axios.put(`http://54.161.143.47:8080/api/materia/${id_materia}`, materia);
            // const { data } = await axios.put(`http://localhost:3050/api/materia/${id_materia}`, materia);
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
    const deleteM = async (id) => {
        try {
            const { data } = await axios.delete(`http://54.161.143.47:8080/api/materia/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/materia/${id}`);
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

                <h2 className="pb-2 border-bottom border-dark">Materiales</h2>

                <div className="card mt-4 mx-auto text-center">
                    {/* card-header  */}
                    <div className="card-header p-3 d-flex justify-content-between">
                        <button onClick={() => { ResetM(); setIsEditar(false) }} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddEM">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>

                    {/* card-body */}
                    <div className="card-body">
                        <Tabla listaMateriales={listaMateriales} setIdMateria={setIdMateria} deleteM={deleteM} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEM" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {
                                            isEditar
                                                ?
                                                <h5>Actualizar información</h5>
                                                :
                                                <h5>Agregar Nueva</h5>
                                        }
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-center">Los campos marcados con asterisco son obligatorios. Por favor rellene los campos con datos válidos</p>

                                        {/*----------- Formulario que ejecuta las Funciones --------------------*/}
                                        <FrmActions materia={materia} setMateria={setMateria} guardarM={guardarM} ActualizaM={ActualizaM} isEditar={isEditar} />
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

export default Materiales
