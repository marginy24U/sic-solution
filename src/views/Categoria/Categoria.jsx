import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// estilos
import './css/Categoria.css'
//componentes
import Navbar from '../../components/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Tabla from './components/Tabla';
import FrmActions from './components/FrmActions';

const Categoria = () => {
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

    const [listaCategorias, setListaCategorias] = useState([]);//datos traidos
    const [id_categoria, setIdCategoria] = useState(0);
    const [categoria, setCategoria] = useState({
        nombre: "",
        descripcion: ""
    })

    //Funcion para rellenar campos del formulario
    const formFill = (name, desc) => {
        setCategoria({
            nombre: name, descripcion: desc
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetCat = () => {
        setIdCategoria(0);
        setCategoria({
            nombre: "", descripcion: ""
        })
    }

    //-----CRUD
    useEffect(() => {
        const getCategorias = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://54.161.143.47:8080/api/categorias/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/categorias/all`);
                setListaCategorias(data.rows);
                setLoading(false);
                setTotalReg(data.message)

            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }

        getCategorias();
        setlistUpdated(false)
    }, [listUpdated]);

    //Registro
    const guardarCat = async () => {
        try {
            const { data } = await axios.post(`http://54.161.143.47:8080/api/categorias`, categoria);
            // const {data} = await axios.post(`http://localhost:3050/api/categorias`, categoria);
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
                ResetCat();
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

    //----------- Editar Categorias
    const ActualizaCat = async () => {
        try {
            const { data } = await axios.put(`http://54.161.143.47:8080/api/categorias/${id_categoria}`, categoria);
            // const { data } = await axios.put(`http://localhost:3050/api/categorias/${id_categoria}`, categoria);
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
    const deleteCat = async (id) => {
        try {
            const { data } = await axios.delete(`http://54.161.143.47:8080/api/categorias/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/categorias/${id}`);
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
    //---------------------------------------------------

    return (
        <div className="Principal w-100 min-vh-100">
            <Navbar />

            <Sidebar mOpen={mOpen} abreCierraMenu={abreCierraMenu} />

            <div className={`contenido ${!mOpen && "desplegado"}`}>

                <h2 className="pb-2 border-bottom border-dark">Categorías</h2>

                {/* Tarjeta de contenido */}
                <div className="card mt-4 mx-auto text-center">
                    {/* Cabecera */}
                    <div className="card-header p-3 d-flex justify-content-between">
                        <button onClick={() => { ResetCat(); setIsEditar(false) }} data-bs-toggle="modal" data-bs-target="#modalAddECat" type="button" className="btn btn-success">
                            Agregar Nuevo
                        </button>

                    </div>

                    {/* Cuerpo Tarjeta */}
                    <div className="card-body">

                        <Tabla listaCategorias={listaCategorias} setIdCategoria={setIdCategoria}  deleteCat={deleteCat} setIsEditar={setIsEditar} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddECat" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {
                                            isEditar
                                                ?
                                                <h5>Actualizar información</h5>
                                                :
                                                <h5>Agregar Nueva Categoría</h5>
                                        }
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-center">Ambos campos son obligatorios.</p>

                                        {/*----------- Formulario que ejecuta las Funciones --------------------*/}
                                        <FrmActions categoria={categoria} setCategoria={setCategoria} guardarCat={guardarCat} ActualizaCat={ActualizaCat} isEditar={isEditar} />
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
                {/* ------ Fin Tarjeta----------- */}


            </div>
        </div>
    )
}

export default Categoria
