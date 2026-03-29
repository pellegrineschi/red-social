// acciones de prueba
const pruebaPublication = (req, res) =>{
    return res.status(200).send(
        {
            message: "mensaja enviado desde el controlador de publication"
        }
    )
};

module.exports = {
    pruebaPublication
}