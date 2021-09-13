import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'

const Tabla = ({ listaClientes, setIdCliente, deleteC, setIsEditar, formFill, loading }) => {
    //------------ ESTILOS -----------------
    const useStyles = makeStyles({
        "@global tbody tr:nth-child(odd)": {
            background: "#E4E9F7"
        },
        "@global tbody tr:nth-child(even)": {
            background: "white"
        },
        titulos: {
            borderRight: 'solid #212529 1px'
        }
    });
    //Inicializamos los estilos
    const styles = useStyles();
    //---------------------------------------

    //--- Definimos las columnas que tendrá nuestra tabla. Las 2 primeras contienenlos botones de accion
    const columnas = [
        {
            title: "Edit",
            cellStyle: {
                borderLeft: 'solid #212529 1px'
            },
            render: rowData => <button onClick={() => {
                setIsEditar(true); setIdCliente(rowData.id_cliente); formFill(rowData.nombre, rowData.telefono, rowData.direccion, rowData.ciudad, rowData.email, 
                                                rowData.ruc, rowData.persona_contacto)                    
            }}
                className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAddEC">
                <i className="fas fa-edit"></i>
            </button>
        },

        {
            title: "Elim",
            cellStyle: {
                borderRight: 'solid #6c757d 1px'
            },
            render: rowData => <button onClick={() => { validaElim(rowData.id_cliente) }}
                className="btn btn-danger">
                <i className="fas fa-minus-circle"></i>
            </button>
        },

        { title: "Nombre", field: "nombre", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Telefono", field: "telefono", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "P Contacto", field: "persona_contacto", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "Correo", field: "email", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Ciudad", field: "ciudad", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Direccion", field: "direccion", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "RUC", field: "ruc", cellStyle: { borderRight: "solid #6c757d 1px" } },
    ]

    //----------- OPERACIONES -------------------
    //----------- Validamos la accion Eliminar ----------------------
    const validaElim = (id) => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "No podrás recuperar esta información",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Ejecutamos la función de eliminación
                deleteC(id);
            }
        })
    }

    return (
        <Fragment >
            {
            loading &&
                <div className="spinner-border text-info mx-auto" role="status">
                    <span className="visually-hidden mx-auto">Loading...</span>
                </div>
            }

            <MaterialTable
                columns={
                    columnas
                }
                data={listaClientes}
                title=""
                options={{
                    headerStyle: {
                        backgroundColor: '#212529',
                        border: '#212529',
    
                    }
                }}
    
                components={{
                    Header: props => {
                        return (
                            <TableHead className="">
                                <TableRow className="bg-dark border border-dark">
                                    <TableCell className={styles.titulos, "border-start-dark border-secondary text-white"} colSpan={2} align="center">Acciones</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Nombre</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Telefono</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} >P Contacto</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Correo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Ciudad</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Dirección</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">RUC</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Cliente'
                    },
                    body: {
                        emptyDataSourceMessage: "No hay registros",
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'filas',
                        firstAriaLabel: 'Primer pag',
                        firstTooltip: 'Primer pag',
                        previousAriaLabel: 'Anterior',
                        previousTooltip: 'Anterior',
                        nextAriaLabel: 'Siguiente',
                        nextTooltip: 'Siguiente',
                        lastAriaLabel: 'última',
                        lastTooltip: 'última'
                    }
                }}
            />
        </Fragment>
    )
}

export default Tabla
