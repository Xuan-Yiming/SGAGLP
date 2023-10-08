import axios from 'axios';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';

export const columns = [
    {
        Header: "Selección",
        accessor: "seleccion",
        width: "30%"
    },
    {
        Header: "Actividad",
        accessor: "actividad",
        width: "115%"
    },
    {
        Header: "Estado",
        accessor: "estado",
        width: "42%"
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
        console.log("dataPropuesta");
        console.log(data);
        const respuesta = await axios.post("http://localhost:3050/api/actividad/listarActividadesPorIdPropuesta", data, config);

        console.log(respuesta.data);
        console.log("aqui ACTIVIDADES");
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
