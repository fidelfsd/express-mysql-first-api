import app from "./app.js";
import { getConnection } from "./database.js";

const PORT = 3000;

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
