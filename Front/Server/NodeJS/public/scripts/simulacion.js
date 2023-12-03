var pixelWidth = 15;
var velocidad = 1;
var start;
var pedidosEntregados = 0;
var pedidos = 0;
var period = 40;
const totalClocks = 1200;
var clock = 1;

var pedidosPendientes = [];
var vehiclulosEnCamino = [];

var startDate=new Date();
var finalDate=new Date();
var currentDate =new Date();

class Vehicle {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

class Order {
  constructor(id, x, y, entrega, glp) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.entrega = entrega;
    this.glp = glp;
  }
}

class Order2 {
  constructor(id, x, y, start,end, glp) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.start = start;
    this.end = end;
    this.glp = glp;
  }
}


// ordenInicial =   new Order(1,2,3,10,10);

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

var btnPedidos = document.getElementById("btnPedidos");
var cmPedidos = document.getElementById("cmPedidos");
btnPedidos.addEventListener("click", function () {
  cmPedidos.click().then((result) => {
    // get the largest id in pedidosPendientes

    var largestId = 0;
    pedidosPendientes.forEach((order) => {
      if (order.id > largestId) {
        largestId = order.id;
      }
    });

    // read and load the orders from file .txt
    // 29d12h01m:20,16,c-42,1m3,14h dayOfMoth d HourOfday h MinuteOfHour m : x, y,
    // customer, Q m3, deadline h

    var file = cmPedidos.files[0];
    var reader = new FileReader(file);
    reader.onload = function (progressEvent) {
      // By lines
      var lines = this.result.split("\n");
      for (var line = 0; line < lines.length; line++) {
        var elements = lines[line].split(":");
        var time = elements[0];
        var orders = elements[1];
        for (var order = 0; order < orders.length; order++) {
          var orderElements = orders[order].split(",");
          var x = orderElements[0];
          var y = orderElements[1];
          var customer = orderElements[2];
          var quantity = orderElements[3].substring(
            0,
            orderElements[3].length - 2
          );
          var deadline = orderElements[0].substring(
            0,
            orderElements[0].length - 1
          );
          // var order = new Order(
          //   ++largestId,
          //   x,
          //   y,
          //   deadline,
          //   quantity,
          //   customer,
          //   time
          // );

          var order = new Order2(
            ++largestId,
            x,
            y,
            currentDate,
            deadline,
            quantity
          );

          pedidosPendientes.push(order);
        }
      }
    };
  });
});

//empezar
document
  .getElementById("btnSimular")
  .addEventListener("click", async function () {
    console.log("planificar");
    start = Date.now();

    //empezar la simulacion
    this.startDate = document.getElementById("txtFecha").valueAsDate;
    empezar();
  });


  function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC' // Adjust the timeZone according to your needs
    }).format(date);

    return formattedDate;
}


function myFunction() {
  
  finalDate = new Date(startDate.getTime() + 8400*72 * 1000);
  ordenInicial2 =   new Order2("P2",2,3,startDate,finalDate,10);
  pedidosPendientes.push(ordenInicial2);
}

// Attach the function to the window.onload event using addEventListener
window.addEventListener('load', myFunction);



