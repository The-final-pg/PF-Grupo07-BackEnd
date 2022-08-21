import { ProposalType } from "../types";
const { Proposal, Offer, UserWorker } = require("../db");

export async function postNewProposal(proposal: ProposalType,
  idOffer: string, idWorker: String): Promise<string> {
  const offer = await Offer.findByPk(idOffer);
  const worker = await UserWorker.findByPk(idWorker);
  const newProposal = await Proposal.create(proposal);
  await offer.addProposal(newProposal);
  await worker.addProposal(newProposal);
  return "Propuesta publicada exitosamente";
}

export async function putProposalState(id: String,
  state: String): Promise<string> {
  const proposalState: ProposalType = await Proposal.findOne({
    where: {
      idProposal: id,
    },
  });
  if (!proposalState) {
    throw new Error(`La propuesta ${id} no existe en la base de datos`)
  }
  if (proposalState.state === "rejected") {
    return "La propuesta fue rechazada y no puede cambiar de estado";
  } else {
    await Proposal.update(
      { state: state },
      {
        where: {
          idProposal: id,
        },
      }
    );

    if (state === "finalized"){
      let worker = await (UserWorker.findByPk(proposalState.userWorkerId,{
        attributes: ['counter_jobs']
      }));
      
      let counter = worker.counter_jobs + 1;
      
      await UserWorker.update(
        {counter_jobs : counter},
        {
        where: {
          id: proposalState.userWorkerId,
        }
      })
    }
    
    return "state updated";
  }
};

export async function putProposalIsActive(
  id: String,
  isActive: Boolean
): Promise<string> {
  const proposalState: ProposalType = await Proposal.findOne({
    where: {
      idProposal: id,
    },
  });
  if (!proposalState) {
    throw new Error(`La propuesta ${id} no existe en la base de datos`);
  }
  await Proposal.update(
    { isActive: isActive },
    {
      where: {
        idProposal: id,
      },
    }
  );
  return "state updated";
}

export async function updateProposalWorkerPremium(
  id: string,
  remuneration: number,
  proposal_description: string,
  worked_time: string
): Promise<ProposalType> {
  const data = { remuneration, proposal_description, worked_time };
  const proposal = await Proposal.findByPk(id);
  if (!remuneration || data.remuneration === proposal.remuneration) delete data.remuneration;
  if (!proposal_description || data.proposal_description === proposal.proposal_description) delete data.proposal_description;
  if (!worked_time || data.worked_time === proposal.worked_time) delete data.worked_time;
  await proposal.set(data);
  await proposal.save();
  return proposal;
}
