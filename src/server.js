import express, { json } from "express";
import { getConnection } from "./database.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(json());

// Registrar las rutas
app.get("/", (req, res) => {
   res.send("Hello World");
});

app.get("/api/users", async (req, res) => {
   const connection = await getConnection();
   const [rows] = await connection.execute("SELECT * FROM `users`");
   res.send(rows);
});

// Parámetros Request Query String
app.get("/api/users/search", (req, res) => {
   const name = req.query.name;

   console.log(req.query);
   res.send(name);
});

// Parámetros Request en la ruta
app.get("/api/users/:id", async (req, res) => {
   const id = req.params.id;

   const connection = await getConnection();
   const [rows] = await connection.execute(
      "SELECT * FROM `users` WHERE `id` = ?",
      [id]
   );
   
   console.log(req.params);
   res.json(rows[0]);
});

// Parámetros Request por el Body
app.post("/api/users", (req, res) => {
   const body = req.body;
   console.log(body);

   res.send(body);
});

// Parámetros Request por el Body y Parámetros Request en la ruta
app.post("/api/tasks/:taskId", (req, res) => {
   const taskId = req.params.taskId;
   const body = req.body;

   const respuesta = {
      order: body.order,
      taskId: taskId,
   };

   res.json(body.order);
});

const testConnection = async () => {
   try {
      await getConnection();
      console.log("Database connected successfully");
   } catch (error) {
      console.error(error.message);
   }
};

testConnection();

// Inciar el servidor
app.listen(PORT, () => {
   console.log(`server running on port ${PORT}`);
});
