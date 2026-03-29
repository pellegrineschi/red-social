// acciones de prueba
const pruebaUser = (req, res) =>{
    return res.status(200).send(
        {
            message: "mensaja enviado desde el controlador de usuario"
        }
    )
};

module.exports = {
    pruebaUser
}