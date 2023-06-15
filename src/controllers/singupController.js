import { mariadbConnection2 } from "../databaseMdb2";

export const renderSingup = async (req, res) => {
    res.render("singup");
};

export const registrarUsuario = async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
  
    mariadbConnection2.query(
      "INSERT INTO user (user, name, rol, pass) VALUES (?, ?, ?, ?)",
      [user, name, rol, pass]);

      res.render("singup", {
        alert: true,
        alertTitle: "Registración",
        alertMessage: "Registro exitoso",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 1500,
        ruta: "singin"
    });
  };