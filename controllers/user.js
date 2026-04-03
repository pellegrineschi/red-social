//importar dependencias y modulos
const bcrypt = require("bcrypt");
const User = require("../models/user");

// acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "mensaja enviado desde el controlador de usuario",
  });
};

// registro de usuarios
const register = async (req, res) => {
  //recoger los datos de la peticion
  let params = req.body;

  //validar los datos
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      status: "error",
      message: "faltan datos por enviar",
    });
  }

  //control usuario duplicado
  try {
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    }).exec();

    if (users && users.length >= 1) {
      return res.status(200).json({
        status: "success",
        message: "el usuario ya existe",
      });
    }

    //cifrar la contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;
    //crear objeto de usuario
    let user_to_save = new User(params);

    //guardar usuario en la base de datos
    try {
      const userStored = await user_to_save.save();
      return res.status(200).json({
        status: "success",
        message: "registro de usuario exitoso",
        user: userStored,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "error al guardar el usuario",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "error en la consulta de usuarios",
    });
  }
};

module.exports = {
  pruebaUser,
  register,
};
