//importar dependencias
const connection = require ("./database/connection");
const express = require("express");
const cors = require("cors");

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

//importar rutas
const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const followRoutes = require("./routes/follow");

//configurar rutas
app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/follow", followRoutes);       

//iniciar API solo cuando MongoDB este disponible
const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log("servidor corriendo en el puerto " + port);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
