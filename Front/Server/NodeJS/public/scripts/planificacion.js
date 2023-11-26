var pixelWidth = 15;
var velocidad = 1;
var start;
var pedidosEntregados = 0;
var pedidos = 0;
var period = 40;

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
    for (var i = 0; i < 1200 / period; i++) {
      await Promise.all([empezar()]);
    }
  });

async function empezar() {
  //get the place of the cars

  var vehicles = [];
  var orders = [];

  //clean the map
  document.querySelectorAll(".map__cell__vehicle").forEach((vehicle) => {
    vehicles.push(
      new Vehicle(
        vehicle.getAttribute("data-id"),
        parseInt(vehicle.getAttribute("data-x")),
        parseInt(vehicle.getAttribute("data-y"))
      )
    );
    vehicle.classList.remove("map__cell__vehicle");
  });

  document.querySelectorAll(".map__cell__custom").forEach((custom) => {
    orders.push(
      new Order(
        custom.getAttribute("data-id"),
        parseInt(custom.getAttribute("data-x")),
        parseInt(custom.getAttribute("data-y")),
        custom.getAttribute("data-entrega")
      )
    );
    custom.classList.remove("map__cell__custom");
  });

  document.querySelectorAll(".map__cell__depot").forEach((depot) => {
    depot.classList.remove("map__cell__depot");
  });

  document.querySelectorAll(".map__cell__block").forEach((block) => {
    block.classList.remove("map__cell__block");
  });

  let data = {
    vehiculos: vehicles,
    pedidos: orders,
  };

  //get the files
  var formdata = new FormData();
  formdata.append("fFlota", cmFlota.files[0]);
  formdata.append("fPedido", cmPedidos.files[0]);
  formdata.append("fBloqueo", cmBloqueos.files[0]);
  formdata.append("data", JSON.stringify(data));

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
          table.innerHTML +=
            "<tr><td>" +
            element.id +
            "</td><td>" +
            element.x +
            "</td><td>" +
            element.y +
            "</td></tr>";
          seletecCell.classList.add("map__cell__custom");
          if (!seletecCell.getAttribute("data-id")) {
            seletecCell.setAttribute("data-id", 0);
          } else {
            seletecCell.setAttribute(
              "data-id",
              parseInt(seletecCell.getAttribute("data-id")) + 1
            );
          }
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
  // for each clock
  for (const element of result.elementosEnCadaClock) {
    //remove all the vehicles
    var vehicles = document.querySelectorAll(".map__cell__vehicle");
    for (const vehicle of vehicles) {
      vehicle.classList.remove("map__cell__vehicle");
    }

    //add the vehicles
    if (element.clock == period) {
      return;
    }
    for (const nodo of element.nodos) {
      var seletecCell = document.querySelector(
        "#cell_" + nodo.x + "_" + nodo.y
      );
      // remove the custom from the map
      if (seletecCell.classList.contains("map__cell__custom")) {
        if (seletecCell.getAttribute("data-id")) {
          var id = seletecCell.getAttribute("data-id");
          if (id > 0) {
            seletecCell.setAttribute("data-id", id - 1);
          } else {
            seletecCell.classList.remove("map__cell__custom");
          }
        }

        pedidosEntregados++;
        document.querySelector("#txtPedidosEntregados").value =
          pedidosEntregados;
      }
      //replace it with the vehicle
      seletecCell.classList.add("map__cell__vehicle");
    }

    //update the timer
    const end = Date.now();
    document.querySelector("#txtDuracion").value = (end - start) / 1000;
    await new Promise((resolve) => setTimeout(resolve, 1000 / velocidad));
  }
}
