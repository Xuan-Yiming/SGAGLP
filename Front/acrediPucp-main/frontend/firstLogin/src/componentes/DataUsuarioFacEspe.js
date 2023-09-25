import axios from 'axios';

export const columns = [
    {
        Header: "",
        accessor: "seleccion",
        width: "9%"
    },
    {
        Header: "Código",
        accessor: "codigo",
        width: "15%"
    },
    {
        Header: "Nombre Completo",
        accessor: "nombre",
        width: "40%"
    },
    {
        Header: "Correo",
        accessor: "correo",
        width: "36%"
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

export const getDataResFacu = async (config, data) => {

    try {
        const respuesta = await axios.post("http://localhost:3050/api/facultad/listarResponsablesFacultad", data, config);

        console.log(respuesta.data);
        console.log("aquiRES");

        return respuesta.data
    } catch (error) {
        console.log(error)
    }
};

export const getDataAsisFacu = async (config, data) => {

    try {
        const respuesta = await axios.post("http://localhost:3050/api/facultad/listarAsistentesFacultad", data, config);

        console.log(respuesta.data);
        console.log("aquiAsis");

        return respuesta.data
    } catch (error) {
        console.log(error)
    }
};

export const getDataResEsp = async (config, data) => {

    try {
        const respuesta = await axios.post("http://localhost:3050/api/especialidad/listarResponsablesEspecialidad", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)

        return respuesta.data
    } catch (error) {
        console.log(error)
    }
};

export const getDataAsisEsp = async (config, data) => {

    try {
        const respuesta = await axios.post("http://localhost:3050/api/especialidad/listarAsistentesEspecialidad", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)

        return respuesta.data
    } catch (error) {
        console.log(error)
    }
};
