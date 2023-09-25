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
        Header: "Competencia",
        accessor: "descripcion",
        width: "30%"
    },
    {
        Header: "Creado por",
        accessor: "creadopor",
        width: "15%"
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

        const respuesta = await axios.post("http://localhost:3050/api/competencia/listarCompetencia", data, config);

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
