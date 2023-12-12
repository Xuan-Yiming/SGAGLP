var pixelWidth = 15;
var velocidad = 1;
var start;
var pedidosEntregados = 0;
var pedidos = 0;
var period = 5;
const totalClocks = 300;
var clock = 1;

var pedidosPendientes = [];
var vehiclulosEnCamino = [];


var startDate=new Date();
var finalDate=new Date();
var currentDate =new Date();

class Vehicle {
  constructor(id, x, y,pedido) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.pedido = pedido;
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

document.querySelector("#txtPedidosProgramados").value = 0;

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

document.getElementById('btnPedidos').addEventListener('click', function () {
  var fileInput = document.getElementById('cmPedidos');

  // Trigger the file input click programmatically
  fileInput.click();

  // Event listener for when the file is selected
  fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (file) {
          var reader = new FileReader();

          reader.onload = function (event) {
              var fileContent = event.target.result;
              // console.log(fileContent);

              // You can process the file content here
              // For example, split the content into lines
              var lines = fileContent.split('\n');
              lines.forEach(function (line) {
                  // console.log(line);
                  var parts = line.match(/(\d+)d(\d+)h(\d+)m:(\d+),(\d+),(c-?\d+),(\d+)m3,(\d+)h/);

                  if (parts) {
                      var days = parseInt(parts[1]);
                      var hours = parseInt(parts[2]);
                      var minutes = parseInt(parts[3]);
                      var x = parseInt(parts[4]);
                      var y = parseInt(parts[5]);
                      // var id = parseInt(parts[6]);
                      var id = parts[6]; // Read id as a string
                      var glp = parseInt(parts[7]);
                      var time = parseInt(parts[8]);
              
                      var orderDate = new Date();
                      var orderDate2 = new Date();
                      orderDate.setDate(days);
                      orderDate.setHours(hours);
                      orderDate.setMinutes(minutes);
                      orderDate.setSeconds(0);
                      orderDate.setMilliseconds(0);
                      

                      orderDate2.setDate(days);
                      orderDate2.setHours(hours);
                      orderDate2.setMinutes(minutes);
                      orderDate2.setSeconds(0);
                      orderDate2.setMilliseconds(0);

                      // console.log('Days:', days);
                      // console.log('Hours:', hours);
                      // console.log('Minutes:', minutes);
                      // console.log('Fecha:', orderDate);
                      // console.log('X:', x);
                      // console.log('Y:', y);
                      // console.log('ID:', id);
                      // console.log('GLP:', glp);
                      // console.log('Time:', time);
                      // console.log('------------------');

                      // var currentDate2 = new Date();
                      // var deadline = new Date();
          
                      // var horasASumar = parseInt(document.getElementById('horas').value, 10) || 0;
          
          
                      // Sumar las horas a la fecha actual
                      orderDate2.setHours(orderDate2.getHours() + time);
          
                      console.log(orderDate);
                      console.log(orderDate2);
          
                      // let fechaObjeto = new Date(currentDate2);
                      // let fechaObjeto2 = new Date(deadline);
          
                      var order = new Order2(
                          id,
                          x,
                          y,
                          orderDate,
                          orderDate2,
                          glp
                        );
                      // Convierte el objeto a una cadena JSON y lo guarda en localStorage
                      // localStorage.setItem('formData', JSON.stringify(data));
          
                      document.querySelector("#txtPedidosProgramados").value +=1;
                      var table = document.getElementById("tblPedidos");
                      // table.innerHTML = "";
          
                      table.innerHTML +=
                      "<tr><td>" +
                      id +
                      "</td><td>" +
                      x +
                      "</td><td>" +
                      y +
                      "</td></tr>";
          
                      console.log(order);
          
                      pedidosPendientes.push(order);


                  }






                  // Process each line as needed
              });
          };

          // Read the file as text
          reader.readAsText(file);
      }
  });
});

// cargar archivosressEvent) {
//       // By lines
//       var lines = this.result.split("\n");
//       for (var line = 0; line < lines.length; line++) {
//         var elements = lines[line].split(":");
//         var time = elements[0];
//         var orders = elements[1];
//         for (var order = 0; order < orders.length; order++) {
//           var orderElements = orders[order].split(",");
//           var x = orderElements[0];
//           var y = orderElements



