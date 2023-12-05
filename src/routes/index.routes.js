import express from "express";

// -----------------------------------------------------------------------------

const router = express.Router();

// Ruta base
router.get("/", (req, res) => {
   res.send("Hello World");
});

export default router;
