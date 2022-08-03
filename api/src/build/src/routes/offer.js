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
const offer = express_1.default.Router();
offer.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield (0, offerController_1.getAllOffers)();
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
offer.get("/:idClient", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOffer } = req.params;
    try {
        if (idOffer) {
            const offer = yield (0, offerController_1.getOfferById)(idOffer);
            return res.json(offer);
        }
        else {
            throw new Error("id was not found");
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = offer;