async function empezar() {
  //get the place of the cars

  //clean the map
  document
    .querySelectorAll('[class*="map__cell__vehicle__"]')
    .forEach((vehicle) => {
      vehicle.classList.remove("map__cell__vehicle");
    });

  document.querySelectorAll(".map__cell__depot").forEach((depot) => {
    depot.classList.remove("map__cell__depot");
  });

  document.querySelectorAll(".map__cell__block").forEach((block) => {
    block.classList.remove("map__cell__block");
  });



  var passedTime = clock * 72; // 72 seconds per clock

  var currentDate = new Date(startDate.getTime() + passedTime * 1000+ 1000*3600*12);

  var currentDate2 = new Date(startDate.getTime() + (clock*72*2) * 1000 + 1000*3600*12);


  let data = {
    vehiculos: vehiclulosEnCamino,
    pedidos: pedidosPendientes,
  };
  //get the files


    // //for each day between the two dates
    // while (fecha <= fechaFinal) {

    // }
    // var formdata = new FormData();
    // formdata.append("date", formattedFecha);
    // await simular(formdata);
    // fecha.setDate(fecha.getDate() + 1);
    formattedFecha = currentDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  
    // var formdata = new FormData();
    // formdata.append("date", formattedFecha);

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Agregar cero inicial si es necesario
    var day = ('0' + currentDate.getDate()).slice(-2); // Agregar cero inicial si es necesario
    var hours = ('0' + currentDate.getHours()).slice(-2); // Agregar cero inicial si es necesario
    var minutes = ('0' + currentDate.getMinutes()).slice(-2); // Agregar cero inicial si es necesario
    var seconds = ('0' + currentDate.getSeconds()).slice(-2); // Agregar cero inicial si es necesario

    // Formatear la fecha al formato deseado "yyyy-MM-dd HH:mm:ss"
    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    var year2 = currentDate2.getFullYear();
    var month2 = ('0' + (currentDate2.getMonth() + 1)).slice(-2); // Agregar cero inicial si es necesario
    var day2 = ('0' + currentDate2.getDate()).slice(-2); // Agregar cero inicial si es necesario
    var hours2 = ('0' + currentDate2.getHours()).slice(-2); // Agregar cero inicial si es necesario
    var minutes2 = ('0' + currentDate2.getMinutes()).slice(-2); // Agregar cero inicial si es necesario
    var seconds2 = ('0' + currentDate2.getSeconds()).slice(-2); // Agregar cero inicial si es necesario

    // Formatear la fecha al formato deseado "yyyy-MM-dd HH:mm:ss"
    var formattedDate2 = year2 + '-' + month2 + '-' + day2 + ' ' + hours2 + ':' + minutes2 + ':' + seconds2;

    
//     console.log(formattedDate);
//     console.log(formattedDate2);
//   var formdata = new FormData();  
// formdata.append("dateInicio", formattedDate);
// formdata.append("dateFin", formattedDate2);
// formdata.append("data", data);
// formdata.append("modo", "S");

// var requestData = {
//   dateInicio: startDate.valueAsDate,
//   dateFin: currentDate.valueAsDate,
//   data: data,
//   modo: "S"
// };


var formdata = new FormData();
formdata.append("dateInicio",  formattedDate);
formdata.append("dateFin",  formattedDate2);
// JSON.stringify(data)
formdata.append("data",JSON.stringify(data) ); // Convertir el objeto data a JSON
formdata.append("modo", "P");
console.log(startDate);
console.log(currentDate );


  fetch(
    // "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datasç/solucion.json",S
    // "http://localhost:8080/DP15E/api/v1/node/algoritmoSimulacionOficial",
    "http://localhost:8080/DP15E/api/v1/node/algoritmoSimulacion",
    {
      method: "POST",
      body: formdata,
      redirect: "follow",
      // headers: {
      //   "Content-Type": "application/json" // Indicar que el contenido es JSON
      // },
      // body: JSON.stringify(requestData) // Convertir el objeto a JSON
      }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(`Lo que llega del back es: ${result}`);
      var vehicles = 0;
      pedidosPendientes = [];
      vehiclulosEnCamino = [];
      //mark the static elements

      //clean the table
      var table = document.getElementById("tblPedidos");
      table.innerHTML = "";
      // if (result.elementosEstaticosTemporales && typeof result.elementosEstaticosTemporales === 'object') {
      //   for (var key in result.elementosEstaticosTemporales) {
      //     console.log("Hay algo  raro aqui");
      //   }
      // } else {
      //   // Handle the case when elementosEstaticosTemporales is not an object
      //   console.error("result.elementosEstaticosTemporales is either undefined or not an object");
      // }


      result.elementosEstaticosTemporales.forEach((element) => {
        var seletecCell = document.querySelector(
          "#cell_" + element.x + "_" + element.y
        );
        console.log("Hay algo  raro aqui");

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
            new Order(
              element.id,
              element.x,
              element.y,
              element.hora,
              element.cantidad
            )
          );
          pedidos++;
        } else if (element.tipo == "D") {
          seletecCell.classList.add("map__cell__depot");
        } else if (element.tipo == "B") {
          seletecCell.classList.add("map__cell__block");
        } else if (element.tipo == "V") {
          vehiclulosEnCamino.push(
            new Vehicle(element.id, element.x, element.y)
          );
        }
      });

      document.querySelector("#txtPedidosProgramados").value = pedidos;

      vehicles = vehiclulosEnCamino.length;
      document.querySelector("#txtCantidadVehiculos").value = vehicles;

      processElements(result);
    }).catch(error => console.error(`HORROR:   ${error}`));
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
          pedidosPendientes = pedidosPendientes.filter(
            (item) => item.id !== nodo.idPedido
          );

          pedidosEntregados++;
          document.querySelector("#txtPedidosEntregados").value =
            pedidosEntregados;
        default:
          seletecCell.classList.add(
            "map__cell__vehicle__" + nodo.placa.match(/\d+/)[0]
          );

          //update the vehicle in the array vehiclulosEnCamino

          var vehicleToUpdate = vehiclulosEnCamino.find(
            (vehicle) => vehicle.id === nodo.placa
          );
          if (vehicleToUpdate) {
            vehicleToUpdate.x = nodo.x;
            vehicleToUpdate.y = nodo.y;
          }

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
