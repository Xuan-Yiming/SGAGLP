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


//simular
document.getElementById("btnSimular").addEventListener("click", async function () {
  console.log("Simular");
  start = Date.now();


  //empezar la simulacion
  await simular();

});

async function simular() {
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
  var formdata = new FormData();
  formdata.append("fFlota", cmFlota.files[0]);
  formdata.append("fPedido", cmPedidos.files[0]);
  formdata.append("fBloqueo", cmBloqueos.files[0]);

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
          //add the element to the table
          table.innerHTML +=
            "<tr><td>" +
            element.id +
            "</td><td>" +
            element.x +
            "</td><td>" +
            element.y +
            "</td></tr>";
          
          //add the custom to the map
          seletecCell.classList.add("map__cell__custom");
          if (!seletecCell.getAttribute("data-n")) {
            seletecCell.setAttribute("data-n", 0);
            seletecCell.setAttribute("data-id", element.id);
          } else {
            seletecCell.setAttribute(
              "data-n",
              parseInt(seletecCell.getAttribute("data-n")) + 1
            );

            seletecCell.setAttribute(
              "data-id",
              seletecCell.getAttribute("data-id") + "," + element.id
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
    //remove the dinamic elements

    //remove all the vehicles
    var vehicles = document.querySelectorAll(".map__cell__vehicle");
    for (const vehicle of vehicles) {
      vehicle.classList.remove("map__cell__vehicle");
    }

    //remove all the current custom
    var currentCustom = document.querySelectorAll(".map__cell__custom_current");
    for (const custom of currentCustom) {
      custom.classList.remove("map__cell__custom_current");
    }

    //remove all the routes
    var routes = document.querySelectorAll(".map__cell__road");
    for (const route of routes) {
      route.classList.remove("map__cell__road");
    }

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
          seletecCell.classList.add("map__cell__road");
          break;
        default:
          seletecCell.classList.add("map__cell__vehicle");
          break;
      }
      // set the destination of the vehicle
    }

    //update the timer
    const end = Date.now();
    document.querySelector("#txtDuracion").value = (end - start) / 1000;
    await new Promise((resolve) => setTimeout(resolve, 1000 / velocidad));
  }
}

