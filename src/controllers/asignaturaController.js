import { mariadbConnection } from "../databaseMdb1";
import Asignaturas from "../models/Asignaturas";

//--MONGODB--

//GET-AGREGAR
export const renderAsignaturas = async (req, res) => {
  const asignaturas = await Asignaturas.find().lean();
  res.render("asignatura", { asignaturas: asignaturas });
};

//POST-AGREGAR
export const createAsignaturas = async (req, res) => {
  try {
    const asignaturas = Asignaturas(req.body);
    await asignaturas.save();

    const idAsignatura = asignaturas._id.toString();

    // Agregar el registro en MariaDB
    const insertQuery =
      "INSERT INTO asignaturas (id, nombre, creditos, horas) VALUES (?, ?, ?, ?)";
    await mariadbConnection.query(insertQuery, [
      idAsignatura,
      req.body.nombre,
      req.body.creditos,
      req.body.horas,
    ]);

    res.redirect("/asignaturas/agregar");
  } catch (error) {
    console.log(error);
  }
};

//GET-EDITAR
export const renderEditAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignaturas.findById(req.params.id).lean();
    res.render("editarAsignatura", { asignaturas });
  } catch (error) {
    console.log(error.message);
  }
};

//POST-actualiza
export const updateAsignaturas = async (req, res) => {
  try {
    const { id } = req.params;
    await Asignaturas.findByIdAndUpdate(id, req.body);

    const {nombre, creditos, horas} = req.body;

    // Actualizar el registro en MariaDB
    const updateQuery =
      "UPDATE asignaturas SET nombre = ?, creditos = ?, horas = ? WHERE id = ?";
    await mariadbConnection.query(updateQuery, [nombre, creditos, horas, id]);

    res.redirect("/asignaturas/agregar");
  } catch (error) {
    console.log(error);
  }
};

//eliminar-get
export const deleteAsignaturas = async (req, res) => {
  const { id } = req.params;
  await Asignaturas.findByIdAndDelete(id);
  // Eliminar asignatura en MariaDB
  const query = `DELETE FROM asignaturas WHERE id = ?`;
  await mariadbConnection.query(query, [id]);
  res.redirect("/asignaturas/agregar");
};

//status-get
export const statusAsignaturas = async (req, res) => {
  const { id } = req.params;
  const asignaturas = await Asignaturas.findById(id);
  asignaturas.opcion = !asignaturas.opcion;
  await asignaturas.save();
  res.redirect("/asignaturas/agregar");
};
