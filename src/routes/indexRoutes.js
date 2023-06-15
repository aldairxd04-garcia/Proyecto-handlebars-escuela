import { Router } from "express"
import { createAsignaturas, createAsignaturasMdb, deleteAsignaturas, deleteAsignaturasMdb, renderAsignaturas, renderEditAsignaturas, statusAsignaturas, updateAsignaturas, updateAsignaturasMdb } from "../controllers/asignaturaController";
import { createProfesores, deleteProfesores, renderEditProfesores, renderProfesores, statusProfesores, updateProfesores } from "../controllers/profesorController";
import { createAlumnos, deleteAlumnos, renderAlumnos, renderEditAlumnos, statusAlumnos, updateAlumnos } from "../controllers/alumnoController";
import { createCarreras, deleteCarreras, renderCarreras, renderEditCarreras, statusCarreras, updateCarreras } from "../controllers/carreraController";
import { registrarUsuario, renderSingup } from "../controllers/singupController";
import { autenticarUsuario, renderSingin } from "../controllers/singinController";


const router =Router();

router.get('/', (req, res) =>{
    res.render("index")
});

//ALUMNOS
router.get('/alumnos/agregar', renderAlumnos);

//Alumnos agregar
router.post("/alumnos/agregar", createAlumnos );

// BUSCAR POR ID
router.get("/update/alumnos/:id", renderEditAlumnos);

//ACTUALIZA
router.post("/update/alumnos/:id", updateAlumnos);

//ELIMINA
router.get("/delete/alumnos/:id", deleteAlumnos);

//status 
router.get("/status/alumnos/:id", statusAlumnos);



//ASIGNATURAS

router.get('/asignaturas/agregar', renderAsignaturas);

//agregar asignatura
router.post("/asignaturas/agregar", createAsignaturas);

//EDITAR ASIGANTURA  POR ID
router.get("/update/asignaturas/:id", renderEditAsignaturas);
//ACTUALIZA
router.post("/update/asignaturas/:id", updateAsignaturas);

//elimina
router.get("/delete/asignaturas/:id", deleteAsignaturas);

//status
router.get("/status/asignaturas/:id", statusAsignaturas);



//Profesores

router.get('/profesores/agregar', renderProfesores);

//agregar profesores
router.post("/profesores/agregar", createProfesores);

//EDITAR profesores  POR ID
router.get("/update/profesores/:id", renderEditProfesores);

//ACTUALIZA
router.post("/update/profesores/:id", updateProfesores);

//elimina
router.get("/delete/profesores/:id", deleteProfesores);

//status
router.get("/status/profesores/:id",statusProfesores);


//CARRERAS

router.get('/carreras/agregar', renderCarreras);

//Carreras agregar
router.post("/carreras/agregar", createCarreras );

// BUSCAR POR ID
router.get("/update/carreras/:id", renderEditCarreras);

//ACTUALIZA
router.post("/update/carreras/:id", updateCarreras);

//ELIMINA
router.get("/delete/carreras/:id", deleteCarreras);

//status 
router.get("/status/carreras/:id", statusCarreras);

router.get("/singup", renderSingup);

router.post("/singup/register", registrarUsuario);

router.get("/singin", renderSingin);

router.post("/singin/auth", autenticarUsuario);



export default router;