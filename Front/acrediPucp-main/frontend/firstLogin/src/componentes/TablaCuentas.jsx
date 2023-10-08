import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import Loader from "./loader/loader";
import '../HojasDeEstilo/TablaCuenta.css';

const TablaCuentas = ({ columns, data, isLoading, manualPagination = false, cambiarComponente, cambiarComponente2 }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);
    const [selectedRow, setSelectedRow] = useState(null);

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
                                <tr {...row.getRowProps()}
                                    className={`table-row ${selectedRow === row ? "selected" : ""}`} onClick={() => setSelectedRow(row)}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()} className={cell.column.id === "estado" ? "estado"
                                                : cell.column.id === "enviado" ? "enviado" : cell.column.id === "etapa" ? "etapa" : ""
                                            }>

                                                {cell.column.id === "estado" ? (
                                                    <span
                                                        className={(
                                                            cell.value.props.children === "Activo" ||
                                                            cell.value.props.children === "Vigente")
                                                            ? "elestado-activo"
                                                            : "elestado-inactivo"
                                                        }
                                                    >
                                                        {cell.render("Cell")}
                                                    </span>
                                                ) : cell.column.id === "enviado" ? (
                                                    <span
                                                        className={(
                                                            cell.value.props.children === 1) ? "elestado-activo"
                                                            : "elestado-inactivo"
                                                        }
                                                    >
                                                        {cell.render("Cell")}
                                                    </span>
                                                ) : cell.column.id === "etapa" ? (
                                                    <span
                                                        className={(
                                                            cell.value.props.children === "No iniciado") ? "no-iniciado"
                                                            : (
                                                                cell.value.props.children === "En progreso") ? "en-progreso"
                                                                : "finalizado"
                                                        } 
                                                    >
                                                        {cell.render("Cell")}
                                                    </span>
                                                ) : (
                                                    cell.render("Cell")
                                                )}

                                            </td>
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
