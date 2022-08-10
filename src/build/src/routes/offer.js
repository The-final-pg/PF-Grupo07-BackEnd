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
const express_1 = __importDefault(require("express"));
const offerController_1 = require("../controllers/offerController");
const filteredSearchOffer_1 = require("../services/filteredSearchOffer");
const offer = express_1.default.Router();
offer.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*   const multiplier: number = req.body.multiplier; */
    try {
        const offers = yield (0, offerController_1.getAllOffers)( /* multiplier */);
        res.json(offers);
    }
    catch (error) {
        next(error);
    }
}));
offer.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        let newOffer;
        newOffer = yield (0, offerController_1.postOffer)(data);
        res.send(newOffer);
    }
    catch (error) {
        next(error);
    }
}));
offer.get("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, p, r, max, min } = req.query;
    /*   const multiplier: number = req.body.multiplier; */
    try {
        let offers;
        if (q && !p && !r && !max && !min) {
            offers = yield (0, offerController_1.getOffersBySearch)(q /* , multiplier */);
        }
        else if (q && p && !r && !max && !min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByProfession)(q, p /* , multiplier */);
        }
        else if (!q && p && !r && !max && !min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByProfession)(q, p /* , multiplier */);
        }
        else if (q && !p && r && !max && !min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRating)(q, r /* , multiplier */);
        }
        else if (!q && !p && r && !max && !min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRating)(q, r /* , multiplier */);
        }
        else if (q && !p && !r && max && min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRemuneration)(q, max, min /* , multiplier */);
        }
        else if (!q && !p && !r && max && min) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRemuneration)(q, max, min /* , multiplier */);
        }
        else {
            offers = yield (0, filteredSearchOffer_1.offerAllFiltersOn)(q, p, r, max, min /* , multiplier */);
        }
        res.json(offers);
    }
    catch (error) {
        next(error);
    }
}));
offer.get("/:idOffer", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { idOffer } = req.params;
    try {
        const offer = yield (0, offerController_1.getOfferById)(idOffer);
        let result = Object.assign(Object.assign({}, offer), { offersCount: offer.userClient.offers.length, workerName: (_a = offer.proposals[0]) === null || _a === void 0 ? void 0 : _a.userWorker.name });
        return res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
offer.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state } = req.body;
    try {
        if (id && state) {
            const offerState = yield (0, offerController_1.putOfferState)(id, state);
            res.send(offerState);
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = offer;
