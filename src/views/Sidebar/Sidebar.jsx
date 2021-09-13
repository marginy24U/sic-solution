import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
// Dependencias
import Cookies from 'universal-cookie';
//Estilos
import './css/sidebar.css';
//imagenes
import logo from './imagenes/logo.png'
import user from './imagenes/user.png'

const Sidebar = ({mOpen, abreCierraMenu}) => {
    const cookies = new Cookies();
    const [usuario, setUsuario] = useState("");
    const [permiso, setPermiso] = useState("");

    useEffect(()=>{
        const getUser = ()=>{
            setUsuario(cookies.get("user"));
            setPermiso(cookies.get("permiso"));
        }
        getUser();
    }, [])


    return (
        <div className="lateral d-flex">
            
            <aside className={`menu ${!mOpen && "oculto"}`}>
                {/* area logo */}
                <div className={`sec-logo mt-2 ${!mOpen && "oculto"}`}>
                    <img className="logo mx-auto d-block" src={logo} alt="" />
                </div> 

                {/* area usuario */}
                <div className={`sec-user mx-2 my-2 py-2 border-top border-bottom border-light text-center ${!mOpen && "oculto"}`}>
                    <img className="user-img mx-auto mb-2 d-block" src={user} alt="" />
                    <span className="text-white">{usuario}</span>
                </div>

                {/* area menu */}
                <ul className="list-group mx-2">
                    <NavLink to='/home' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white" activeClassName="active">
                        <i className="fas fa-cubes"></i> <span className={`texto ${!mOpen && "oculto"}`}>Productos</span> 
                    </NavLink>
                    <NavLink to='/clientes' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i className="fas fa-handshake"></i> <span className={`texto ${!mOpen && "oculto"}`}>Clientes</span> 
                    </NavLink>
                    {
                        permiso === "ADMIN" &&
                        <NavLink to='/usuarios' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                            <i className="fas fa-id-badge"></i> <span className={`texto ${!mOpen && "oculto"}`}>Empleados</span> 
                        </NavLink>
                    }
                    <NavLink to='/ventas' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i className="fas fa-cash-register"></i> <span className={`texto ${!mOpen && "oculto"}`}>Vender</span> 
                    </NavLink>
                    <NavLink to='/materiales' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i class="fas fa-archive"></i> <span className={`texto ${!mOpen && "oculto"}`}>Materiales</span> 
                    </NavLink>
                    <NavLink to='/clientesfdhg' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i className="fas fa-hand-holding-usd"></i> <span className={`texto ${!mOpen && "oculto"}`}>Ingresos</span> 
                    </NavLink>
                    <NavLink to='/categorias' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i class="fas fa-swatchbook"></i> <span className={`texto ${!mOpen && "oculto"}`}>Categorias</span> 
                    </NavLink>
                    <NavLink to='/libro' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i class="fas fa-book"></i> <span className={`texto ${!mOpen && "oculto"}`}>Libro</span> 
                    </NavLink>
                    <NavLink to='/proveedores' className="p-0 list-group-item position-relative d-flex align-items-center bg-transparent border-0 text-white">
                        <i class="fas fa-truck-loading"></i> <span className={`texto ${!mOpen && "oculto"}`}>Proveedores</span> 
                    </NavLink>
                </ul>
            </aside>

            <button onClick={abreCierraMenu} className="btn btn-dark text-white align-self-start "><i className="fas fa-bars"></i></button>
        </div>
    );
};

export default Sidebar;