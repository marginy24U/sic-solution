import React, { useState, useEffect } from 'react';
//Librerias
import axios from 'axios';
import Swal from 'sweetalert2'
//Estilos
import './css/home.css';
//Componentes
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Tabla from './components/Tabla';
import FrmActions from './components/FrmActions';

const Home = () => {
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
    const [listaProductos, setListaProductos] = useState([]);//datos traidos
    const [listUpdated, setlistUpdated] = useState(false);//referencia para actualizar la lista de datos

    const [id_producto, setIdProd] = useState(0);
    const [producto, setProducto] = useState({
        marca: "",
        modelo: "",
        stock: 0,
        minimo: 0,
        costo_impo: 0,
        precio1: 0,
        precio2: 0,
        precio3: 0,
        precio4: 0,
        comision1: 0,
        comision2: 0,
        comision3: 0,
        comision4: 0,
        linea: "",
        descripcion: ""

    })

    //Funcion para rellenar campos del formulario
    const formFill = (mar, mod, stc, min, ci, p1, p2, p3, p4, c1, c2, c3, c4, ln, desc) => {
        setProducto({
            marca: mar, modelo: mod, stock: stc, minimo: min, costo_impo: ci,
            precio1: p1, precio2: p2, precio3: p3, precio4: p4,
            comision1: c1, comision2: c2, comision3: c3, comision4: c4,
            linea: ln, descripcion: desc
        })
    }

    //Funcion para Resetear los valores del objeto producto
    const ResetP = () => {
        setIdProd(0);
        setProducto({
            marca: "", modelo: "", stock: 0, minimo: 0, costo_impo: 0,
            precio1: 0, precio2: 0, precio3: 0, precio4: 0,
            comision1: 0, comision2: 0, comision3: 0, comision4: 0,
            linea: "", descripcion: ""
        })
    }

    //Listando productos cada vez que se actualiza la lista
    useEffect(() => {
        const getProductos = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://54.161.143.47:8080/api/productos/all`);
                // const { data } = await axios.get(`http://localhost:3050/api/productos/all`);
                setListaProductos(data.rows)
                setLoading(false);
                setTotalReg(data.message)
            } catch (error) {
                setLoading(false);
                console.log(error);
                throw error
            }
        }
        getProductos();
        setlistUpdated(false)
    }, [listUpdated]);

    // //----------- Registrar----------------------
    const guardarP = async () => {
        try {
            const { data } = await axios.post(`https://54.161.143.47:8080/api/productos/`, producto);
            // const { data } = await axios.post(`http://localhost:3050/api/productos/`, producto);
            if (data.status != 200) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    text: 'Algo salio mal. Dato no guardado',
                    showConfirmButton: true,
                })
                console.log(data);
            }
            else {
                setlistUpdated(true)
                ResetP();
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

    // Editar Info Producto
    const ActualizaP = async () => {
        try {
            const { data } = await axios.put(`https://54.161.143.47:8080/api/productos/${id_producto}`, producto);
            // const { data } = await axios.put(`http://localhost:3050/api/productos/${id_producto}`, producto);
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
    const deleteProd = async (id) => {
        try {
            const { data } = await axios.delete(`https://54.161.143.47:8080/api/productos/${id}`);
            // const { data } = await axios.delete(`http://localhost:3050/api/productos/${id}`);
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
                <h2 className="pb-2 border-bottom border-dark">Productos </h2>

                <div className="card mt-4 mx-auto text-center">

                    <div className="card-header p-3 d-flex justify-content-between">

                        <button onClick={() => { ResetP(); setIsEditar(false) }} data-bs-toggle="modal" data-bs-target="#modalAddEP" type="button" className="btn btn-success">
                            Agregar Nuevo
                        </button>

                        <h5>{totalReg}</h5>
                    </div>

                    <div className="card-body">
                        <Tabla listaProductos={listaProductos} setIdProd={setIdProd} setIsEditar={setIsEditar} deleteProd={deleteProd} formFill={formFill} loading={loading} />

                        {/* ------ Modal que contiene el formulario de edicion y agregacion ------ */}
                        <div className="modal fade" id="modalAddEP" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <p className="text-center">Los campos marcados con asterisco son requeridos. Por favor rellene los campos con datos válidos</p>

                                        {/*----------- Formulario que ejecuta las funciones --------------------*/}
                                        <FrmActions producto={producto} setProducto={setProducto} guardarP={guardarP} ActualizaP={ActualizaP} isEditar={isEditar} />
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

export default Home;