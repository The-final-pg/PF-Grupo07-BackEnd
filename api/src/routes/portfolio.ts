import express from "express";
import types from "../types";
import { postNewPortfolio } from "../controllers/portfolioController";

const portfolio = express.Router();

portfolio.post('/', async (req:any,res:any,next:any) => {
    const idWorker: string = req.params.idWorker;
    const portfolio: types.portfolio = req.body;
    try {
        let response: string;
        response = await postNewPortfolio(portfolio, idWorker);
        res.send(response);
    } catch (error) {
        next(error);
    };
});

export default portfolio;