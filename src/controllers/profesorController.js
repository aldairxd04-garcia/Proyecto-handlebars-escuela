import Profesores from "../models/Profesores";
import { mariadbConnection } from "../databaseMdb1";

//GET AGREGAR
export const renderProfesores = async (req, res) => {
  const profesores = await Profesores.find().lean();
  res.render("profesores", { profesores: profesores });
};

//POST AGREGAR
export const createProfesores = async (req, res) => {
  try {
    const profesores = Profesores(req.body);
    await profesores.save();

    const idCarrera = profesores._id.toString();

    // Agregar el registro en MariaDB
    const fechaNacimiento = new Date(req.body.fechaNacimiento);
    const insertQuery =
      "INSERT INTO profesores (id, rfc ,nombre, paterno, materno, fechaNac, direccion, celular, profesion, numeroEmpleado ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await mariadbConnection.query(insertQuery, [
      idCarrera,
      req.body.RFC,
      req.body.nombre,
      req.body.paterno,
      req.body.materno,
      fechaNacimiento,
      req.body.direccion,
      req.body.celular,
      req.body.profesion,
      req.body.numeroEmpleado,
    ]);

    res.redirect("/profesores/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get update
export const renderEditProfesores = async (req, res) => {
  try {
    const profesores = await Profesores.findById(req.params.id).lean();
    res.render("editarProfesor", { profesores });
  } catch (error) {
    console.log(error.message);
  }
};

//post update
export const updateProfesores = async (req, res) => {
  try {
    const { id } = req.params;
    await Profesores.findByIdAndUpdate(id, req.body);

    const {
      RFC,
      nombre,
      paterno,
      materno,
      fechaNacimiento,
      direccion,
      celular,
      profesion,
      numeroEmpleado,
    } = req.body;

    // Convertir la fecha de nacimiento a objeto Date
    const fechaNac = new Date(fechaNacimiento);

    // Actualizar el registro en MariaDB
    const updateQuery =
      "UPDATE profesores SET rfc = ?, nombre = ?, paterno = ?, materno = ?, fechaNac = ?, direccion = ?, celular = ?, profesion = ?, numeroEmpleado = ? WHERE id = ?";
    await mariadbConnection.query(updateQuery, [
      RFC,
      nombre,
      paterno,
      materno,
      fechaNac,
      direccion,
      celular,
      profesion,
      numeroEmpleado,
      id,
    ]);

    res.redirect("/profesores/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get delete
export const deleteProfesores = async (req, res) => {
  try {
    const { id } = req.params;
    await Profesores.findByIdAndDelete(id);
    // Eliminar en MariaDB
    const query = `DELETE FROM profesores WHERE id = ?`;
    await mariadbConnection.query(query, [id]);
    res.redirect("/profesores/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get status
export const statusProfesores = async (req, res) => {
  const { id } = req.params;
  const profesores = await Profesores.findById(id);
  //la propiedad opcion esta en Model
  profesores.opcion = !profesores.opcion;
  await profesores.save();
  res.redirect("/profesores/agregar");
};
