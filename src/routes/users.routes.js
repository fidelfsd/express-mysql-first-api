import express from "express";
import { UserController } from "../controllers/UserController.js";

// -----------------------------------------------------------------------------

const router = express.Router();

// Obtener todos los usuarios
router.get("/", UserController.getAll);

// Obtener los usuarios por nombre
// router.get("/api/users/search",  ?? );

// Obtener un usuario por id
router.get("/:id", UserController.getById);

// Crear un usuario
router.post("/", UserController.create);

// Actualizar un usuario por id
router.patch("/:id", UserController.update);

// Borrar un usuario por id
router.delete("/:id", UserController.delete);

export default router;
