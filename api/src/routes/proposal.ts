import express, { NextFunction, Request, Response } from "express";
import { postNewProposal, putProposalIsActive, putProposalState } from "../controllers/proposalController";

const proposal = express.Router();

proposal.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { idOffer, ...proposal } = req.body;
  try {
    let response: string;
    response = await postNewProposal(proposal, idOffer);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

proposal.put("/state", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
      const proposalState: String = await putProposalState(id, state);
      res.send(proposalState);
  } catch (error) {
    next(error);
  }
});

proposal.put("/isActive", async (req: Request, res: Response, next: NextFunction) => {
  const { id, isActive } = req.body;
  try {
      const proposalState: String = await putProposalIsActive(id, isActive);
      res.send(proposalState);
  } catch (error) {
    next(error);
  }
});

export default proposal;
