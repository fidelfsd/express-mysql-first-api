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
      try {
         const id = req.params.id;
         const user = await User.getById(id);

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({
            message: "Error getting user",
         });
      }
   }

   static async create(req, res) {
      try {
         const data = req.body;

         const result = await User.create(data);

         res.status(201).json({
            message: "User successfully created",
            id: result,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error creating user",
         });
      }
   }

   static async update(req, res) {
      try {
         const id = req.params.id;
         const data = req.body;

         await User.update(id, data);

         res.status(202).json({
            message: "User successfully updated",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error updating user",
         });
      }
   }

   static async delete(req, res) {
      try {
         const id = req.params.id;

         await User.delete(id);

         res.status(200).json({
            message: "User successfully deleted",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error deleting user",
         });
      }
   }
}
