import { User } from "../models/User.js";

export class UserController {
   static async getAll(req, res) {
      try {
         const users = await User.getAll();
         res.status(200).json(users);
      } catch (error) {
         res.status(500).json({
            message: "Error getting users",
            //  error: error.message,
         });
      }
   }

   static async getById(req, res) {
      //
   }

   static async create(req, res) {
      //
   }

   static async update(req, res) {
      //
   }

   static async delete(req, res) {
      //
   }
}
