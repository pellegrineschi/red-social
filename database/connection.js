const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/red-social");
    console.log("conexion a la base de datos establecida");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar a la base de datos");
  }
};

module.exports = connection;

