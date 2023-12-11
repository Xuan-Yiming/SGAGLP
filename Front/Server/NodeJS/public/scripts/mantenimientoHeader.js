var pedidosIngresados = [];

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

            var currentDate = new Date();
            var deadline = new Date();
            var horasASumar = parseInt(document.getElementById('horas').value, 10) || 0;

            // Sumar las horas a la fecha actual
            deadline.setHours(deadline.getHours() + horasASumar);

            var order = new Order2(
                idpedido,
                coordX,
                coordY,
                currentDate,
                deadline,
                horas
              );
            // Convierte el objeto a una cadena JSON y lo guarda en localStorage
            // localStorage.setItem('formData', JSON.stringify(data));


            pedidosIngresados.push(order);
            localStorage.setItem('pedidos', JSON.stringify(pedidosIngresados));
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