import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';


const Navbar = () => {
    const cookies = new Cookies();
    let history = useHistory();

    const cerrarSesion = () => {
        cookies.remove('id', {path:"/"});
        cookies.remove('permiso', {path:"/"});
        cookies.remove('user', {path:"/"});
        cookies.remove('nombre', {path:"/"});
        cookies.remove('apellido', {path:"/"});
        history.push('./');
    }
    useEffect(()=>{
        const validaSesion = ()=> {
            if (!cookies.get('user')) {
                history.push('./');  
            }
        }
        validaSesion();
    },[]);
    
    return (
        <nav className="barra-top bg-dark w-100 position-fixed d-flex justify-content-end px-4">
            <button onClick={() => cerrarSesion()} className="btn btn-dark text-light">Salir<i className="fas fa-power-off mx-2"></i></button>
        </nav>
    )
}

export default Navbar
