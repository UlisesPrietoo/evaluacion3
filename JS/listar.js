document.addEventListener("DOMContentLoaded", function () {
  let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  let tabla = document.getElementById("tablaEmpleados");
  let mensaje = document.getElementById("mensajeListado");

  if (empleados.length === 0) {
    mensaje.textContent = "No hay empleados registrados en el sistema.";
    mensaje.style.color = "red";
    return;
  }

  mensaje.textContent = "Empleados registrados actualmente:";
  mensaje.style.color = "green";

  empleados.forEach(emp => {
    let fila = document.createElement("tr");

    let celdaRut = document.createElement("td");
    celdaRut.textContent = emp.rut;
    fila.appendChild(celdaRut);

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = emp.nombre;
    fila.appendChild(celdaNombre);

    let celdaApellido = document.createElement("td");
    celdaApellido.textContent = emp.apellido;
    fila.appendChild(celdaApellido);

    let celdaSueldo = document.createElement("td");
    celdaSueldo.textContent = "$" + emp.sueldo.toLocaleString("es-CL");
    fila.appendChild(celdaSueldo);

    tabla.appendChild(fila);
  });
});
