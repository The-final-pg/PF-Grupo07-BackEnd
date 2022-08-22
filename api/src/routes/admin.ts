import express, { NextFunction, Request, Response } from "express";
const admin = express.Router();
import { ClientType, WorkerType } from "../types";
import { getAllUsers, addNewProfessions, addNewSkills } from "../controllers/adminController";

admin.get("/users", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users: Array<ClientType | WorkerType> = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    };
  });

  admin.put("/profession", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: string[] = req.body.profession;
      const profession: string[] = await addNewProfessions(data);
      res.json(profession);
    } catch (error) {
      next(error);
    };
  });

  admin.put("/skills", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: string[] = req.body.skills;
      const skills: string[] = await addNewSkills(data);
      res.json(skills);
    } catch (error) {
      next(error);
    };
  });

  export default admin;