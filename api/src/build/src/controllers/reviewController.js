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
exports.postReviewWorker = exports.postReviewClient = void 0;
const { Review, UserClient, Offer, UserWorker } = require("../db");
//la funcion ReviewClient toma el valor de id de ofer y client y la review
const postReviewClient = (id, idOffer, review) => __awaiter(void 0, void 0, void 0, function* () {
    //crea una nueva review con el objeto que llega por parametros
    const newReview = yield Review.create(review);
    //busca al cliente por la ID recibida
    const client = yield UserClient.findByPk(id);
    //busca la Offer por la id recibida
    const offer = yield Offer.findByPk(idOffer);
    //relaciona al client y la offer con la nueva review
    yield client.addReview(newReview);
    yield offer.addReview(newReview);
    return "Valoración creada con éxito";
});
exports.postReviewClient = postReviewClient;
const postReviewWorker = (id, idOffer, review) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = yield Review.create(review);
    const worker = yield UserWorker.findByPk(id);
    const offer = yield Offer.findByPk(idOffer);
    yield worker.addReview(newReview);
    yield offer.addReview(newReview);
    return "Valoración creada con éxito";
});
exports.postReviewWorker = postReviewWorker;
