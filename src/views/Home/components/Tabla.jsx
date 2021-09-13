import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2'

const Tabla = ({ listaProductos, setIdProd, setIsEditar, deleteProd, formFill, loading }) => {
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
                setIsEditar(true); setIdProd(rowData.id_producto); formFill(rowData.marca, rowData.modelo, rowData.stock, rowData.minimo, rowData.costo_impo,
                    rowData.precio1, rowData.precio2, rowData.precio3, rowData.precio4, rowData.comision1, rowData.comision2, rowData.comision3, rowData.comision4,
                    rowData.linea, rowData.descripcion)
            }}
                className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAddEP">
                <i className="fas fa-edit"></i>
            </button>
        },

        {
            title: "Elim",
            cellStyle: {
                borderRight: 'solid #6c757d 1px'
            },
            render: rowData => <button onClick={() => { validaElim(rowData.id_producto) }}
                className="btn btn-danger">
                <i className="fas fa-minus-circle"></i>
            </button>
        },

        { title: "Descripcion", field: "descripcion", cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Marca", field: "marca", cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Modelo", field: "modelo", cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Stock", field: "stock", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "Minimo", field: "minimo", cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Costo-Impo", field: "costo_impo", cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Linea", field: "linea", cellStyle: { borderRight: "solid #6c757d 1px" } },
        { title: "Precio1", field: "precio1", type: 'numeric' }, { title: "Precio2", field: "precio2", type: 'numeric' }, { title: "Precio3", field: "precio3", type: 'numeric' },
        { title: "Precio4", field: "precio4", type: 'numeric', cellStyle: { borderRight: "solid #6c757d 1px" } }, { title: "Comision1", field: "comision1", type: 'numeric' }, { title: "Comision2", field: "comision2", type: 'numeric' },
        { title: "Comision3", field: "comision3", type: 'numeric' }, { title: "Comision4", field: "comision4", type: 'numeric', cellStyle: { borderRight: "solid #212529 1px" } },
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
                deleteProd(id);
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
                data={listaProductos}
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
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Descripción</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"}>Marca</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} >Modelo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Stock</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Minimo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Costo-Impo</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">Linea</TableCell>
                                    <TableCell className={styles.titulos, "border border-secondary text-white"} colSpan={4} align="center">Precio</TableCell>
                                    <TableCell className={styles.titulos, "border-start-dark border-secondary text-white"} colSpan={4} align="center">Comisión</TableCell>
                                </TableRow>
                            </TableHead>
                        )
                    }
                }}
    
                localization={{
                    toolbar: {
                        searchTooltip: 'Búsqueda',
                        searchPlaceholder: 'Buscar Producto'
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

    );
};

export default Tabla;