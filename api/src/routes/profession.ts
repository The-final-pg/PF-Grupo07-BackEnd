import express, { NextFunction, Request, Response } from "express";
import { getAllProfessions } from '../controllers/professionController';

const profession = express();

profession.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const profession = await getAllProfessions();
        res.json(profession);
    } catch (e) {
        next(e);
    }
})

export default profession;
