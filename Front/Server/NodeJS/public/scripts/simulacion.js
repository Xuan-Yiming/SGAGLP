console.log("Simulacion");

var pixelWidth = 15;
var velocidad = 1;
var start;
var pedidosEntregados = 0;
var pedidos = 0;

//set the date to today
document.getElementById("txtFecha").valueAsDate = new Date();
//set the fecha final to today + y days
var fechaFinal = new Date();
fechaFinal.setDate(fechaFinal.getDate() + 7);
document.getElementById("txtFechaFinal").valueAsDate = fechaFinal;

document.getElementById("selectSpeed").addEventListener("change", function () {
  velocidad = document.getElementById("selectSpeed").value;
});

for (var w = 0; w < 70; w++) {
  for (var h = 0; h < 50; h++) {
    var div = document.createElement("div");
    div.id = "cell_" + w + "_" + h;
    div.title = w + ";" + h;
    div.classList.add("map__cell");
    div.style.left = w * pixelWidth + "px";
    div.style.top = h * pixelWidth + "px";
    document.querySelector("#map").appendChild(div);
  }
}

async function processElements(result) {
  for (const element of result.elementosEnCadaClock) {
    //replace all vehicles with road
    var vehicles = document.querySelectorAll(".map__cell__vehicle");
    for (const vehicle of vehicles) {
      vehicle.classList.remove("map__cell__vehicle");
    }
    for (const nodo of element.nodos) {
      var seletecCell = document.querySelector(
        "#cell_" + nodo.x + "_" + nodo.y
      );
      if (seletecCell.classList.contains("map__cell__custom")) {
        seletecCell.classList.remove("map__cell__custom");
        pedidosEntregados++;
        document.querySelector("#txtPedidosEntregados").value =
          pedidosEntregados;
      }
      seletecCell.classList.add("map__cell__vehicle");
    }
    const end = Date.now();
    document.querySelector("#txtDuracion").value = (end - start) / 1000;
    await new Promise((resolve) => setTimeout(resolve, 1000 / velocidad));

  }
}

document.getElementById("btnSimular").addEventListener("click", async function () {
  console.log("Simular");
  start = Date.now();
  
  
  var fecha = new Date(document.getElementById("txtFecha").value);
  var formattedFecha = fecha.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

  var fechaFinal = new Date(document.getElementById("txtFechaFinal").value);
  var formattedFechaFinal = fechaFinal.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

  //for each day between the two dates
  while (fecha <= fechaFinal) {
    var formdata = new FormData();
    formdata.append("date", formattedFecha);
    await simular(formdata);
    fecha.setDate(fecha.getDate() + 1);
    formattedFecha = fecha.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  }

  var formdata = new FormData();
  formdata.append("date", formattedFecha);


});

async function simular(formdata) {
  //clean the map
  document.querySelectorAll(".map__cell__vehicle").forEach((vehicle) => {
    vehicle.classList.remove("map__cell__vehicle");
  });

  document.querySelectorAll(".map__cell__custom").forEach((custom) => {
    custom.classList.remove("map__cell__custom");
  });

  document.querySelectorAll(".map__cell__depot").forEach((depot) => {
    depot.classList.remove("map__cell__depot");
  });

  document.querySelectorAll(".map__cell__block").forEach((block) => {
    block.classList.remove("map__cell__block");
  });



  fetch(
    "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/solucion.json",
    //"http://localhost:8080/DP15E/api/v1/node/algoritmoSimulacion/date="+formattedFecha,
    // {
    //   method: "POST",
    //   body: formdata,
    //   redirect: "follow",
    // }
  )
    .then((response) => response.json())
    .then((result) => {

      var vehicles = 0;
      result.elementosEstaticosTemporales.forEach((element) => {
        var seletecCell = document.querySelector(
          "#cell_" + element.x + "_" + element.y
        );
        seletecCell.title = element.id + " - " + element.x + ";" + element.y;

        if (element.tipo == "C") {
          seletecCell.classList.add("map__cell__custom");
          pedidos++;
        } else if (element.tipo == "D") {
          seletecCell.classList.add("map__cell__depot");
        } else if (element.tipo == "B") {
          seletecCell.classList.add("map__cell__block");
        }
      });
      document.querySelector("#txtPedidosProgramados").value = pedidos;

      vehicles = result.elementosEnCadaClock[0].nodos.length;
      document.querySelector("#txtCantidadVehiculos").value = vehicles;

      processElements(result);
    });
}

// cargar archivos
var btnBloqueos = document.getElementById("btnBloqueos");
var cmBloqueos = document.getElementById("cmBloqueos");
btnBloqueos.addEventListener("click", function () {
  // Trigger a click event on the file input element
  cmBloqueos.click();
});
cmBloqueos.addEventListener("change", function () {
  // Handle the selected file(s) here, for example, log the file name
  console.log("Selected file:", cmBloqueos.files[0].name);
});

var btnFlota = document.getElementById("btnFlota");
var cmFlota = document.getElementById("cmFlota");
btnFlota.addEventListener("click", function () {
  // Trigger a click event on the file input element
  cmFlota.click();
});
cmFlota.addEventListener("change", function () {
  // Handle the selected file(s) here, for example, log the file name
  console.log("Selected file:", cmFlota.files[0].name);
});

var btnPedidos = document.getElementById("btnPedidos");
var cmPedidos = document.getElementById("cmPedidos");
btnPedidos.addEventListener("click", function () {
  // Trigger a click event on the file input element
  cmPedidos.click();
});
cmPedidos.addEventListener("change", function () {
  // Handle the selected file(s) here, for example, log the file name
  console.log("Selected file:", cmPedidos.files[0].name);
});

document.getElementById("btnCarga").addEventListener("click", function () {
  // do the three uploads simultaneously
  Promise.all([cargarVehiculos(), cargarPedidos(), cargarBloqueos()])
    .then(() => {
      //show a alert when all uploads are done

      alert("Carga masiva realizada con exito");

      console.log("All uploads completed successfully");
    })
    .catch((error) => {
      console.log("Error occurred during uploads:", error);
    });
});

async function cargarVehiculos() {
  var formdata = new FormData();
  formdata.append("file", cmFlota.files[0]);

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
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function cargarPedidos() {
  var formdata1 = new FormData();
  formdata1.append("file", cmPedidos.files[0]);

  var requestOptions = {
    method: "POST",
    body: formdata1,
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/DP15E/api/v1/node/cargaMasivaDePedidos",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function cargarBloqueos() {
  var formdata2 = new FormData();
  formdata2.append("file", cmBloqueos.files[0]);

  var requestOptions = {
    method: "POST",
    body: formdata2,
    redirect: "follow",
  };

  fetch(
    "http://localhost:8080/DP15E/api/v1/node/cargaMasivaDeBloqueos",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
