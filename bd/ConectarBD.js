
class ConectarBD {
    constructor(){
        this.conexion = null;
        this.mysql = require("mysql2/promise");
    }
    async conectarMySql(){
        try {
            this.conexion = await this.mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                password: "root",
                database: "",
                port: "3306"
            });
            console.log("Conectado a MySQL");
        } catch (error) {
            console.error("Error al conectar con MySQL: " + error);
        }
    }
    async cerrarConexion(){
        try {
            await this.conexion.end();
            console.log("Conexión con MySQL cerrada");
        } catch (error) {
            console.error("Error al cerrar la conexión: " + error);
        }
    }
    async listarBasesDeDatos() {
        try {
            await this.conectarMySql();
            const [rows] = await this.conexion.query('SHOW DATABASES');
            await this.cerrarConexion();
            return rows.map(row => row.Database); // Devuelve solo los nombres de las bases de datos
        } catch (error) {
            console.error('Error al listar bases de datos:', error);
            throw error;
        }
    }
}

module.exports = ConectarBD;
