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
exports.putProposalIsActive = exports.putProposalState = exports.postNewProposal = void 0;
const { Proposal, Offer, UserWorker } = require("../db");
function postNewProposal(proposal, idOffer, idWorker) {
    return __awaiter(this, void 0, void 0, function* () {
        const offer = yield Offer.findByPk(idOffer);
        const worker = yield UserWorker.findByPk(idWorker);
        const newProposal = yield Proposal.create(proposal);
        yield offer.addProposal(newProposal);
        yield worker.addProposal(newProposal);
        return "Propuesta publicada exitosamente";
    });
}
exports.postNewProposal = postNewProposal;
function putProposalState(id, state) {
    return __awaiter(this, void 0, void 0, function* () {
        const proposalState = yield Proposal.findOne({
            where: {
                idProposal: id,
            },
        });
        if (!proposalState) {
            throw new Error(`La propuesta ${id} no existe en la base de datos`);
        }
        if (proposalState.state === "rejected") {
            return "La propuesta fue rechazada y no puede cambiar de estado";
        }
        else {
            yield Proposal.update({ state: state }, {
                where: {
                    idProposal: id,
                },
            });
            console.log(proposalState);
            if (state === "finalized") {
                yield UserWorker.update({ counter_jobs: +1 }, {
                    where: {
                        id: proposalState.userWorkerId,
                    }
                });
            }
            return "state updated";
        }
    });
}
exports.putProposalState = putProposalState;
;
function putProposalIsActive(id, isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        const proposalState = yield Proposal.findOne({
            where: {
                idProposal: id,
            },
        });
        if (!proposalState) {
            throw new Error(`La propuesta ${id} no existe en la base de datos`);
        }
        yield Proposal.update({ isActive: isActive }, {
            where: {
                idProposal: id,
            },
        });
        return "state updated";
    });
}
exports.putProposalIsActive = putProposalIsActive;
