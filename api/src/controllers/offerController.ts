import * as types from "../types";
const {Offer, Proposal} = require("../db");

export const getAllOffers = async (): Promise<types.offer[]> => {
    let allOffers = await Offer.findAll({include: Proposal});
    return allOffers;
};

export const postOffer = async (offer: types.offer): Promise<string> => {
    await Offer.create(offer);
    return "Propuesta creado con exito";
};

export const getOfferById = async (id:String): Promise<types.offer> =>{
    let offer = await Offer.findByPk(id);
    return offer;
};