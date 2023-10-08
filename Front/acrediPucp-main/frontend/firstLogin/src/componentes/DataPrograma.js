import axios from 'axios';

export const columns = [
    {
        Header: "Selección",
        accessor: "seleccion",
        width: "13%"
    },
    {
        Header: "Código",
        accessor: "codigo",
        width: "10%"
    },
    {
        Header: "Periodo Inicio",
        accessor: "cicloinicio",
        width: "13%"
    },
    {
        Header: "Periodo Fin",
        accessor: "ciclofin",
        width: "13%"
    },
    {
        Header: "Creado por",
        accessor: "creadopor",
        width: "18%"
    },
    {
        Header: "Fecha de creación",
        accessor: "fechacreacion",
        width: "15%"
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
})
);

export const getData = async (config, data) => {
    try {
        const respuesta = await axios.post("http://localhost:3050/api/medicion/listarMedicionEspecialidad", data, config);

        console.log(respuesta.data);
        console.log("aqui");
        console.log("data es" + respuesta)

        return respuesta.data
    } catch (error) {
        console.log(error)
    }

    //   const response = await fetch(
    //   `https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=15`
    //   );
    //   const data = await response.json()
    //   console.log(data);
    //   return data
    //   fetch(
    //   `https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=10`
    //   ).then((res) => res.json().then((data) => console.log(data)));
};
