import { ProposalType} from "../types";
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
    console.log(proposalState)
    if (state === "finalized"){
      await UserWorker.update(
        {counter_jobs : + 1},
        {
        where: {
          id: proposalState.userWorkerId,
        }
      })
    }
    
    return "state updated";
  }
};

export async function putProposalIsActive(id: String,
  isActive: Boolean): Promise<string> {
  const proposalState: ProposalType = await Proposal.findOne({
    where: {
      idProposal: id,
    },
  });
  if (!proposalState) {
    throw new Error(`La propuesta ${id} no existe en la base de datos`)
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
