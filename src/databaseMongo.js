import { connect } from "mongoose";

export async function connectToDatabaseMongo() {
  try {
    // Conexión a MongoDB
    //CRUD
    const db = await connect("mongodb://localhost:27017/mydb");
    console.log("Conectado a Mongodb:", db.connection.name);
  } catch (error) {
    console.error(error);
  }

}


