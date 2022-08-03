import * as types from "../types";
const {Offer} = require("../db");

export const getAllClients = async (): Promise<types.offer[]> => {
    let allOffers = await Offer.findAll();
    return allOffers;
};

export const postNewUser = async (offer: types.offer): Promise<string> => {
    await Offer.create(offer);
    return "Propuesta creado con exito";
};

export const getClientById = async (id:String): Promise<types.offer> =>{
    let offer = await Offer.findByPk(id);
    return offer;
};