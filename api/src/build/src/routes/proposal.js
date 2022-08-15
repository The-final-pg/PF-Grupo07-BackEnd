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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proposalController_1 = require("../controllers/proposalController");
const proposal = express_1.default.Router();
proposal.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const _a = req.body, { idOffer } = _a, proposal = __rest(_a, ["idOffer"]);
    try {
        let response;
        response = yield (0, proposalController_1.postNewProposal)(proposal, idOffer);
=======
    const _a = req.body, { idWorker, idOffer } = _a, proposal = __rest(_a, ["idWorker", "idOffer"]);
    console.log(idWorker, idOffer, proposal);
    try {
        let response;
        response = yield (0, proposalController_1.postNewProposal)(proposal, idOffer, idWorker);
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}));
<<<<<<< HEAD
proposal.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state } = req.body;
    try {
        if (id && state) {
            const proposalState = yield (0, proposalController_1.putProposalState)(id, state);
            res.send(proposalState);
        }
=======
proposal.put("/state", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state } = req.body;
    try {
        const proposalState = yield (0, proposalController_1.putProposalState)(id, state);
        res.send(proposalState);
    }
    catch (error) {
        next(error);
    }
}));
proposal.put("/isActive", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isActive } = req.body;
    try {
        const proposalState = yield (0, proposalController_1.putProposalIsActive)(id, isActive);
        res.send(proposalState);
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    }
    catch (error) {
        next(error);
    }
}));
exports.default = proposal;
