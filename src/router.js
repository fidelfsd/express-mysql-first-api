import express from "express";
import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";
// import productsRoutes from "./routes/products.routes.js";
// import tasksRoutes from "./routes/tasks.routes.js";

// -----------------------------------------------------------------------------

const router = express.Router();



// ruta base
router.use("/", indexRoutes);

// rutas de user
router.use("/api/users", usersRoutes);

// rutas de products
//router.use("/api/products", productsRoutes);

// rutas de tasks
//router.use("/api/tasks", tasksRoutes);

export default router;
