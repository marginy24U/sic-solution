import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'

const Tabla = ({ listaCategorias, setIdCategoria, deleteCat, setIsEditar, formFill, loading }) => {
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
        },
        acciones: {
            width: '100px'
        },
        campos: {
            minWidth: '150px'
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
                setIsEditar(true); setIdCategoria(rowData.id_categoria); formFill(rowData.nombre, rowData.descripcion)                    
            }}
                className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAddECat">
                <i className="fas fa-edit"></i>
            </button>
        },

        {
            title: "Elim",
            cellStyle: {
                borderRight: 'solid #6c757d 1px'
            },
            render: rowData => <button onClick={() => { validaElim(rowData.id_categoria) }}
                className="btn btn-danger">
                <i className="fas fa-minus-circle"></i>
            </button>
        },

        { title: "Nombre", field: "nombre", cellStyle: { borderRight: "solid #6c757d 1px", maxWidth: "auto" } }, 
        { title: "Descripcion", field: "descripcion", cellStyle: { borderRight: "solid #6c757d 1px", maxWidth: "auto" } },
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
                deleteCat(id);
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
                data={listaCategorias}
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
                                    <TableCell className={styles.titulos, styles.acciones, "border-start-dark border-secondary text-white"} colSpan={2} align="center">Acciones</TableCell>
                                    <TableCell className={styles.titulos, styles.campos, "border border-secondary text-white"}>Nombre</TableCell>
                                    <TableCell className={styles.titulos, styles.campos, "border border-secondary text-white"} align="center">Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Categoria'
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
