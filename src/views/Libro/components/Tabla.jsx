import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'

const Tabla = ({listaLibro, setIdLibro, deleteL, setIsEditar, formFill, loading}) => {
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
                setIsEditar(true); setIdLibro(rowData.id_libro); formFill(rowData.titulo, rowData.descripcion, rowData.stock, rowData.minimo, rowData.precio, 
                                                rowData.ubicacion, rowData.id_categoria)                    
            }}
                className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAddEL">
                <i className="fas fa-edit"></i>
            </button>
        },
        {
            title: "Elim",
            cellStyle: {
                borderRight: 'solid #6c757d 1px'
            },
            render: rowData => <button onClick={() => { validaElim(rowData.id_libro) }}
                className="btn btn-danger">
                <i className="fas fa-minus-circle"></i>
            </button>
        },

        { title: "Titulo", field: "titulo", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Descripcion", field: "descripcion", cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Stock", field: "stock", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "Minimo", field: "minimo", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Precio", field: "precio", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } }, 
        { title: "Ubicacion", field: "ubicacion", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "id_categoria", field: "id_categoria", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } },
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
                deleteL(id);
            }
        })
    }

    return (
        <Fragment>
            {
            loading &&
                <div className="spinner-border text-info mx-auto" role="status">
                    <span className="visually-hidden mx-auto">Loading...</span>
                </div>
            }
            <MaterialTable
                columns={columnas}
                data={listaLibro}
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
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Titulo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Descripcion</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} >Stock</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Minimo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Precio</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Ubicación</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Categoria</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    toolbar: {
                        searchTooltip: 'Busqueda',
                        searchPlaceholder: 'Busqueda'
                    },
                    body: {
                        emptyDataSourceMessage: "No hay registros",
                    },
                    pagination: {
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
