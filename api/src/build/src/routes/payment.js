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
const PaymentController_1 = __importDefault(require("../controllers/PaymentController"));
const PaymentService_1 = __importDefault(require("../services/PaymentService"));
const axios_1 = __importDefault(require("axios"));
const { UserWorker } = require("../db");
const paymentInstance = new PaymentController_1.default(new PaymentService_1.default());
// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
payment.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        "/payment": "generates a payment link",
        "/subscription": "generates a subscription link"
    });
}));
payment.post("/payment", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    paymentInstance.getPaymentLink(req, res, _next);
}));
payment.post("/subscription", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = paymentInstance.getSubscriptionLink(req, res, _next);
    if (subscription) {
        console.log("entro piola");
        const { id } = req.body;
        yield UserWorker.update({ premium: true }, {
            where: {
                id: id
            }
        });
    }
}));

payment.post("/notificationIPN", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const topic = req.query.topic;
        const response = yield axios_1.default.get(`https://api.mercadopago.com/merchant_orders/${id}/APP_USR-2475260180747604-081820-6a99fd4d1246c40d04f0cd9e997cda8a-1182295464`);
        console.log(response);
        res.json({ response, topic });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = payment;
