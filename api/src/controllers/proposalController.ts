import { ProposalType} from "../types";
const { Proposal, Offer } = require("../db");

export async function postNewProposal(proposal: ProposalType,
  idOffer: string): Promise<string> {
  const offer = await Offer.findByPk(idOffer);
  const newProposal = await Proposal.create(proposal);
  await offer.addProposal(newProposal);
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
    return "state updated";
  }
}
