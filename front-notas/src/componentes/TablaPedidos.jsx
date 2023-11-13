import React, { useState, useEffect, useRef } from 'react';
import '../hojas-estilo/TablaPedidos.css';
import { useTable } from "react-table";

const TablaPedidos = ({ columns, data }) =>{

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data });
    


  return (
    <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                </tr>
            );
            })}
        </tbody>
        </table>
  );
};

export default TablaPedidos;
