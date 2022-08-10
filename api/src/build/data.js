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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReview = exports.setPortfolios = exports.setProposals = exports.setOffers = exports.setData = void 0;
const axios_1 = __importDefault(require("axios"));
const { UserClient, UserWorker, Offer, Proposal, Portfolio, Review, } = require("./src/db");
const setData = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserClient.findAll();
    if (!users.length) {
        const responseUsers = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Worker");
        let arrayClient = [];
        let arrayWorker = [];
        responseUsers.data.map((e) => {
            arrayWorker.push({
                name: e.Worker.name,
                user_mail: e.Worker.user_mail,
                born_date: e.Worker.born_date,
                password: e.Worker.password,
                profession: e.Worker.profession,
                skills: e.Worker.skills,
                rating: ((e.Worker.rating - 1) % 5) + 1,
                photo: e.Worker.photo,
                notification: e.Worker.notification,
            });
            arrayClient.push({
                name: e.Client.name,
                user_mail: e.Client.user_mail,
                born_date: e.Client.born_date,
                password: e.Client.password,
                rating: ((e.Client.rating - 1) % 5) + 1,
                photo: e.Client.photo,
                notification: e.Client.notification,
            });
        });
        let arrayClientDb = yield (arrayClient === null || arrayClient === void 0 ? void 0 : arrayClient.filter((c) => c));
        yield UserClient.bulkCreate(arrayClientDb);
        let arrayWorkerDb = yield (arrayWorker === null || arrayWorker === void 0 ? void 0 : arrayWorker.filter((c) => c));
        yield UserWorker.bulkCreate(arrayWorkerDb);
        console.log("se cargo la data");
    }
});
exports.setData = setData;
const setOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield Offer.findAll();
    if (!offers.length) {
        let clientsId = yield UserClient.findAll();
        const responseOffers = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer");
        let arrayOffers = [];
        responseOffers.data.map((e) => {
            arrayOffers.push({
                title: e.Offer.title,
                max_remuneration: Math.floor(e.Offer.remuneration),
                min_remuneration: Math.floor(e.Offer.remuneration / 2),
                offer_description: e.Offer.offer_description,
                post_duration_time: e.Offer.post_duration_time,
                work_duration_time: parseInt(e.Offer.work_duration_time),
                photo: e.Offer.photo,
                profession: e.Offer.profession,
            });
        });
        arrayOffers = arrayOffers.map((e) => {
            let x = clientsId.pop();
            return Object.assign(Object.assign({}, e), { userClientIdClient: x.dataValues.idClient });
        });
        let arrayOffersDb = yield (arrayOffers === null || arrayOffers === void 0 ? void 0 : arrayOffers.filter((c) => c));
        yield Offer.bulkCreate(arrayOffersDb);
    }
});
exports.setOffers = setOffers;
function setProposals() {
    return __awaiter(this, void 0, void 0, function* () {
        const proposals = yield Proposal.findAll();
        if (!proposals.length) {
            let workersId = yield UserWorker.findAll();
            let offersId = yield Offer.findAll();
            const responseProposal = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer");
            let arrayProposal = [];
            responseProposal.data.map((e) => {
                arrayProposal.push({
                    remuneration: parseInt(e.Proposal.remuneration),
                    proposal_description: e.Proposal.proposal_description,
                    worked_time: parseInt(e.Proposal.worked_time),
                });
            });
            arrayProposal = arrayProposal.map((e) => {
                let x = workersId.pop();
                let y = offersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerIdWorker: x.dataValues.idWorker, offerIdOffer: y.dataValues.idOffer });
            });
            let arrayProposalDb = yield (arrayProposal === null || arrayProposal === void 0 ? void 0 : arrayProposal.filter((c) => c));
            yield Proposal.bulkCreate(arrayProposalDb);
        }
    });
}
exports.setProposals = setProposals;
function setPortfolios() {
    return __awaiter(this, void 0, void 0, function* () {
        const portfolios = yield Portfolio.findAll();
        if (!portfolios.length) {
            let workersId = yield UserWorker.findAll();
            const responsePortfolio = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Portfolio");
            let arrayPortfolio = [];
            responsePortfolio.data.map((e) => {
                arrayPortfolio.push({
                    title: e.title,
                    photo: e.photo,
                    portfolio_description: e.portfolio_description,
                });
            });
            arrayPortfolio = arrayPortfolio.map((e) => {
                let x = workersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerIdWorker: x.dataValues.idWorker });
            });
            let arrayPortfolioDb = yield (arrayPortfolio === null || arrayPortfolio === void 0 ? void 0 : arrayPortfolio.filter((c) => c));
            yield Portfolio.bulkCreate(arrayPortfolioDb);
        }
    });
}
exports.setPortfolios = setPortfolios;
function setReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield Review.findAll();
        if (!reviews.length) {
            let workersId = yield UserWorker.findAll();
            let clientsId = yield UserClient.findAll();
            let offersId = yield Offer.findAll();
            const responseReview = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Review");
            let arrayReview = [];
            responseReview.data.map((e) => {
                arrayReview.push({
                    valoration: ((e.valoration - 1) % 5) + 1,
                    review_description: e.review_description,
                });
            });
            arrayReview = arrayReview.map((e) => {
                let x = workersId.pop();
                let y = clientsId.pop();
                let z = offersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerIdWorker: x.dataValues.idWorker, userClientIdClient: y.dataValues.idClient, offerIdOffer: z.dataValues.idOffer });
            });
            let arrayReviewDb = yield (arrayReview === null || arrayReview === void 0 ? void 0 : arrayReview.filter((c) => c));
            yield Review.bulkCreate(arrayReviewDb);
        }
    });
}
exports.setReview = setReview;
