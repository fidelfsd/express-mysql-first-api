import express, { json } from "express";
import { getConnection } from "./database.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(json());

// Ruta base
app.get("/", (req, res) => {
   res.send("Hello World");
});

// Obtener todos los usuarios
app.get("/api/users", async (req, res) => {
   const connection = await getConnection();
   const [rows] = await connection.execute("SELECT * FROM `users`");
   res.send(rows);
});

// Obtener los usuarios por nombre
app.get("/api/users/search", (req, res) => {
   const name = req.query.name; // query string -> name

   console.log(req.query);
   res.send(name);
});

// Obtener un usuario por id
app.get("/api/users/:id", async (req, res) => {
   const id = req.params.id; // params -> id

   const connection = await getConnection();
   const [rows] = await connection.execute(
      "SELECT * FROM `users` WHERE `id` = ?",
      [id]
   );

   console.log(req.params);
   res.json(rows[0]);
});

// Crear un usuario
app.post("/api/users", async (req, res) => {
   const connection = await getConnection();

   const { username, first_name, last_name, email } = req.body;

   const [result] = await connection.execute(
      "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?)",
      [username, first_name, last_name, email]
   );

   res.status(201).json({
      message: "User successfully created",
      id: result.insertId,
   });
});

// Actualizar un usuario por id
app.patch("/api/users/:id", async (req, res) => {
   const connection = await getConnection();

   const id = req.params.id;

   const { username, first_name, last_name, email } = req.body;

   const [result] = await connection.execute(
      "UPDATE users SET username=?, first_name=?, last_name=?, email=? WHERE id=?",
      [username, first_name, last_name, email, id]
   );

   res.status(202).json({
      message: "User successfully updated",
      result: result.affectedRows > 0,
   });
});

// Borrar un usuario por id
app.delete("/api/users/:id", async (req, res) => {
   const connection = await getConnection();

   const id = req.params.id;

   const [result] = await connection.execute("DELETE FROM users WHERE id =?", [
      id,
   ]);

   res.status(200).json({
      message: "User successfully deleted",
      result: result.affectedRows > 0,
   });
});

// Rutas no encontradas
app.use((req, res) => {
   res.status(404).json({
      message: "Ups! there is nothing here",
   });
});

// Funcion anonima que se define y se autoejecuta
(async () => {
   try {
      // Conexion con la base de datos
      await getConnection();
      console.log("==================================");
      console.log("🛢️  Database connected successfully");

      // Iniciar el servidor solo si se conecta la base de datos
      app.listen(PORT, () => {
         console.log(`🚀 Server running on port ${PORT}`);
         console.log("==================================");
      });
   } catch (error) {
      console.error(error.message);
   }
})();
