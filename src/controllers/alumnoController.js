import Alumnos from "../models/Alumnos";
import {mariadbConnection} from "../databaseMdb1";

//GET-ALUMNOS
export const renderAlumnos = async (req, res) => {
    const alumnos = await Alumnos.find().lean();
    res.render("alumno", {alumnos: alumnos});
};

//POST-AGREGAR
export const createAlumnos = async (req, res) => {
    try {
        const alumnos = Alumnos(req.body);
        await alumnos.save();

        const alumnoId = alumnos._id.toString();
        
        // Obtener la fecha de nacimiento como objeto Date
        const fechaNacimiento = new Date(req.body.fechaNacimiento);

        // Agregar el registro en MariaDB
        const insertQuery = "INSERT INTO alumno (id, nombre, paterno, materno, fechaNac, sexo, celular, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await mariadbConnection.query(insertQuery, [alumnoId, req.body.nombre, req.body.paterno, req.body.materno, fechaNacimiento, req.body.sexo, req.body.celular, req.body.direccion]);        

        res.redirect("/alumnos/agregar");
    } catch (error) {
        console.log(error);
    }
};


//get-update
export const renderEditAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumnos.findById(req.params.id).lean();
        res.render("editarAlumno", {alumnos});
    } catch (error) {
        console.log(error.message);
    }
};

//post-update
export const updateAlumnos = async (req, res) => {
    try {
        const { id } = req.params;
        await Alumnos.findByIdAndUpdate(id, req.body);

        const { nombre, paterno, materno, sexo, celular, direccion } = req.body;
        const fechaNacimiento = new Date(req.body.fechaNacimiento);

        // Actualizar el registro en MariaDB
        const updateQuery = `UPDATE alumno SET nombre = ?, paterno = ?, materno = ?, fechaNac = ?, sexo = ?, celular = ?, direccion = ? WHERE id = ?`;
        await mariadbConnection.query(updateQuery, [nombre, paterno, materno, fechaNacimiento, sexo, celular, direccion, id]);
        console.log(materno);
        res.redirect("/alumnos/agregar");
    } catch (error) {
        console.log(error);
    }
};

//get-delete
export const deleteAlumnos = async (req, res) => {
    const { id } = req.params;
    await Alumnos.findByIdAndDelete(id);

    // Eliminar alumno en MariaDB
    const query = `DELETE FROM alumno WHERE id = ?`;
    await mariadbConnection.query(query, [id]);

    res.redirect("/alumnos/agregar");
};

//get-status
export const statusAlumnos = async (req, res) => {
    const { id } = req.params;
    const alumnos = await Alumnos.findById(id);
    //la propiedad opcion esta en Model
    alumnos.opcion = !alumnos.opcion;
    await alumnos.save();
    res.redirect("/alumnos/agregar");
};