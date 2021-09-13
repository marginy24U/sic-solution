import React, { Fragment, Children, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import {Modal, TextField ,Button} from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles"
// estilos
import './App.css';

//Rutas
import Routes from "./rutas";

function App() {

  return (
    <Routes />
  );
}

export default App;
