import React, { useMemo } from "react";
import { useTable } from "react-table";
import Loader from "./loader/loader";
import '../HojasDeEstilo/TablaCuenta.css';

const TablaCuentas = ({ columns, data, isLoading, manualPagination = false, cambiarComponente, cambiarComponente2 }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columnData,
        data: rowData,
        manualPagination,
    });
    return (
        <>
            <>
                <table {...getTableProps()} className="tablaGC">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}
                                        style={{ width: column.render("width") }}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            // <td {...cell.getCellProps()} className={cell.column.id === "estado" ? "estado " : ""}>
                                            //     {cell.column.id === "estado" ? (
                                            //        <span className={(cell.value.props.children == "Activo"|| cell.value.props.children == "Vigente")? "elestado-activo" : "elestado-inactivo"}>
                                            //        {cell.render("Cell")}
                                            //    </span>
                                            //     ) : (
                                            //         cell.render('Cell')
                                            //     )}


                                            // </td>
                                            <td {...cell.getCellProps()}>{cell.render("Cell")} </td>

                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </>

        </>
    );
};

export default TablaCuentas;
