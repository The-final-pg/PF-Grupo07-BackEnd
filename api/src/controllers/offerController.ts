import {OfferType} from "../types";
import { Op } from 'sequelize';
const {Offer, Proposal, UserClient} = require("../db");

export const getAllOffers = async (): Promise<OfferType[]> => {
    let allOffers = await Offer.findAll({include: UserClient});
    return allOffers;
};

export const postOffer = async (offer: OfferType): Promise<string> => {
    await Offer.create(offer);
    return "Propuesta creado con exito";
};

export const getOfferById = async (id: String): Promise<OfferType> => {
    let offer = await Offer.findByPk(id, { include: [UserClient, Proposal] });
    return offer;
};

export const getOffersBySearch = async (q: string): Promise<OfferType[]> => {
    let offers = await Offer.findAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.substring]: q
                    }
                },
                {
                    offer_description: {
                        [Op.substring]: q
                    }
                }
            ]
        }
    });
    return offers;
}
