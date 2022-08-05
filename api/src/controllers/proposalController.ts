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
