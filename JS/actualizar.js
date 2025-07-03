document.getElementById("formActualizar").addEventListener("submit", function (e) {
  e.preventDefault();

  let rut = document.getElementById("rutActualizar").value.trim();
  let nuevoNombre = document.getElementById("nuevoNombre").value.trim();
  let nuevoApellido = document.getElementById("nuevoApellido").value.trim();
  let nuevoSueldo = document.getElementById("nuevoSueldo").value.trim();
  let mensaje = document.getElementById("mensajeActualizar");

  mensaje.textContent = "";
  mensaje.style.color = "red";

  if (rut === "") {
    mensaje.textContent = "Debe ingresar el RUT del empleado.";
    return;
  }

  const rutRegex = /^[0-9]+[-]?[0-9kK]{1}$/;
  if (!rutRegex.test(rut) || rut.length < 7 || rut.length > 10) {
    mensaje.textContent = "El RUT ingresado no es válido.";
    return;
  }

  if (nuevoNombre === "" && nuevoApellido === "" && nuevoSueldo === "") {
    mensaje.textContent = "Debe ingresar al menos un dato para actualizar.";
    return;
  }

  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (nuevoNombre !== "" && (!soloLetras.test(nuevoNombre) || nuevoNombre.length < 2)) {
    mensaje.textContent = "El nuevo nombre debe tener solo letras y mínimo 2 caracteres.";
    return;
  }

  if (nuevoApellido !== "" && (!soloLetras.test(nuevoApellido) || nuevoApellido.length < 2)) {
    mensaje.textContent = "El nuevo apellido debe tener solo letras y mínimo 2 caracteres.";
    return;
  }

  if (nuevoSueldo !== "" && (isNaN(nuevoSueldo) || parseFloat(nuevoSueldo) <= 0)) {
    mensaje.textContent = "El nuevo sueldo debe ser un número mayor a 0.";
    return;
  }

  let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  let empleado = empleados.find(emp => emp.rut === rut);

  if (!empleado) {
    mensaje.textContent = "No se encontró un empleado con ese RUT.";
    return;
  }

  let cambios = [];

  if (nuevoNombre !== "" && nuevoNombre !== empleado.nombre) {
    cambios.push("Nombre: " + empleado.nombre + " → " + nuevoNombre);
    empleado.nombre = nuevoNombre;
  }

  if (nuevoApellido !== "" && nuevoApellido !== empleado.apellido) {
    cambios.push("Apellido: " + empleado.apellido + " → " + nuevoApellido);
    empleado.apellido = nuevoApellido;
  }

  if (nuevoSueldo !== "" && parseFloat(nuevoSueldo) !== empleado.sueldo) {
    cambios.push("Sueldo: $" + empleado.sueldo + " → $" + parseFloat(nuevoSueldo));
    empleado.sueldo = parseFloat(nuevoSueldo);
  }

  if (cambios.length === 0) {
    mensaje.textContent = "No hubo cambios. Los datos ingresados son iguales a los actuales.";
    return;
  }

  localStorage.setItem("empleados", JSON.stringify(empleados));

  document.getElementById("formActualizar").reset();
  mensaje.style.color = "green";
  mensaje.innerHTML = "Empleado actualizado correctamente:<br>" + cambios.join("<br>");
});
