import React from 'react';
//Hooks
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Componentes | Vistas
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Clientes from '../views/Clientes/Clientes';
import Usuarios from '../views/Usuarios/Usuarios';
import Ventas from '../views/Ventas/Ventas';
import Categoria from '../views/Categoria/Categoria';
import Libro from '../views/Libro/Libro';
import Materiales from '../views/Materiales/Materiales';
import Proveedores from '../views/Proveedores/Proveedores';
import Four0Four from "../views/404/Four0Four";

const Routes = () => {
    return (
        <Router>          
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>

                <Route path="/home">
                    <Home />
                </Route>
                
                <Route path="/clientes">
                    <Clientes />
                </Route>
                
                <Route path="/usuarios">
                    <Usuarios />
                </Route>
                
                <Route path="/ventas">
                    <Ventas />
                </Route>

                <Route path="/categorias">
                    <Categoria />
                </Route>
                
                <Route path="/libro">
                    <Libro />
                </Route>

                <Route path="/materiales">
                    <Materiales />
                </Route>
                
                <Route path="/proveedores">
                    <Proveedores />
                </Route>
                
                <Route>
                    <Four0Four />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;