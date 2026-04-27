const mongoose = require("mongoose");

const connection = async () => {
  const urisToTry = [
    process.env.MONGO_URI,
    "mongodb://127.0.0.1:27017/red-social",
    "mongodb://localhost:27017/red-social",
  ].filter(Boolean);

  let lastError;

  for (const uri of urisToTry) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("conexion a la base de datos establecida:", uri);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  console.error("detalle de conexion MongoDB:", lastError?.message || lastError);
  throw new Error("Error al conectar a la base de datos");
};

module.exports = connection;
