"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffersBySearch = exports.getOfferById = exports.postOffer = exports.getAllOffers = void 0;
const sequelize_1 = require("sequelize");
const { Offer, Proposal, UserClient } = require("../db");
const getAllOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    let allOffers = yield Offer.findAll({ include: UserClient });
    return allOffers;
});
exports.getAllOffers = getAllOffers;
const postOffer = (offer) => __awaiter(void 0, void 0, void 0, function* () {
    yield Offer.create(offer);
    return "Propuesta creado con exito";
});
exports.postOffer = postOffer;
const getOfferById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let offer = yield Offer.findByPk(id, { include: [UserClient, Proposal] });
    return offer;
});
exports.getOfferById = getOfferById;
const getOffersBySearch = (q) => __awaiter(void 0, void 0, void 0, function* () {
    let offers = yield Offer.findAll({
        where: {
            [sequelize_1.Op.or]: [
                {
                    title: {
                        [sequelize_1.Op.iLike]: `%${q}%`,
                    },
                },
                {
                    offer_description: {
                        [sequelize_1.Op.iLike]: `%${q}%`,
                    },
                },
            ],
        },
    });
    return offers;
});
exports.getOffersBySearch = getOffersBySearch;
