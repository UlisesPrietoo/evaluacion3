document.getElementById("formEmpleado").addEventListener("submit", function (e) {
  e.preventDefault();

  let rut = document.getElementById("rut").value.trim();
  let nombre = document.getElementById("nombre").value.trim();
  let apellido = document.getElementById("apellido").value.trim();
  let sueldo = document.getElementById("sueldo").value.trim();
  let mensaje = document.getElementById("mensaje");

  mensaje.textContent = "";
  mensaje.style.color = "red";

  if (rut === "" || nombre === "" || apellido === "" || sueldo === "") {
    mensaje.textContent = "Todos los campos son obligatorios.";
    return;
  }

  const rutRegex = /^[0-9]+[-]?[0-9kK]{1}$/;
  if (!rutRegex.test(rut) || rut.length < 7 || rut.length > 10) {
    mensaje.textContent = "El RUT ingresado no es válido o demasiado largo.";
    return;
  }

  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!soloLetras.test(nombre) || nombre.length < 2) {
    mensaje.textContent = "El nombre debe tener solo letras y mínimo 2 caracteres.";
    return;
  }
  if (!soloLetras.test(apellido) || apellido.length < 2) {
    mensaje.textContent = "El apellido debe tener solo letras y mínimo 2 caracteres.";
    return;
  }

  if (isNaN(sueldo) || parseFloat(sueldo) <= 0) {
    mensaje.textContent = "El sueldo debe ser un número mayor a 0.";
    return;
  }

  let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  let yaExiste = empleados.find(emp => emp.rut === rut);
  if (yaExiste) {
    mensaje.textContent = "Ya existe un empleado con ese RUT.";
    return;
  }

  let nuevoEmpleado = {
    rut: rut,
    nombre: nombre,
    apellido: apellido,
    sueldo: parseFloat(sueldo)
  };

  empleados.push(nuevoEmpleado);
  localStorage.setItem("empleados", JSON.stringify(empleados));

  document.getElementById("formEmpleado").reset();
  mensaje.style.color = "green";
  mensaje.textContent = "Empleado agregado correctamente.";

  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.style.color = "red";
  }, 2500);
});
