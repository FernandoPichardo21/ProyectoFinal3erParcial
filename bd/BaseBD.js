const ConectarBD = require('./ConectarBD');
const conexion = new ConectarBD();

const crearBaseDeDatos = async (nombreBase) => {
    await conexion.conectarMySql();
    const query = `CREATE DATABASE \`${nombreBase}\``;
    await conexion.conexion.query(query);
    await conexion.cerrarConexion();
};

const listarBasesDeDatos = async () => {
    await conexion.conectarMySql();
    const [rows] = await conexion.conexion.query('SHOW DATABASES');
    await conexion.cerrarConexion();
    return rows.map(row => row.Database);
};

const listarTablas = async (baseNombre) => {
    await conexion.conectarMySql();
    await conexion.conexion.query(`USE \`${baseNombre}\``);
    const [rows] = await conexion.conexion.query('SHOW TABLES');
    await conexion.cerrarConexion();
    return rows.map(row => row[`Tables_in_${baseNombre}`]);
};

const eliminarTabla = async (baseNombre, tablaNombre) => {
    await conexion.conectarMySql();
    await conexion.conexion.query(`USE \`${baseNombre}\``);
    const query = `DROP TABLE \`${tablaNombre}\``;
    await conexion.conexion.query(query);
    await conexion.cerrarConexion();
};

const obtenerDetallesTabla = async (baseNombre, tablaNombre) => {
    await conexion.conectarMySql();
    await conexion.conexion.query(`USE \`${baseNombre}\``);
    const [columnas] = await conexion.conexion.query(`SHOW COLUMNS FROM \`${tablaNombre}\``);
    const [registros] = await conexion.conexion.query(`SELECT * FROM \`${tablaNombre}\``);
    await conexion.cerrarConexion();
    return {
        columnas: columnas.map(columna => columna.Field),
        registros
    };
};

const eliminarRegistro = async (baseNombre, tablaNombre, condiciones) => {
    await conexion.conectarMySql();
    await conexion.conexion.query(`USE \`${baseNombre}\``);
    const condicionesStr = Object.keys(condiciones)
        .map(columna => `\`${columna}\` = ?`)
        .join(' AND ');
    const query = `DELETE FROM \`${tablaNombre}\` WHERE ${condicionesStr}`;
    await conexion.conexion.query(query, Object.values(condiciones));
    await conexion.cerrarConexion();
};

const crearTabla = async (baseNombre, tablaNombre, campos) => {
    await conexion.conectarMySql();
    await conexion.conexion.query(`USE \`${baseNombre}\``);
    
    // Generar la cadena de campos
    const camposStr = campos.map(campo => {
        let campoStr = `\`${campo.nombre}\` ${campo.tipo}`;
        
        // Añadir longitud si es VARCHAR
        if (campo.tipo === 'VARCHAR' && campo.longitud) {
            campoStr += `(${campo.longitud})`;
        }
        
        // Añadir PRIMARY KEY si es necesario
        if (campo.primaryKey) {
            campoStr += ' PRIMARY KEY';
        }
        
        return campoStr;
    }).join(', ');

    // Generar la consulta final
    const query = `CREATE TABLE \`${tablaNombre}\` (${camposStr})`;
    
    // Imprimir la consulta para depuración
    console.log(query);
    
    // Ejecutar la consulta
    await conexion.conexion.query(query);
    await conexion.cerrarConexion();
};





module.exports = {
    crearBaseDeDatos,
    listarBasesDeDatos,
    listarTablas,
    eliminarTabla,
    obtenerDetallesTabla,
    crearTabla,
    eliminarRegistro,
};


