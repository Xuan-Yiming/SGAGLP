

document.onload = function () {
    
}

document.getElementById("txtBuscar").addEventListener("keyup", async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        await getPedidos();
    }
});

document.getElementById("btnPageBack").addEventListener("click", async function (event) {
    document.getElementById("txtBuscar").value = document.getElementById("txtBuscar").value - 1;
});

document.getElementById("btnPageFor").addEventListener("click", async function (event) {
    document.getElementById("txtBuscar").value = document.getElementById("txtBuscar").value + 1;
});


async function getPedidos() {
    let busqueda = document.getElementById("txtBuscar").value;
    let pagina = document.getElementById("txtPage").value;

    fetch('/public/', {
        method: 'POST',
        body: JSON.stringify({
            busqueda: busqueda,
            pagina: pagina
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((result) => {
            //create the table header wit the keys of the first element
            let table = document.getElementById("table-content");
        })
    .catch(error => console.error('Error:', error))
}