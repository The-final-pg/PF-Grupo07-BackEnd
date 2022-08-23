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
const axios_1 = __importDefault(require("axios"));
const { ACCESS_TOKEN } = process.env;
const mercadopago_1 = __importDefault(require("mercadopago"));
const { UserWorker } = require("../db");
mercadopago_1.default.configure({
    access_token: ACCESS_TOKEN
});
class PaymentService {
    createPayment(form) {
        return __awaiter(this, void 0, void 0, function* () {
            //const url = "https://api.mercadopago.com/checkout/preferences";
            const { name, lastname, Email, cost, currentOffer } = form;
            const preference = {
                payer_email: Email,
                items: [
                    {
                        title: "Pago N#4452172",
                        description: `Pago retenido por trabajo para ${name} ${lastname}`,
                        picture_url: "http://www.myapp.com/myimage.jpg",
                        category_id: "category123",
                        quantity: 1,
                        unit_price: cost
                    }
                ],
                back_urls: {
                    failure: "http://localhost:3000/failure",
                    pending: "http://localhost:3000/pending",
                    success: `http://localhost:3000/success/${currentOffer.idOffer}`
                }
            };
            const response = yield mercadopago_1.default.preferences.create(preference);
            const preferenceId = response.body.id;
            return preferenceId;
            //     mercadopago.preferences
            //   .create(preference)
            //   .then(function (response) {
            //     const preferenceId = response.body.id
            //     return preferenceId
            //   })
            // const payment = await axios.post(url, preference, {
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            //   }
            // });
        });
    }
    createSubscription(form) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://api.mercadopago.com/preapproval";
            const { Email, id } = form;
            console.log(Email);
            const body = {
                reason: "REwork Premium",
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 100000,
                    currency_id: "ARS"
                },
                back_url: "https://rework-xi.vercel.app/home",
                payer_email: Email,
                payer_name: id
            };
            const subscription = yield axios_1.default.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });
            //aca me guardo los datos
            UserWorker.update({
                IdPayment: subscription.data.payer_id
            }, {
                where: {
                    id: id
                }
            });
            return subscription.data;
        });
    }
    getMPInfo(response) {
        return __awaiter(this, void 0, void 0, function* () {
            let information;
            let id_payment;
            if (response.hasOwnProperty("entity")) {
                information = yield axios_1.default.get(`https://api.mercadopago.com/${response.entity}/${response.data.id}?access_token=${process.env.ACCESS_TOKEN}`);
                id_payment = information.payer_id;
            }
            else {
                information = yield axios_1.default.get(`https://api.mercadopago.com/v1/${response.type}s/${response.data.id}?access_token=${process.env.ACCESS_TOKEN}`);
                id_payment = information.payer.email;
            }
            const worker = yield UserWorker.findOne({ where: {
                    IdPayment: id_payment
                } });
            if (worker) {
                worker.set({ premium: true });
                yield worker.save();
            }
            return worker;
        });
    }
}
/*"payer": {
    "email": "test_user_955808@testuser.com",
    "entity_type": null,
    "first_name": null,
    "id": "1182290827",
    "identification": {
      "number": "23011111114",
      "type": "CUIL"
    },*/
/*"payer": {
    "email": "test_user_955808@testuser.com",
    "entity_type": null,
    "first_name": null,
    "id": "1182290827",
    "identification": {
      "number": "23011111114",
      "type": "CUIL"
    },*/
exports.default = PaymentService;
