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
