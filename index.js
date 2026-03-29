//importar dependencias
const connection = require ("./database/connection");
const express = require("express");
const cors = require("cors");

//conexion a la base de datos
connection();

//crear servidor node
const app = express();
const port = 3900;

//configurar cors
app.use(cors());

// covertir el body a json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ruta de prueba
app.get("/ruta-prueba", (req, res)=>{
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "prueba",
            "descripcion": "esta es una ruta de prueba"
        }
    )
});

//poner el servidor a escuchar peticiones http
app.listen(port, ()=>{
    console.log("servidor corriendo en el puerto " + port);
});
