import express from "express";
import router from "./router.js";

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use(router);

// Rutas no encontradas
app.use((req, res) => {
   res.status(404).json({
      message: "Ups! there is nothing here",
   });
});

export default app;
