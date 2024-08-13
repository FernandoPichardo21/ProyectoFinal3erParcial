document.addEventListener("DOMContentLoaded", function() {
    const numeroCampos = parseInt(document.getElementById("numeroCampos").value, 10);

    const form = document.getElementById("formGenerarCampos");
    for (let i = 0; i < numeroCampos; i++) {
        const fieldset = document.createElement("fieldset");
        fieldset.innerHTML = `
            <legend>Campo ${i + 1}</legend>
            <label for="campo${i}Nombre">Nombre:</label>
            <input type="text" id="campo${i}Nombre" name="campo${i}Nombre" required>
            <label for="campo${i}Tipo">Tipo:</label>
            <select id="campo${i}Tipo" name="campo${i}Tipo">
                <option value="INT">INT</option>
                <option value="DOUBLE">DOUBLE</option>
                <option value="VARCHAR">VARCHAR</option>
            </select>
            <label for="campo${i}Longitud">Longitud (solo para VARCHAR):</label>
            <input type="number" id="campo${i}Longitud" name="campo${i}Longitud">
            <label for="primaryKey${i}">Clave primaria:</label>
            <input type="radio" id="primaryKey${i}" name="primaryKey" value="${i}">
        `;
        form.appendChild(fieldset);
    }
});

function prepareData() {
    const numeroCampos = parseInt(document.getElementById("numeroCampos").value, 10);
    const campos = [];
    for (let i = 0; i < numeroCampos; i++) {
        const nombre = document.getElementById(`campo${i}Nombre`).value;
        const tipo = document.getElementById(`campo${i}Tipo`).value;
        const longitud = document.getElementById(`campo${i}Longitud`).value;
        const primaryKey = document.querySelector(`input[name="primaryKey"]:checked`).value === `${i}`;
        const campo = { nombre, tipo, longitud: tipo === 'VARCHAR' ? longitud : null, primaryKey };
        campos.push(campo);
    }
    document.getElementById('campos').value = JSON.stringify(campos);
}
