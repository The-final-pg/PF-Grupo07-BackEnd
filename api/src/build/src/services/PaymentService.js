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
const axios = require("axios");
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: ACCESS_TOKEN
});
class PaymentService {
    createPayment(form) {
        return __awaiter(this, void 0, void 0, function* () {
            //const url = "https://api.mercadopago.com/checkout/preferences";
            const { name, lastname, Email, cost } = form;
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
                    failure: "/failure",
                    pending: "/pending",
                    success: "/success"
                }
            };
            const response = yield mercadopago.preferences.create(preference);
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
    createSubscription(_form) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://api.mercadopago.com/preapproval";
            const body = {
                reason: "Suscripción de ejemplo",
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 10,
                    currency_id: "ARS"
                },
                back_url: "https://google.com.ar",
                payer_email: "test_user_66888897@testuser.com"
            };
            const subscription = yield axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });
            return subscription.data;
        });
    }
}
module.exports = PaymentService;
