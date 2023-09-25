import axios from 'axios';

export const columns = [
    {
        Header: "Selección",
        accessor: "seleccion",
        width: "12%"
    },
    {
        Header: "Código",
        accessor: "codigo",
        width: "14%"
    },
    {
        Header: "Nombre",
        accessor: "nombre",
        width: "30%"
    },
    {
        Header: "Responsable(s)",
        accessor: "responsables",
        width: "28%"
    },
    {
        Header: "Estado",
        accessor: "estado",
        width: "14%"
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
        console.log("data esasdasd")
        console.log(JSON.stringify(data))

        const respuesta = await axios.post("http://localhost:3050/api/especialidad/listarEspecialidad", data, config);

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
