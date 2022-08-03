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
exports.getAllOffer = exports.postOffer = void 0;
const { Offer } = require("../db");
const postOffer = (offer) => __awaiter(void 0, void 0, void 0, function* () {
    yield Offer.create(offer);
    return 'Oferta creada exitosamente';
});
exports.postOffer = postOffer;
const getAllOffer = () => __awaiter(void 0, void 0, void 0, function* () {
    let allOffers = yield Offer.findAll();
    return allOffers;
});
exports.getAllOffer = getAllOffer;
