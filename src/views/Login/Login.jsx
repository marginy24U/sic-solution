import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
//Estilos
import './css/Login.css';
import logo from './imagenes/logo.png';


function Login() {
    let history = useHistory();
    
    // const id = 13;
    const cookies = new Cookies();
    const [nick, setNick] = useState("");
    const [pass, setPass] = useState("");
    const [access, setAccess] = useState(true);

    useEffect(()=>{
        const validaSesion = ()=> {
            if (cookies.get('id') && cookies.get('user') && cookies.get('permiso')) {
                history.push('./Home');  
            }
        }
        validaSesion();
    }, []);

    const iniciarSesion= async(e)=>{
        e.preventDefault();
        try {
             const {data} = await axios.get(`http://54.161.143.47:8080/api/usuarios/${nick}/${pass}`)
            //  const {data} = await axios.get(`http://localhost:3050/api/usuarios/${nick}/${pass}`)
            
                if (data.status === 200) {
                    console.log(data.rows.length);
                    const respuesta = data.rows[0];
                    cookies.set('id', respuesta.id_usuario, {path: "/"});
                    cookies.set('nombre', respuesta.nombre, {path: "/"});
                    cookies.set('apellido', respuesta.apellido, {path: "/"});
                    cookies.set('user', respuesta.nick, {path: "/"});
                    cookies.set('permiso', respuesta.permiso, {path: "/"});
                    Swal.fire({
                        icon: 'success',
                        title: `Bienvenido ${respuesta.nombre}`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    setAccess(true);
                    history.push('./Home');
                }    
                else{
                    setAccess(false);
                }
                console.log(data);
            
                       
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="Contenedor d-flex vh-100">

            <div className="cajaLogin m-auto px-4 d-flex flex-column align-items-center border border-light">   
                <img className="w-75 mt-4" src={logo} alt="" />
                
                <form onSubmit={iniciarSesion} className="mt-4 w-100">
                    <div className="input-group mt-3 ">
                        <span className="input-group-text icono-caja text-dark"><i className="fas fa-user"></i></span>
                        <input type="text" onChange={(e)=>setNick(e.target.value)} className="form-control" placeholder="Username" required />
                    </div>

                    <div className="input-group mt-3 ">
                        <span className="input-group-text icono-caja text-dark"><i className="fas fa-lock"></i></span>
                        <input type="password" onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Password" required />
                    </div>

                    <button type="submit" className="btn btn-primary bg-gradient mt-3 w-100"><a className="text-white">Ingresar</a> </button>
                </form>

                {
                !access &&
                    <div className="mt-4 text-center w-100 alert alert-danger" role="alert">
                        <strong>No hay coincidencias</strong>
                    </div>
                }
            </div>
        </div>
    );
}

export default Login;