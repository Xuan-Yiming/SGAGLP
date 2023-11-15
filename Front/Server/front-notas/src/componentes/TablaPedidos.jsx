import React, { useState, useEffect, useRef } from 'react';
import { useTable, usePagination } from 'react-table';
import '../hojas-estilo/TablaPedidos.css';
import ReactPaginate from 'react-paginate';

const TablaPedidos = ({ columns, data ,longitud}) =>{

    const [paginas, setPaginas] = useState(0);

    useEffect(() => {

        verificar();

    }, [columns]);


    const verificar = async () => {
        console.log(data.length);
        console.log(data);
        console.log(longitud);
        setPaginas(Math.ceil(data.length/10));
    }

    const {
        
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of 'rows'
        prepareRow,
        state: { pageIndex, pageSize ,pageCount },
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page index and page size
        },
        usePagination // Use the usePagination plugin
      );
    


      return (
        <div>
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
              {page.map(row => {
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
    
          <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous Page
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {longitud}
                {/* {pageIndex + 1} of {page.length} */}
              </strong>{' '}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next Page
            </button>
          </div>
        </div>
      );
};

export default TablaPedidos;
