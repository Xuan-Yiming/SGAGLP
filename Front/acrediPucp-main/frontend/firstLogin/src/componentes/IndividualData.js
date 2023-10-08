
import React from 'react'

export const IndividualData = ({ individualExcelData }) => {
    return (
        <>
            <th>{individualExcelData.codigoPUCP}</th>
            <th>{individualExcelData.Nombre} &#160; {individualExcelData.ApellidoPaterno} &#160; {individualExcelData.ApellidoMaterno}</th>
            {/* <th></th>
            <th></th> */}
            <th>{individualExcelData.Rol}</th>
            <th>{individualExcelData.Correo}</th>
            <th>{individualExcelData.CorreoSecundario}</th>
            <th>{individualExcelData.Celular}</th>
        </>
    )
}