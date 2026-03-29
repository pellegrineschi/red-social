// acciones de prueba
const pruebaFollow = (req, res) =>{
    return res.status(200).send(
        {
            message: "mensaja enviado desde el controlador de follow"
        }
    )
};

module.exports = {
    pruebaFollow
}