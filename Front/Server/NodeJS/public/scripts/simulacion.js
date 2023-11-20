console.log("Simulacion");
var pixelWidth = 10;

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
            vehicle.classList.add("map__cell__road");
        }
        for (const nodo of element.nodos) {
            var seletecCell = document.querySelector(
                "#cell_" + nodo.x + "_" + nodo.y
            );
            seletecCell.classList.remove("map__cell__road");
            seletecCell.classList.add("map__cell__vehicle");
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

document.getElementById("btnSimular").addEventListener("click", function () {
    console.log("Simular");
    fetch(
        "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Back/datas/solucion.json"
    )
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            result.elementosEstaticosTemporales.forEach((element) => {
                var seletecCell = document.querySelector(
                    "#cell_" + element.x + "_" + element.y
                );
                seletecCell.title = element.id + " - " + element.x + ";" + element.y;

                if (element.tipo == "C") {
                    seletecCell.classList.add("map__cell__custom");
                } else if (element.tipo == "D") {
                    seletecCell.classList.add("map__cell__depot");
                } else if (element.tipo == "B") {
                    seletecCell.classList.add("map__cell__block");
                }
            });

            processElements(result);
        });
});


var btnBloqueos = document.getElementById('btnBloqueos');
var cmBloqueos = document.getElementById('cmBloqueos');
btnBloqueos.addEventListener('click', function() {
    // Trigger a click event on the file input element
    cmBloqueos.click();
});
cmBloqueos.addEventListener('change', function() {
    // Handle the selected file(s) here, for example, log the file name
    console.log('Selected file:', cmBloqueos.files[0].name);
});

var btnFlota = document.getElementById('btnFlota');
var cmFlota = document.getElementById('cmFlota');
btnFlota.addEventListener('click', function() {
    // Trigger a click event on the file input element
    cmFlota.click();
});
cmFlota.addEventListener('change', function() {
    // Handle the selected file(s) here, for example, log the file name
    console.log('Selected file:', cmFlota.files[0].name);
});


var btnPedidos = document.getElementById('btnPedidos');
var cmPedidos = document.getElementById('cmPedidos');
btnPedidos.addEventListener('click', function() {
    // Trigger a click event on the file input element
    cmPedidos.click();
});
cmPedidos.addEventListener('change', function() {
    // Handle the selected file(s) here, for example, log the file name
    console.log('Selected file:', cmPedidos.files[0].name);
});


document.getElementById('btnCarga').addEventListener('click', function () {
    // Trigger click on the hidden file input element
    // document.getElementById('cmCarga').click();

    fetch('http://localhost:8080/DP15E/api/v1/vehicle/cargaMasivaDeFlotas', {
        method: 'POST',
        body: cmFlota,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Files uploaded successfully:', data);
        // Handle the API response as needed
    })
    .catch(error => {
        console.error('Error uploading files:', error);
        // Handle errors
    });
});

document.getElementById('cmCarga').addEventListener('change', function () {
        // Make a POST request to the API endpoint


});