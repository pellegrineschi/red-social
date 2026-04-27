//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta para generar el token
const secret = "clave_secreta_para_generar_token_jwt";

//funcion para generar el token de jwt
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()        
    }
    //devolver jwt token codificado
    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
};
