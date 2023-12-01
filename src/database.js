import mysql from "mysql2/promise";

// Configuracion de la conexion de la base de datos
const dbConfig = {
   host: "localhost",
   port: 3307,
   user: "root",
   password: "root",
   database: "geekshubs",
};

// Exportar la función asincrónica getConnection que establece la conexión a la base de datos
export const getConnection = async () => {
   // Crear una conexión utilizando la configuración definida
   const connection = await mysql.createConnection(dbConfig);

   // Retornar la conexión para que pueda ser utilizada en otros módulos
   return connection;
};
