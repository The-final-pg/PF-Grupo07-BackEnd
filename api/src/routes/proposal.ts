import express, { NextFunction, Request, Response } from "express";
<<<<<<< HEAD
import { postNewProposal, putProposalState } from "../controllers/proposalController";
=======
import { postNewProposal, putProposalIsActive, putProposalState } from "../controllers/proposalController";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

const proposal = express.Router();

proposal.post("/", async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
  const { idOffer, ...proposal } = req.body;
  try {
    let response: string;
    response = await postNewProposal(proposal, idOffer);
=======
  const {idWorker, idOffer, ...proposal } = req.body;
  console.log(idWorker, idOffer, proposal)
  try {
    let response: string;
    response = await postNewProposal(proposal, idOffer, idWorker);
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    res.json(response);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
proposal.put("/", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
    if (id && state) {
      const proposalState: String = await putProposalState(id, state);
      res.send(proposalState);
    }
  } catch (error) {
    next(error);
  }
})

=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

export default proposal;
