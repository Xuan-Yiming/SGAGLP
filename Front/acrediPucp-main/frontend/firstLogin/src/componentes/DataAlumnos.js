import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';



export const columns = [
    {
        Header: "Selección",
        accessor: "seleccion",
        width: "15%"
    },
    {
        Header: "Código",
        accessor: "codigo",
        width: "15%"
    },
    {
        Header: "Nombre Completo",
        accessor: "nombre",
        width: "30%"
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
}
)
);

export const getData = async (config, data) => {

    try {

        const respuesta = await axios.post("http://localhost:3050/api/alumno/listarAlumnoMuestra", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)

        // console.log(respuesta.data.data);

        return respuesta.data
    } catch (error) {
        console.log(error)
    }
};
