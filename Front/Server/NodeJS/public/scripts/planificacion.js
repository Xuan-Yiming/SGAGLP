var pixelWidth = 15;
var velocidad = 1;
var start;
var pedidosEntregados = 0;
var pedidos = 0;
var period = 40;
const totalClocks = 1200;
var clock = 0;

var pedidosPendientes = [];
var vehiclulosEnCamino = [];

class Vehicle {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

class Order {
  constructor(id, x, y, entrega) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.entrega = entrega;
  }
}

//set the date to today
document.getElementById("txtFecha").valueAsDate = new Date();

document.getElementById("selectSpeed").addEventListener("change", function () {
  velocidad = document.getElementById("selectSpeed").value;
});

//create the map
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

// cargar archivos
var btnBloqueos = document.getElementById("btnBloqueos");
var cmBloqueos = document.getElementById("cmBloqueos");
btnBloqueos.addEventListener("click", function () {
  cmBloqueos.click();
});

var btnFlota = document.getElementById("btnFlota");
var cmFlota = document.getElementById("cmFlota");
btnFlota.addEventListener("click", function () {
  cmFlota.click();
});

var btnPedidos = document.getElementById("btnPedidos");
var cmPedidos = document.getElementById("cmPedidos");
btnPedidos.addEventListener("click", function () {
  cmPedidos.click();
});

//empezar
document
  .getElementById("btnEmpezar")
  .addEventListener("click", async function () {
    console.log("planificar");
    start = Date.now();

    //empezar la simulacion
    empezar();
  });

async function empezar() {
  //get the place of the cars

  //clean the map
  document.querySelectorAll('[class*="map__cell__vehicle__"]').forEach((vehicle) => {
    vehicle.classList.remove("map__cell__vehicle");
  });

  document.querySelectorAll(".map__cell__depot").forEach((depot) => {
    depot.classList.remove("map__cell__depot");
  });

  document.querySelectorAll(".map__cell__block").forEach((block) => {
    block.classList.remove("map__cell__block");
  });

  let data = {
    vehiculos: vehiclulosEnCamino,
    pedidos: pedidosPendientes,
  };

  //get the files
  var formdata = new FormData();
  formdata.append("fFlota", cmFlota.files[0]);
  formdata.append("fPedido", cmPedidos.files[0]);
  formdata.append("fBloqueo", cmBloqueos.files[0]);
  formdata.append("data", JSON.stringify(data));

  console.log(JSON.stringify(data));

  fetch(
    "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/solucion.json",
    {
      // method: "POST",
      // body: formdata,
      // redirect: "follow",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      var vehicles = 0;
      //mark the static elements

      //clean the table
      var table = document.getElementById("tblPedidos");
      table.innerHTML = "";

      result.elementosEstaticosTemporales.forEach((element) => {
        var seletecCell = document.querySelector(
          "#cell_" + element.x + "_" + element.y
        );

        //add the title
        if (seletecCell.title == "") {
          seletecCell.title =
            element.id + " - (" + element.x + ";" + element.y + ")";
        } else {
          seletecCell.title =
            seletecCell.title +
            "\n" +
            element.id +
            " - (" +
            element.x +
            ";" +
            element.y +
            ")";
        }

        //add the type of the element
        if (element.tipo == "C") {
          //add the order to the table
          table.innerHTML +=
            "<tr><td>" +
            element.id +
            "</td><td>" +
            element.x +
            "</td><td>" +
            element.y +
            "</td></tr>";

              pedidosPendientes.push(
                new Order(element.id, element.x, element.y, element.hora)
              );
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

async function processElements(result) {
  for (const element of result.elementosEnCadaClock) {
    //remove the dinamic elements
    if (element.clock == period) {
      break;
    }
    clock++;
    //remove all the vehicles
    document
      .querySelectorAll('[class*="map__cell__vehicle__"]')
      .forEach((element) => {
        let classes = element.className.split(" ");
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].startsWith("map__cell__vehicle__")) {
            element.classList.remove(classes[i]);
          }
        }
      });

    //remove all the current custom
    var currentCustom = document.querySelectorAll(".map__cell__custom_current");
    for (const custom of currentCustom) {
      custom.classList.remove("map__cell__custom_current");
    }

    //remove all the routes
    document
      .querySelectorAll('[class*="map__cell__road__"]')
      .forEach((element) => {
        let classes = element.className.split(" ");
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].startsWith("map__cell__road__")) {
            element.classList.remove(classes[i]);
          }
        }
      });

    //add the dinamic elements to the map

    for (const nodo of element.nodos) {
      // get the cell
      var seletecCell = document.querySelector(
        "#cell_" + nodo.x + "_" + nodo.y
      );
      var tipo = nodo.tipo;
      switch (tipo) {
        case "X":
          seletecCell.classList.add("map__cell__custom_current");
          break;
        case "R":
          seletecCell.classList.add(
            "map__cell__road__" + nodo.placa.match(/\d+/)[0]
          );
          break;
        case "E":
          pedidosPendientes = pedidosPendientes.filter(item => item.id !== nodo.idPedido);
        
          pedidosEntregados++;
          document.querySelector("#txtPedidosEntregados").value =
            pedidosEntregados;
        default:
          seletecCell.classList.add(
            "map__cell__vehicle__" + nodo.placa.match(/\d+/)[0]
          );
          seletecCell.setAttribute("data-id", nodo.placa);
          break;
      }
      // set the destination of the vehicle
    }

    //update the timer
    const end = Date.now();
    document.querySelector("#txtDuracion").value = (end - start) / 1000;
    await new Promise((resolve) => setTimeout(resolve, 1000 / velocidad));

    if (clock == totalClocks) {
      break;
    }
  }

  if (clock < totalClocks) {
    empezar();
  }
}
