// acciones de prueba
const pruebaUser = (req, res) =>{
    return res.status(200).send(
        {
            message: "mensaja enviado desde el controlador de usuario"
        }
    )
};

// registro de usuarios
const register = (req, res) => {
    return res.status(200).json({
        message: "accion de registro de usuario"
    })
}

module.exports = {
    pruebaUser,
    register
}
