import mariadb from "mariadb";

let mariadbConnection2;

export async function connectToDatabaseMaria2(){
    try {
        // Conexión a MariaDB
        //USUARIOS
        const pool2 = mariadb.createPool({
          host: "mariadb2", // Nombre del servicio del contenedor en Docker
          port: 3306,
          user: "root",
          password: "54321",
          database: "usuarios",
          connectionLimit: 100, // Opcional: límite de conexiones concurrentes
        });
    
        mariadbConnection2 = await pool2.getConnection();
        console.log("Conectado a MariaDB Usuarios");
      } catch (error) {
        console.log(error);
      }
}

export { mariadbConnection2 };