// var btnPedidos = document.getElementById("btnPedidos");
// var cmPedidos = document.getElementById("cmPedidos");
// btnPedidos.addEventListener("click", function () {
//   cmPedidos.click().then((result) => {
//     // get the largest id in pedidosPendientes

//     var largestId = 0;
//     pedidosPendientes.forEach((order) => {
//       if (order.id > largestId) {
//         largestId = order.id;
//       }
//     });

//     // read and load the orders from file .txt
//     // 29d12h01m:20,16,c-42,1m3,14h dayOfMoth d HourOfday h MinuteOfHour m : x, y,
//     // customer, Q m3, deadline h

//     var file = cmPedidos.files[0];
//     var reader = new FileReader(file);
//     reader.onload = function (prog[1];
//           var customer = orderElements[2];
//           var quantity = orderElements[3].substring(
//             0,
//             orderElements[3].length - 2
//           );
//           var deadline = orderElements[0].substring(
//             0,
//             orderElements[0].length - 1
//           );
//           // var order = new Order(
//           //   ++largestId,
//           //   x,
//           //   y,
//           //   deadline,
//           //   quantity,
//           //   customer,
//           //   time
//           // );

//           var order = new Order2(
//             ++largestId,
//             x,
//             y,
//             currentDate,
//             deadline,
//             quantity
//           );

//           pedidosPendientes.push(order);
//         }
//       }
//     };
//   });
// });

//empezar
document
  .getElementById("btnEmpezar")
  .addEventListener("click", async function () {
    console.log("planificar");
    start = Date.now();

    //empezar la simulacion
    console.log(startDate);
    // startDate = document.getElementById("txtFecha").valueAsDate;
    var startDateInput = document.getElementById("txtFecha").valueAsDate;

    var startDateValue = startDateInput.value;
    var startDate = new Date(startDateValue);

    console.log(startDateValue);
    console.log(startDate);
    // startDate = Date.now();
    // finalDate = new Date(startDate.getTime() + 8400*72 * 1000);
    // ordenInicial2 =   new Order2("P2",2,3,startDate,finalDate,10);
    // pedidosPendientes.push(ordenInicial2);
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
  
  // finalDate = new Date(startDate.getTime() + 8400*72 * 1000);
  // ordenInicial2 =   new Order2("P2",2,3,startDate,finalDate,10);
  // pedidosPendientes.push(ordenInicial2);
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

  var currentDate = new Date(startDate.getTime() + passedTime * 1000 -period*1000*72);

  var currentDate2 = new Date(startDate.getTime() + (passedTime) * 1000 );


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

var requestData = {
  dateInicio: currentDate,
  dateFin: currentDate2,
  data: data,
  modo: "P",
  clock : period
};


var formdata = new FormData();
formdata.append("dateInicio",  formattedDate);
formdata.append("dateFin",  formattedDate2);
// JSON.stringify(data)
formdata.append("data",JSON.stringify(data) ); // Convertir el objeto data a JSON
formdata.append("modo", "P");
formdata.append("clock", period);
console.log(formattedDate);
console.log(formattedDate2 );
console.log(JSON.stringify(data) );


  fetch(
    // "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datasç/solucion.json",S
    // "http://localhost:8080/DP15E/api/v1/node/algoritmoSimulacionOficial",
    "http://localhost:8080/DP15E/api/v1/node/algoritmoSimulacion",
    // "http://inf226-981-5e.inf.pucp.edu.pe/DP15E/api/v1/node/algoritmoSimulacion",
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
      console.log(result);
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

            
            var dateTimeWithSeconds = element.hora + ":00";

            // let fecha = new Date(element.hora.replace(' ', 'T') + ':00Z');
            // fecha.setHours(fecha.getHours() + 5);
            // let nuevaHora = fecha.toISOString().slice(0, 16).replace('T', ' ');


            var dateObject = new Date(dateTimeWithSeconds);
            // var dateObject = new Date(nuevaHora);
          pedidosPendientes.push(
            // new Order(
            //   element.id,
            //   element.x,
            //   element.y,
            //   element.hora,
            //   element.cantidad
            // )

            new Order2(
              element.id,
              element.x,
              element.y,
              currentDate,
              dateObject,
              element.cantidad
            )
          );
          pedidos++;
        } else if (element.tipo == "D") {
          seletecCell.classList.add("map__cell__depot");
        } else if (element.tipo == "B") {
          seletecCell.classList.add("map__cell__block");
        } else if (element.tipo == "V") {
          // vehiclulosEnCamino.push(
          //   new Vehicle(element.id, element.x, element.y)
          // );
          // result.elementosEnCadaClock[39].forEach((element) => {
          //   console.log(element.nodos);

          // })

          // console.log(result.elementosEnCadaClock[39].nodos);
          var flag = 1;

          for (const nodo of result.elementosEnCadaClock[period-1].nodos) {
            console.log(result.elementosEnCadaClock[period-1].nodos.length);
            
            if(nodo.placa == element.id){
              if (nodo.tipo === "X" ){
                vehiclulosEnCamino.push(
                  new Vehicle(element.id, element.x, element.y,nodo.idPedido)
                );
                flag =0;
                break;
              }
            }
          }
          if(flag == 1){
            vehiclulosEnCamino.push(
              new Vehicle(element.id, element.x, element.y,"")
            );
          }
        }
      });

      // document.querySelector("#txtPedidosProgramados").value = pedidos;

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
    await new Promise((resolve) => setTimeout(resolve, 5000 / velocidad));

    if (clock == totalClocks) {
      alert('Se termino la  operacion dia a dia');
      break;
    }
  }

  if (clock < totalClocks) {
    empezar();
  }
}


