import express, { NextFunction, Request, Response } from "express";
const payment = express.Router();
//const { SECRET_KEY, ACCESS_TOKEN } = process.env;
import PaymentController from "../controllers/PaymentController";
import PaymentService from "../services/PaymentService";

const paymentInstance = new PaymentController(new PaymentService());

// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
payment.get("/", async (_req:Request,res:Response,_next:NextFunction) => {
    return res.json({
        "/payment": "generates a payment link",
        "/subscription": "generates a subscription link"
    });
});

payment.post("/payment", async (req:Request,res:Response,_next:NextFunction) => {
    paymentInstance.getPaymentLink(req, res, _next);
});

payment.post("/subscription", async (req:Request,res:Response,_next:NextFunction) => {
    paymentInstance.getSubscriptionLink(req, res, _next);
});

export default payment

