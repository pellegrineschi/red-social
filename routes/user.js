const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");

// definir rutas
router.get("/prueba-usuario", userController.pruebaUser);

// exportar router
module.exports = router;