///////////////////// ESTO ES MODAL
var pedidosIngresados = [];

// class Order2 {
//     constructor(id, x, y, start,end, glp) {
//       this.id = id;
//       this.x = x;
//       this.y = y;
//       this.start = start;
//       this.end = end;
//       this.glp = glp;
//     }
//   }
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
    const modalForm = document.getElementById('modalForm');
    const submitBtn = document.getElementById('submitBtn');

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    submitBtn.addEventListener('click', function() {
        const coordX = document.getElementById('coordX').value;
        const coordY = document.getElementById('coordY').value;
        const horas = document.getElementById('horas').value;
        const cantidadGlp = document.getElementById('cantidadGlp').value;
        const idpedido = document.getElementById('idpedido').value;


        pedidosIngresados = JSON.parse(localStorage.getItem('pedidos')) || [];
        // Verifica si los campos no están vacíos
        if (coordX && coordY && horas && cantidadGlp && idpedido) {
            // Guarda los datos en localStorage
            // var data = {
            //     coordX: parseInt(coordX),
            //     coordY: parseInt(coordY),
            //     horas: parseInt(horas),
            //     cantidadGlp: parseInt(cantidadGlp)
            // };

            
            // var deadline = 

            var currentDate2 = new Date();
            var deadline = new Date();

            var horasASumar = parseInt(document.getElementById('horas').value, 10) || 0;


            // Sumar las horas a la fecha actual
            deadline.setHours(deadline.getHours() + horasASumar-5);

            currentDate2.setHours(currentDate2.getHours()-5);

            console.log(currentDate2);
            console.log(deadline);

            let fechaObjeto = new Date(currentDate2);
            let fechaObjeto2 = new Date(deadline);

            var order = new Order2(
                idpedido,
                coordX,
                coordY,
                fechaObjeto,
                fechaObjeto2,
                cantidadGlp
              );
            // Convierte el objeto a una cadena JSON y lo guarda en localStorage
            // localStorage.setItem('formData', JSON.stringify(data));

            document.querySelector("#txtPedidosProgramados").value +=1;
            var table = document.getElementById("tblPedidos");
            // table.innerHTML = "";

            table.innerHTML +=
            "<tr><td>" +
            idpedido +
            "</td><td>" +
            coordX +
            "</td><td>" +
            coordY +
            "</td></tr>";

            console.log(order);

            pedidosPendientes.push(order);
            pedidosIngresados.push(order);
            localStorage.setItem('pedidos', JSON.stringify(pedidosIngresados));

            console.log(pedidosPendientes);
            // Cierra el modal
            modal.style.display = 'none';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Recupera los datos del localStorage cuando la página se carga
    document.addEventListener('DOMContentLoaded', function() {
        const storedData = localStorage.getItem('formData');

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            document.getElementById('coordX').value = parsedData.coordX;
            document.getElementById('coordY').value = parsedData.coordY;
            document.getElementById('horas').value = parsedData.horas;
            document.getElementById('cantidadGlp').value = parsedData.cantidadGlp;
        }
    });
});


document.getElementById('btnBorrarLocal').addEventListener('click', function() {
    // Limpiar el almacenamiento local
    localStorage.clear();
    // alert('Almacenamiento local limpiado');
});