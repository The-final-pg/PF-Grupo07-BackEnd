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
  const proposalState: ProposalType = await Proposal.findAll({
    where: {
      id: id,
    },
  });
  if (proposalState.state === "rejected") {
    return "Flaco la quedaste";
  } else {
    await Proposal.update(
      { state: state },
      {
        where: {
          id: id,
        },
      }
    );
    return "state updated";
  }
}
