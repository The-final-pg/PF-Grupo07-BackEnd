import express, { NextFunction, Request, Response } from "express";
import { postNewProposal, putProposalIsActive, putProposalState, updateProposalWorkerPremium } from "../controllers/proposalController";
import { ProposalType } from "../types";

const proposal = express.Router();

proposal.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {idWorker, idOffer, ...proposal } = req.body;
  console.log(idWorker, idOffer, proposal)
  try {
    let response: string;
    response = await postNewProposal(proposal, idOffer, idWorker);
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

proposal.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const { remuneration, proposal_description, worked_time }: { remuneration: number, proposal_description: string, worked_time: string } = req.body;
  try {
    const proposalUpdate: ProposalType = await updateProposalWorkerPremium(id, remuneration, proposal_description, worked_time);
    res.json(proposalUpdate);
  } catch (error) {
    next(error);
  };
});

export default proposal;
