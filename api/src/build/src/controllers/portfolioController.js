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
exports.postNewPortfolio = void 0;
const { Portfolio, UserWorker } = require("../db");
function postNewPortfolio(portfolio, idWorker) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = UserWorker.findByPk(idWorker);
        const newPortfolio = yield Portfolio.create(portfolio);
        yield worker.addPortfolio(newPortfolio);
        return "Portfolio agregado con éxito";
    });
}
exports.postNewPortfolio = postNewPortfolio;
