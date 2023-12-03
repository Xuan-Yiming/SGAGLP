getFlotas();

document
  .getElementById("txtBuscar")
  .addEventListener("keyup", async function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      await getFlotas();
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
    var totalPage = parseInt(document.getElementById("txtTotalPage").innerHTML);
    if (page == totalPage) {
      return;
    }
    document.getElementById("txtPage").value = page + 1;
  });

document
  .getElementById("txtPage")
  .addEventListener("change", async function (event) {
    var totalPage = parseInt(document.getElementById("txtTotalPage").innerHTML);
    var page = parseInt(document.getElementById("txtPage").value);
    if (page < 1) {
      document.getElementById("txtPage").value = 1;
    }
    if (page > totalPage) {
      document.getElementById("txtPage").value = totalPage;
    }
    await getFlotas();
  });

async function getFlotas() {
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
      document.getElementById("txtTotalPage").innerHTML = result.totalPage;
      table.innerHTML = "";
      let row = table.insertRow();
      Object.keys(result.results[0]).forEach((key) => {
        let cell = row.insertCell();
        cell.innerHTML = key;
      });
      //create the table body
      result.results.forEach((element) => {
        let row = table.insertRow();
        Object.values(element).forEach((value) => {
          let cell = row.insertCell();
          cell.innerHTML = value;
        });
      });
    })
    .catch((error) => console.error("Error:", error));
}

document
  .querySelector("#btnCargaMasiva")
  .addEventListener("click", function () {
    document.querySelector("#loadFile").click();

    var formdata = new FormData();
    formdata.append("file", document.querySelector("#loadFile").files[0]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/DP15E/api/v1/vehicle/cargaMasivaDeFlotas",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        getFlotas();
      })
      .catch((error) => console.log("error", error));
  });