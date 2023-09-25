import axios from 'axios';
// import { addDatosCompetencias } from '../Redux/CompetenciasSlice';

export const columnsMuestra = [
    {
        Header: "Seleccion",
        accessor: "seleccion",
        width: "15%"
    },
    {
        Header: "Muestra",
        accessor: "muestra",
        width: "20%"
    },
    {
        Header: "Encargado",
        accessor: "encargado",
        width: "65%"
    },
    {
        Header: "Edición",
        accessor: "edicion",
        width: "20%"
    },

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

export const getDataMuestra = async (config, data) => {
    console.log("ACAAAA")
    console.log(data)
    try {

        const respuesta = await axios.post("http://localhost:3050/api/espacioMedicion/listarMuestrasEnEspacio", data, config);

        console.log(respuesta.data);
        console.log("aqui MUESTRAAAAAAA");
        console.log("data es" + respuesta)
        return respuesta.data
    } catch (error) {
        console.log(error)
    }

};
