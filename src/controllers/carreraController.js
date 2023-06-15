import Carreras from "../models/Carreras";
import { mariadbConnection } from "../databaseMdb1";

//GET-CARRERAS
export const renderCarreras = async (req, res) => {
  const carreras = await Carreras.find().lean();
  res.render("carrera", { carreras: carreras });
};

//POST-CARRERAS
export const createCarreras = async (req, res) => {
  try {
    const carreras = Carreras(req.body);
    await carreras.save();

    const idCarrera = carreras._id.toString();

    // Agregar el registro en MariaDB
    const insertQuery =
      "INSERT INTO carreras (id, matricula, nombre, siglas, area, modalidad, periodo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await mariadbConnection.query(insertQuery, [
      idCarrera,
      req.body.matricula,
      req.body.nombre,
      req.body.siglas,
      req.body.area,
      req.body.modalidad,
      req.body.periodo,
    ]);

    res.redirect("/carreras/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get-update
export const renderEditCarreras = async (req, res) => {
  try {
    const carreras = await Carreras.findById(req.params.id).lean();
    res.render("editarCarrera", { carreras });
  } catch (error) {
    console.log(error.message);
  }
};

//post-update
export const updateCarreras = async (req, res) => {
  try {
    const { id } = req.params;
    await Carreras.findByIdAndUpdate(id, req.body);

    const { matricula, nombre, siglas, area, modalidad, periodo } = req.body;

    // Actualizar el registro en MariaDB
    const updateQuery =
      "UPDATE carreras SET matricula = ?, nombre = ?, siglas = ?, area = ?, modalidad = ?, periodo = ? WHERE id = ?";
    await mariadbConnection.query(updateQuery, [
      matricula,
      nombre,
      siglas,
      area,
      modalidad,
      periodo,
      id,
    ]);

    res.redirect("/carreras/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get-delete
export const deleteCarreras = async (req, res) => {
  try {
    const { id } = req.params;
    await Carreras.findByIdAndDelete(id);

    // Eliminar en MariaDB
    const query = `DELETE FROM carreras WHERE id = ?`;
    await mariadbConnection.query(query, [id]);

    res.redirect("/carreras/agregar");
  } catch (error) {
    console.log(error);
  }
};

//get-status
export const statusCarreras = async (req, res) => {
  const { id } = req.params;
  const carreras = await Carreras.findById(id);
  //la propiedad opcion esta en Model
  carreras.opcion = !carreras.opcion;
  await carreras.save();
  res.redirect("/carreras/agregar");
};
