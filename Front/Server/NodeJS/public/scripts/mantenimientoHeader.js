document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
    const modalForm = document.getElementById('modalForm');

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

    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Aquí puedes acceder a los valores de los campos del formulario
        const coordX = document.getElementById('coordX').value;
        const coordY = document.getElementById('coordY').value;
        const horas = document.getElementById('horas').value;
        const cantidadGlp = document.getElementById('cantidadGlp').value;

        // Puedes realizar acciones con los datos ingresados, como enviarlos a un servidor, etc.

        // Cierra el modal después de realizar las acciones necesarias
        modal.style.display = 'none';
    });
});
