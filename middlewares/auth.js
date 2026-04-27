//importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//importar calve secreta de jwt
const libJwt = require("../services/jwt");
const secret = libJwt.secret;

// middleware de autenticacion de jwt
exports.auth = (req, res, next) => {
  //comprobar si me llega la cabezera de la auth
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).send({
      status: "error",
      message: "la peticion no tiene la cabezera de autenticacion",
    });
  }

  //limpiar el token jwt
  let token = authorization.replace(/['"]+/g, "").replace(/^Bearer\s+/i, "");

  if (!token) {
    return res.status(403).send({
      status: "error",
      message: "la peticion no tiene token de autenticacion",
    });
  }

  //decodificar el token jwt
  try {
    let payload = jwt.decode(token, secret);

    //comprobar si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "el token ha expirado",
      });
    }

    //agregar datos de usuario a la request
    req.user = payload;
    
  } catch (error) {
    return res.status(403).send({
      status: "error",
      message: "token invalido",
    });
  }

  //pasar a ejecucion de accion
  next();
};
