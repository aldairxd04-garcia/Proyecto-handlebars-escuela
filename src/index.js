import app from "./app"; //Equivale al codigo que esta en app.js
import { connectToDatabaseMaria1 } from "./databaseMdb1";
import { connectToDatabaseMaria2 } from "./databaseMdb2";
import { connectToDatabaseMongo } from "./databaseMongo";

// Llamar a la función para establecer las conexiones
connectToDatabaseMongo();
connectToDatabaseMaria1();
connectToDatabaseMaria2();

app.listen(3000);
console.log("Servidor en puerto", 3000);