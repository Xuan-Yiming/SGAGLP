import axios from 'axios';

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
        Header: "Nombre",
        accessor: "nombreCompleto",
        width: "15%"
    },
    {
        Header: "Correo",
        accessor: "correo",
        width: "30%"
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

export const getData = async (config, data) => {


    try {
        const respuesta = await axios.post("http://localhost:3050/api/especialidad/listarUsuariosNoDeEspecialidad", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)

        return respuesta.data
    } catch (error) {
        console.log(error)
    }

};
