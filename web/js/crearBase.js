// Expresiones regulares para validación
var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;

// Obtener elementos del formulario
var nombreBase = document.getElementById("nombreBase");
var mensajeNombreBase = document.getElementsByClassName("mensajeNombreBase")[0];
var circleCrossNombreBase = document.getElementsByClassName("circleCrossNombreBase")[0];
var circleCheckNombreBase = document.getElementsByClassName("circleCheckNombreBase")[0];
var enviarDatos = 1;
var band = 0;

// Validar nombre de la base de datos
nombreBase.addEventListener("blur", () => {
    if (!regexNombre.test(nombreBase.value)) {
        enviarDatos = 0;
        mensajeNombreBase.classList.remove("ocultar");
        nombreBase.classList.add("error");
        nombreBase.classList.remove("correcto");
        circleCrossNombreBase.classList.remove("ocultar");
        circleCheckNombreBase.classList.add("ocultar");
    } else {
        band++;
        enviarDatos = 1;
        mensajeNombreBase.classList.add("ocultar");
        nombreBase.classList.remove("error");
        nombreBase.classList.add("correcto");
        circleCrossNombreBase.classList.add("ocultar");
        circleCheckNombreBase.classList.remove("ocultar");
    }
});

// Validar formulario al enviar
var formulario = document.getElementById("formularioCrearBase");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (enviarDatos === 1 && band === 1) {
        formulario.submit();
        requestNotification();
    } else {
        enviarDatos = 0;
        requestNotification1();
    }
});

// Notificación de éxito
function requestNotification() {
    Notification.requestPermission()
        .then(permission => {
            if (permission === "granted") {
                new Notification("Se registró correctamente");
            }
        });
}

// Notificación de error
function requestNotification1() {
    Notification.requestPermission()
        .then(permission => {
            if (permission === "granted") {
                new Notification("Error al registrarse");
            }
        });
}
