import axios from 'axios';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';

export const columns = [
    {
        Header: "Selección",
        accessor: "seleccion",
        width: "8%"
    },
    {
        Header: "Codigo",
        accessor: "codigo",
        width: "8%"
    },
    {
        Header: "Plan de mejora",
        accessor: "planMejora",
        width: "20%"
    },
    {
        Header: "Creado por",
        accessor: "creadoPor",
        width: "15%"
    },
    {
        Header: "Fecha de creacion",
        accessor: "fechaCreacion",
        width: "15%"
    },
    {
        Header: "Estado",
        accessor: "estado",
        width: "15%"
    },
    {
        Header: "Etapa",
        accessor: "etapa",
        width: "10%"
    }
];

export const formatRowData = (rawData) => rawData.map((Usuario) => ({
    //     seleccion: <input
    //     className="checkboxGC"
    //     type="checkbox"
    // />,
    //     codigo: Usuario.codigoPUCP,
    //     nombre: Usuario.nombre,
    //     correo: Usuario.correo,
    //     estado: Usuario.estado,
}));

export const getData = async (config, data) => {
    console.log("ACAAAA")
    try {
        console.log("data");
        console.log(data);
        const respuesta = await axios.post("http://localhost:3050/api/planMejora/listarHistoricoPlanMejora", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)
        return respuesta.data
    } catch (error) {
        console.log(error)
    }

    //   const response = await fetch(
    //     `https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=15`
    //   );
    //   const data = await response.json()
    //   console.log(data);
    //   return data
    //   fetch(
    //     `https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=10`
    //   ).then((res) => res.json().then((data) => console.log(data)));
};
