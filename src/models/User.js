import { getConnection } from "../database.js";

export class User {
   static #connection;

   static async initConnection() {
      if (!User.#connection) {
         User.#connection = await getConnection();
      }
   }

   static async getAll() {
      await this.initConnection();

      const [users] = await User.#connection.execute("SELECT * FROM `users`");
      return users;
   }

   static async getById(id) {
      await this.initConnection();

      const [result] = await User.#connection.execute(
         "SELECT * FROM `users` WHERE `id` = ?",
         [id]
      );

      return result[0];
   }

   static async create(data) {
      await this.initConnection();

      const { username, first_name, last_name, email } = data;

      const [result] = await User.#connection.execute(
         "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?)",
         [username, first_name, last_name, email]
      );

      return result.insertId;
   }

   static async update(id, data) {
      await this.initConnection();

      const { username, first_name, last_name, email } = data;

      const [result] = await User.#connection.execute(
         "UPDATE users SET username=?, first_name=?, last_name=?, email=? WHERE id=?",
         [username, first_name, last_name, email, id]
      );

      return result.affectedRows;
   }

   static async delete(id) {
      await this.initConnection();

      const [result] = await User.#connection.execute(
         "DELETE FROM users WHERE id = ?",
         [id]
      );
      return result.affectedRows;
   }
}
