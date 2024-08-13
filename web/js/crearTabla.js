document.addEventListener('DOMContentLoaded', () => {
    // Expresiones regulares para validación
    var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;

    // Obtener elementos del formulario
    var nombreBase = document.getElementById("nombreBase");
    var nombreTabla = document.getElementById("nombreTabla");
    var numCampos = document.getElementById("numCampos");
    var generarCampos = document.getElementById("generarCampos");
    var camposContainer = document.getElementById("camposContainer");

    var mensajeNombreBase = document.getElementsByClassName("mensajeNombreBase")[0];
    var circleCrossNombreBase = document.getElementsByClassName("circleCrossNombreBase")[0];
    var circleCheckNombreBase = document.getElementsByClassName("circleCheckNombreBase")[0];
    var enviarDatos = 1;
    var band = 0;

    // Validar nombre de la base de datos y nombre de la tabla
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

    nombreTabla.addEventListener("blur", () => {
        if (!regexNombre.test(nombreTabla.value)) {
            enviarDatos = 0;
            mensajeNombreBase.classList.remove("ocultar");
            nombreTabla.classList.add("error");
            nombreTabla.classList.remove("correcto");
            circleCrossNombreBase.classList.remove("ocultar");
            circleCheckNombreBase.classList.add("ocultar");
        } else {
            band++;
            enviarDatos = 1;
            mensajeNombreBase.classList.add("ocultar");
            nombreTabla.classList.remove("error");
            nombreTabla.classList.add("correcto");
            circleCrossNombreBase.classList.add("ocultar");
            circleCheckNombreBase.classList.remove("ocultar");
        }
    });

    // Generar campos dinámicamente
    generarCampos.addEventListener("click", () => {
        camposContainer.innerHTML = ''; // Limpiar contenedor de campos
        const num = parseInt(numCampos.value);
        for (let i = 0; i < num; i++) {
            const campoDiv = document.createElement("div");
            campoDiv.classList.add("campo");

            const labelNombre = document.createElement("label");
            labelNombre.innerText = `Nombre del campo ${i + 1}`;
            const inputNombre = document.createElement("input");
            inputNombre.type = "text";
            inputNombre.name = `campoNombre${i}`;
            inputNombre.required = true;

            const labelTipo = document.createElement("label");
            labelTipo.innerText = `Tipo de dato del campo ${i + 1}`;
            const selectTipo = document.createElement("select");
            selectTipo.name = `campoTipo${i}`;
            selectTipo.required = true;
            const optionInt = document.createElement("option");
            optionInt.value = "int";
            optionInt.innerText = "int";
            const optionVarchar = document.createElement("option");
            optionVarchar.value = "varchar";
            optionVarchar.innerText = "varchar";
            const optionDouble = document.createElement("option");
            optionDouble.value = "double";
            optionDouble.innerText = "double";
            selectTipo.append(optionInt, optionVarchar, optionDouble);

            const labelExtension = document.createElement("label");
            labelExtension.innerText = `Extensión del campo ${i + 1}`;
            const inputExtension = document.createElement("input");
            inputExtension.type = "number";
            inputExtension.name = `campoExtension${i}`;
            inputExtension.min = 1;
            inputExtension.disabled = true; // Solo habilitar si es varchar

            selectTipo.addEventListener("change", () => {
                if (selectTipo.value === "varchar") {
                    inputExtension.disabled = false;
                    inputExtension.required = true;
                } else {
                    inputExtension.disabled = true;
                    inputExtension.required = false;
                }
            });

            const labelClave = document.createElement("label");
            labelClave.innerText = `Clave primaria del campo ${i + 1}`;
            const inputClave = document.createElement("input");
            inputClave.type = "radio";
            inputClave.name = "campoClave";
            inputClave.value = i;

            campoDiv.append(labelNombre, inputNombre, labelTipo, selectTipo, labelExtension, inputExtension, labelClave, inputClave);
            camposContainer.appendChild(campoDiv);
        }
    });

    // Validar formulario al enviar
    var formulario = document.getElementById("formularioCrearTabla");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const campos = [];
        for (let i = 0; i < numCampos.value; i++) {
            const nombre = document.querySelector(`input[name="campoNombre${i}"]`).value;
            const tipo = document.querySelector(`select[name="campoTipo${i}"]`).value;
            const extension = document.querySelector(`input[name="campoExtension${i}"]`).value;
            const esClave = document.querySelector(`input[name="campoClave"]:checked`).value == i;

            let campo = `\`${nombre}\` ${tipo}`;
            if (tipo === "varchar") {
                campo += `(${extension})`;
            }
            if (esClave) {
                campo += " PRIMARY KEY";
            }
            campos.push(campo);
        }

        const camposJson = JSON.stringify(campos);
        const camposInput = document.createElement("input");
        camposInput.type = "hidden";
        camposInput.name = "campos";
        camposInput.value = camposJson;
        formulario.appendChild(camposInput);
        formulario.submit();
        requestNotification();
    });

    // Notificación de éxito
    function requestNotification() {
        Notification.requestPermission()
            .then(permission => {
                if (permission === "granted") {
                    new Notification("Tabla creada correctamente");
                }
            });
    }

    // Notificación de error
    function requestNotification1() {
        Notification.requestPermission()
            .then(permission => {
                if (permission === "granted") {
                    new Notification("Error al crear la tabla");
                }
            });
    }
});
