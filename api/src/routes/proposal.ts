import express, { NextFunction, Request, Response } from "express";
import { postNewProposal } from '../controllers/proposalController';

const proposal = express.Router();

proposal.post('/', async (req:Request,res:Response,next:NextFunction) => {
    const { idOffer, ...proposal } = req.body;
    try {
        let response: string;
        response = await postNewProposal(proposal, idOffer);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

export default proposal;
