import * as types from "../types"
const { Offer } = require("../db")

export const postOffer = async (offer: types.offer): Promise<string> => {
    await Offer.create(offer);
    return 'Oferta creada exitosamente'
}

export const getAllOffer = async (): Promise<types.offer[]> => {
    let allOffers = await Offer.findAll();
    return allOffers;
}
