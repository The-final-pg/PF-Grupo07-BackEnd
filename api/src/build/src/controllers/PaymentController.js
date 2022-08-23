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
var mercadopago = require('mercadopago');
class PaymentController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    getPaymentLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.subscriptionService.createPayment(req.body)
                    .then((payment) => {
                    return res.json(payment);
                });
            }
            catch (error) {
                console.log(error);
                next(error);
                /*
                      return res
                        .status(500)
                        .json({ error: true, msg: "Failed to create payment" }); */
            }
        });
    }
    getSubscriptionLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield this.subscriptionService.createSubscription(req.body);
                return res.json(subscription);
            }
            catch (error) {
                console.log(error);
                next(error);
                /*  return res
                   .status(500)
                   .json({ error: true, msg: "Failed to create subscription" }); */
            }
        });
    }
    getNotification(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);
            var payment_data = {
                transaction_amount: Number(req.body.transactionAmount),
                token: req.body.token,
                description: req.body.description,
                installments: Number(req.body.installments),
                payment_method_id: req.body.paymentMethodId,
                issuer_id: req.body.issuer,
                notification_url: "http://requestbin.fullcontact.com/1ogudgk1",
                payer: {
                    email: req.body.email,
                    identification: {
                        type: req.body.docType,
                        number: req.body.docNumber
                    }
                }
            };
            mercadopago.payment.save(payment_data)
                .then(function (response) {
                res.status(response.status).json({
                    status: response.body.status,
                    status_detail: response.body.status_detail,
                    id: response.body.id
                });
            })
                .catch(function (error) {
                res.status(error.status).send(error);
            });
        });
    }
    getPaymentData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.subscriptionService.getMPInfo(req.body)
                    .then((Info) => {
                    return res.json(Info);
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = PaymentController;
