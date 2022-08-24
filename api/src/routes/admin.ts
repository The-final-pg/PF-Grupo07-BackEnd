import express, { NextFunction, Request, Response } from "express";
const admin = express.Router();
import { ClientType, OfferType, WorkerType } from "../types";
import { getAllUsers, addNewProfessions, addNewSkills, getOfferFiltered, updateUser } from "../controllers/adminController";

admin.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const {isActive} = req.query
    try {
      const users: Array<ClientType | WorkerType> = await getAllUsers(isActive as string);
      res.json(users);
    } catch (error) {
      next(error);
    };
  });

admin.get("/offers", async (req: Request, res: Response, next: NextFunction) => {
  const { isActive } = req.query
  try {
    const offers: Array<OfferType> = await getOfferFiltered(isActive as string)
    res.json(offers);
  } catch (error) {
    next(error);
  }
});

admin.get("/offers", async (req: Request, res: Response, next: NextFunction) => {
  const { isActive } = req.query
  try {
    const offers: Array<OfferType> = await getOfferFiltered(isActive as string)
    res.json(offers);
  } catch (error) {
    next(error);
  }
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

  admin.put("/users/isActive" , async(req: Request, res: Response, next: NextFunction) => {
    const {isWorker, id, /* isAdmin, */ isActive} = req.body
    try {
      let message: string = await updateUser( /* isAdmin, */ isActive , isWorker , id);
      res.json(message)
    } catch(error) {
      next(error);
    }
  })

  admin.put("/users/isActive" , async(req: Request, res: Response, next: NextFunction) => {
    const {isWorker, id, /* isAdmin, */ isActive} = req.body
    try {
      let message: string = await updateUser( /* isAdmin, */ isActive , isWorker , id);
      res.json(message)
    } catch(error) {
      next(error);
    }
  })

  export default admin;
