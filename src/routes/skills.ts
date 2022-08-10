import express, { NextFunction, Request, Response } from "express";
import { getAllSkills } from '../controllers/professionController';

const skills = express();

skills.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const skills = await getAllSkills();
        res.json(skills);
    } catch (e) {
        next(e);
    }
})

export default skills;
