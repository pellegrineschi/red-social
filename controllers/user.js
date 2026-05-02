//importar dependencias y modulos
const bcrypt = require("bcrypt");

//importar modelo de usuario
const User = require("../models/user");

//importar servicios de jwt
const jwt = require("../services/jwt");

// acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "mensaja enviado desde el controlador de usuario",
    usuario: req.user,
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

// login de usuarios
const login = async (req, res) => {
  //recoger los datos de la peticion
  let params = req.body;

  //validar los datos
  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "faltan datos por enviar",
    });
  }

  // buscar en la BD si existe el usuario
  try {
    const user = await User.findOne({
      email: params.email.toLowerCase(),
    })
      //.select({password: 0})
      .exec();

    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "el usuario no existe",
      });
    }

    //comprobar la contraseña
    const validPassword = bcrypt.compareSync(params.password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        status: "error",
        message: "contraseña incorecta",
      });
    }

    //generar el token de JWT
      const token = jwt.createToken(user)

    //devolver datos de usuario
    return res.status(200).send({
      status: "success",
      message: "accion de login corecta",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nick: user.nick,
      },
      token: token
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "error en la consulta de usuario",
    });
  }
};

const profile = async (req, res) =>{

  // recibir el id del usuario identificado por la url
  const id = req.user.id;

  try{
    //consultar para sacar los datos del usuario
    const user = await User.findById(id).select("-password -rol").exec();

    if(!user){
      return res.status(404).send({
        status: "error",
        message: "usuario no encontrado"
      })
    }
    
    //devolver los datos
    return res.status(200).send({
      status: "success",
      user: user
    })


  }catch(error){
    return res.status(500).send({
      status: "error",
      message: "error en la consulta de usuario"
    })

  }

}

const list = async (req, res) =>{
  try{
    return res.status(200).send({
      status: "success",
      message: "listado de usuarios"
    })
    
  }catch(error){
    return res.status(500).send({
      status: "error",
      message: "error en la consulta de usuarios"
    })
  }
}

module.exports = {
  pruebaUser,
  register,
  login,
  profile,
  list
};
