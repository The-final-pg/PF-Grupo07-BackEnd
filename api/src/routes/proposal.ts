import express from "express";
import { postNewProposal } from '../controllers/proposalController';

const proposal = express.Router();

proposal.post('/', async (req:any,res:any,next:any) => {
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