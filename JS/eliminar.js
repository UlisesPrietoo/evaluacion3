document.getElementById("formEliminar").addEventListener("submit", function (e) {
  e.preventDefault();

  let rut = document.getElementById("rutEliminar").value.trim();
  let mensaje = document.getElementById("mensajeEliminar");
  mensaje.textContent = "";
  mensaje.style.color = "red";

  if (rut === "") {
    mensaje.textContent = "Debes ingresar un RUT.";
    return;
  }

  const rutRegex = /^[0-9]+[-]?[0-9kK]{1}$/;
  if (!rutRegex.test(rut) || rut.length < 7 || rut.length > 10) {
    mensaje.textContent = "El RUT ingresado no es válido.";
    return;
  }

  let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  let indice = empleados.findIndex(emp => emp.rut === rut);

  if (indice === -1) {
    mensaje.textContent = "No existe un empleado con ese RUT.";
    return;
  }

  empleados.splice(indice, 1);
  localStorage.setItem("empleados", JSON.stringify(empleados));

  document.getElementById("formEliminar").reset();
  mensaje.style.color = "green";
  mensaje.textContent = "Empleado eliminado correctamente.";

  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.style.color = "red";
  }, 2500);
});
