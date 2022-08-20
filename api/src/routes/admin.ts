import express, { NextFunction, Request, Response } from "express";
const admin = express.Router();
import { ClientType, WorkerType } from "../types";
import { getAllUsers } from "../controllers/adminController";

admin.get("/users", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users: Array<ClientType | WorkerType> = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    };
  });

  export default admin;