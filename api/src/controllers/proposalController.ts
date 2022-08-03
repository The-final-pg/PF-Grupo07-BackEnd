import * as types from "../types"
const { Proposal, Offer } = require("../db");

export const postNewProposal = async (proposal: types.proposal, idOffer: string): Promise<string> => {
    const offer = await Offer.findByPk(idOffer);
    const newOffer = await Proposal.create(proposal)
    await offer.addProposal(newOffer);
    /*     await newProposal.addOffer(offer); */
    return "Propuesta publicada exitosamente";
}
