<<<<<<< HEAD
import { ProposalType } from "../types";
const { Proposal, Offer } = require("../db");

export const postNewProposal = async (
  proposal: ProposalType,
  idOffer: string
): Promise<string> => {
  const offer = await Offer.findByPk(idOffer);
  const newProposal = await Proposal.create(proposal);
  await offer.addProposal(newProposal);
  /*     await newProposal.addOffer(offer); */
  return "Propuesta publicada exitosamente";
};

export const putProposalState = async (
  id: String,
  state: String
): Promise<string> => {
  const proposalState: ProposalType = await Proposal.findAll({
    where: {
      id: id,
    },
  });
  if (proposalState.state === "rejected") {
    return "Flaco la quedaste";
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
  } else {
    await Proposal.update(
      { state: state },
      {
        where: {
<<<<<<< HEAD
          id: id,
        },
      }
    );
    return "state updated";
  }
};
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
