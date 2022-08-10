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
exports.postReview = void 0;
const { Review, UserClient, Offer, UserWorker } = require("../db");
const postReview = (idClient, idWorker, idOffer, review) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = yield Review.create(review);
    const client = yield UserClient.findByPk(idClient);
    const worker = yield UserWorker.findByPk(idWorker);
    const offer = yield Offer.findByPk(idOffer);
    yield client.addReview(newReview);
    yield worker.addReview(newReview);
    yield offer.addReview(newReview);
    return "Valoración creada con éxito";
});
exports.postReview = postReview;
