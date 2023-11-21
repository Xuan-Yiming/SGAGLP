

getPedidos();

document
  .getElementById("txtBuscar")
  .addEventListener("keyup", async function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      await getPedidos();
    }
  });

document
  .getElementById("btnPageBac")
    .addEventListener("click", async function (event) {
        var page = parseInt(document.getElementById("txtPage").value);
        if (page == 1) {
            return;
        }
        document.getElementById("txtPage").value = page - 1;
  });

document
  .getElementById("btnPageFor")
.addEventListener("click", async function (event) {
        var page = parseInt(document.getElementById("txtPage").value);
        document.getElementById("txtPage").value = page + 1;
});

async function getPedidos() {
  let busqueda = document.getElementById("txtBuscar").value;
  let pagina = document.getElementById("txtPage").value;

  fetch(
    "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/pedidos.json",
    {
      // method: "POST",
      // body: JSON.stringify({
      //   busqueda: busqueda,
      //   pagina: pagina,
      // }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }
  )
    .then((res) => res.json())
      .then((result) => {
        console.log(result);
      //create the table header wit the keys of the first element
      let table = document.getElementById("table-content");
      table.innerHTML = "";
      let row = table.insertRow();
      Object.keys(result[0]).forEach((key) => {
        let cell = row.insertCell();
        cell.innerHTML = key;
      });
      //create the table body
      result.forEach((element) => {
        let row = table.insertRow();
        Object.values(element).forEach((value) => {
          let cell = row.insertCell();
          cell.innerHTML = value;
        });
      });
    })
    .catch((error) => console.error("Error:", error));
}
