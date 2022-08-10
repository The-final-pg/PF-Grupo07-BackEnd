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
exports.putProposalState = exports.postNewProposal = void 0;
const { Proposal, Offer } = require("../db");
function postNewProposal(proposal, idOffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const offer = yield Offer.findByPk(idOffer);
        const newProposal = yield Proposal.create(proposal);
        yield offer.addProposal(newProposal);
        return "Propuesta publicada exitosamente";
    });
}
exports.postNewProposal = postNewProposal;
function putProposalState(id, state) {
    return __awaiter(this, void 0, void 0, function* () {
        const proposalState = yield Proposal.findAll({
            where: {
                id: id,
            },
        });
        if (proposalState.state === "rejected") {
            return "Flaco la quedaste";
        }
        else {
            yield Proposal.update({ state: state }, {
                where: {
                    id: id,
                },
            });
            return "state updated";
        }
    });
}
exports.putProposalState = putProposalState;
