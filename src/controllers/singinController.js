import bcryptjs from "bcryptjs"
import { mariadbConnection2 } from "../databaseMdb2";

export const renderSingin = (req,res) => res.render("singin");

export const autenticarUsuario = async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
  
    if (user && pass) {
      const query = "SELECT * FROM user WHERE user = ? AND pass = ?";
      const results = await mariadbConnection2.query(query, [user, pass]);
  
      if (results.length > 0) {
        // Usuario autenticado correctamente
        res.render("singin", {
          alert: true,
          alertTitle: "Conexión exitosa",
          alertMessage: "Login correcto",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "alumnos/agregar"
        });
      } else {
        // Usuario no encontrado o contraseña incorrecta
        res.render("singin", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario o contraseña incorrecta",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "singin"
        });
      }
    } else {
      // Usuario o contraseña no proporcionados
      res.render("singin", {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Usuario o contraseña incorrecta",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "singin"
      });
    }
  };
  
  

export const auth = (req,res) => {
    const user = req.body.user;
    if(user){
        res.render("index", {
            
            name: user
        })
    }else{
        res.render("index", {
            
            name: "Debe iniciar sesion"
        })
    }
}