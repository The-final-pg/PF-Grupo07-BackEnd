import {OfferType} from "../types";
const {Offer, Proposal} = require("../db");

export const getAllOffers = async (): Promise<OfferType[]> => {
    let allOffers = await Offer.findAll({include: Proposal});
    return allOffers;
};

export const postOffer = async (offer: OfferType): Promise<string> => {
    await Offer.create(offer);
    return "Propuesta creado con exito";
};

export const getOfferById = async (id:String): Promise<OfferType> =>{
    let offer = await Offer.findByPk(id);
    return offer;
};
