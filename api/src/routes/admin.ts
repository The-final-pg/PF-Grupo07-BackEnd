import express, { NextFunction, Request, Response } from "express";
const admin = express.Router();
import { ClientType, OfferType, WorkerType } from "../types";
import { getAllUsers, addNewProfessions, addNewSkills, getOfferFiltered, updateUser, deleteProfession, deleteSkill, updateUserAdmin } from "../controllers/adminController";
admin.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const {isActive} = req.query
    try {
      const users: Array<ClientType | WorkerType> = await getAllUsers(isActive as string);
      res.json(users);
    } catch (error) {
      next(error);
    };
  })

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
      const profession: string = req.body.profession;
      const response: string = await addNewProfessions(profession);
      res.json(response);
    } catch (error) {
      next(error);
    };
  });

  admin.put("/profession/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const array: string[] = req.body.array;
      const profession: string = req.body.profession;
      const response: string = await deleteProfession(array, profession);
      res.json(response);
    } catch (error) {
      next(error);
    };
  });

  admin.put("/skills", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill: string = req.body.skill;
      const response: string = await addNewSkills(skill);
      res.json(response);
    } catch (error) {
      next(error);
    };
  });

  admin.put("/skills/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const array: string[] = req.body.array;
      const skill: string = req.body.skill;
      const response: string = await deleteSkill(array, skill);
      res.json(response);
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

  admin.put("/users/isAdmin" , async(req: Request, res: Response, next: NextFunction) => {
    const {isWorker, id, /* isAdmin, */ isAdmin} = req.body
    try {
      let message: string = await updateUserAdmin( /* isAdmin, */ isAdmin , isWorker , id);
      res.json(message)
    } catch(error) {
      next(error);
    }
  })

  export default admin;
