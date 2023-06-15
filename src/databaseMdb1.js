import mariadb from "mariadb";

let mariadbConnection; // Variable para almacenar la conexión de MariaDB

export async function connectToDatabaseMaria1(){
    try {
        // Conexión a MariaDB
        //RESPALDO
        const pool = mariadb.createPool({
          host: "mariadb", // Nombre del servicio del contenedor en Docker
          port: 3306,
          user: "root",
          password: "12345",
          database: "respaldo",
          connectionLimit: 100, // Opcional: límite de conexiones concurrentes
        });
    
        mariadbConnection = await pool.getConnection();
        console.log("Conectado a MariaDB Respaldo");
      } catch (error) {
        console.log(error);
      }
}

export { mariadbConnection};