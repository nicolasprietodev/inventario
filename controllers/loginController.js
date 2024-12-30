import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS, JWT_TOKEN } from "../config/config.js";

export class LoginController {
  constructor({ loginModel }) {
    this.loginModel = loginModel;
  }

  login = async (req, res) => {
    const { usuario, password } = req.body;

    try {
      console.log("usuario", usuario);
      const user = await this.loginModel.getCorreo({ usuario });
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      console.log("password", password, user.password);

      const passwordIsValid = await this.loginModel.validatePassword(
        password,
        user.password
      );

      console.log("passwordIsValid", passwordIsValid);

      if (!passwordIsValid) {
        return res
          .status(401)
          .json({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign(
        {
          user: user.nombre_usuario,
          rol: user.rol,
        },
        JWT_TOKEN,
        { expiresIn: "1h" }
      );

      res.cookie("authToken", token, COOKIE_OPTIONS);
      res.status(200).json({ message: "Login exitoso" });
    } catch (error) {
      console.error("Error en login", error);
      res.status(500).json({ message: "Error en login" });
    }
  };

  logout = async (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Sesion cerrada exitosamente" });
  };
}
