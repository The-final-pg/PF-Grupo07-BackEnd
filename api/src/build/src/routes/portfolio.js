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
const portfolioController_1 = require("../controllers/portfolioController");
const portfolio = express_1.default.Router();
portfolio.post("/:idWorker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idWorker = req.params.idWorker;
    const portfolio = req.body;
    try {
        let response;
        response = yield (0, portfolioController_1.postNewPortfolio)(portfolio, idWorker);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = portfolio;
