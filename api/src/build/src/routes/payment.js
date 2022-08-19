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
const payment = express_1.default.Router();
//const { SECRET_KEY, ACCESS_TOKEN } = process.env;
const PaymentController = require("../controllers/paymentController");
const PaymentService = require("../services/PaymentService");
const paymentInstance = new PaymentController(new PaymentService());
// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
payment.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        "/payment": "generates a payment link",
        "/subscription": "generates a subscription link"
    });
}));
payment.post("/payment", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    paymentInstance.getPaymentLink(req, res);
}));
payment.post("/subscription", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    paymentInstance.getSubscriptionLink(req, res);
}));
exports.default = payment;