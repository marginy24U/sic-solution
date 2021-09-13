import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const TablaVenta = ({listDet, setListDet}) => {
    const useStyles = makeStyles({
        "@global tbody tr:nth-child(odd)": {
            background: "#E4E9F7"
        },
        "@global tbody tr:nth-child(even)": {
            background: "white"
        },
        header: {
            backgroundColor: '#212529',
        },
        titulos: {
            color: '#fff',
            border: 'solid white 1px'
        },
        modalBtn: {
            columnGap: '20px'
        }
    });

    
    //Datatable - Datos a renderizar en la tabla (Material Table)
    const columnas = [
        {
            title: "Quitar",
            render: rowData => <button
                    className="btn btn-danger">
                    <i className="fas fa-minus-circle"></i>
                    </button>
        },

        { title: "Cantidad", field: "cantidad"}, { title: "Producto", field: "producto"}, { title: "Precio", field: "precio"}, { title: "Porcentaje", field: "porcentaje" }, 
        { title: "IVA", field: "iva" }, { title: "Sub-total", field: "subtotal" }
    ]
    //--------------------------------------------------------------
    //------------ Constantes de Estado ----------------------------
    // const [listDet, setListDet] = useState([]);

    // inicializamos los estilos
    const styles = useStyles();
    return (
        <Fragment >
           
            <MaterialTable
                columns={
                    columnas
                }
                data={listDet}
                title=""
                options={{
                    headerStyle: {
                        backgroundColor: '#212529',
                        border: '#212529',
    
                    }
                }}
    
                // components={{
                //     Header: props => {
                //         return (
                //             <TableHead className="">
                //                 <TableRow className="bg-dark border border-dark">
                //                     <TableCell className={styles.titulos, "border-start-dark border-secondary text-white"} align="center">Seleccionar</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"}>Nombre</TableCell>
                //                     <TableCell className={styles.titulos, "border border-secondary text-white"} align="center">RUC</TableCell>
                //                 </TableRow>
                //             </TableHead>
                //         )
                //     }
                // }}
    
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

export default TablaVenta
