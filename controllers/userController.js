export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  createUser = async (req, res) => {
    try {
      const { usuario, password, nombre, roleId } = req.body;
      console.log("Datos recibidos para crear usuario", {
        usuario,
        password,
        nombre,
        roleId,
      });

      const newUser = await this.userModel.createUser({
        usuario,
        password,
        nombre,
        roleId,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error al crear el usuario: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.userModel.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.userModel.getUserById({ userId });
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { usuario, password, nombre, roleId } = req.body;
      const updatedUser = await this.userModel.updateUser({
        userId,
        usuario,
        password,
        nombre,
        roleId,
      });
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        data: updatedUser,
      });
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await this.userModel.deleteUser({ userId });
      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
}
