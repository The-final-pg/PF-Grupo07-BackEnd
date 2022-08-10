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
exports.putOfferState = exports.getOffersBySearch = exports.getOfferById = exports.postOffer = exports.getAllOffers = void 0;
const sequelize_1 = require("sequelize");
const { Offer, Proposal, UserClient, UserWorker } = require("../db");
function getAllOffers(multiplier = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        let allOffers = yield Offer.findAll({
            limit: 8 + 5 * multiplier,
            include: UserClient
        });
        return allOffers;
    });
}
exports.getAllOffers = getAllOffers;
function postOffer(offer) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Offer.create(offer);
        return "Propuesta creado con exito";
    });
}
exports.postOffer = postOffer;
function getOfferById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let offer = yield Offer.findByPk(id, {
            include: [
                { model: UserClient, include: Offer },
                { model: Proposal, include: UserWorker },
            ],
        });
        return offer.toJSON();
    });
}
exports.getOfferById = getOfferById;
function getOffersBySearch(q, multiplier = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        let offers = yield Offer.findAll({
            limit: 8 + 5 * multiplier,
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
            include: UserClient
        });
        return offers;
    });
}
exports.getOffersBySearch = getOffersBySearch;
function putOfferState(id, state) {
    return __awaiter(this, void 0, void 0, function* () {
        const offerState = yield Offer.findAll({
            where: {
                id: id,
            },
        });
        if (offerState.state === "cancelled") {
            return "Flaco la hubieras pensado antes";
        }
        else {
            yield Offer.update({ state: state }, {
                where: {
                    id: id,
                },
            });
            return "state updated";
        }
    });
}
exports.putOfferState = putOfferState;
