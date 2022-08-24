import { NextFunction, Request, Response } from "express";
var mercadopago = require('mercadopago');

class PaymentController {
    subscriptionService:any
    constructor(subscriptionService:any) {
      this.subscriptionService = subscriptionService;
    }
    
    async getPaymentLink(req:Request, res:Response, next:NextFunction) {
      try {
        this.subscriptionService.createPayment(req.body)
        .then((payment:any)=>{
            return res.json(payment);
        })
      } catch (error) {
        console.log(error);
        next(error);
  /*       next(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" }); */ 
      }
    }
  
    async getSubscriptionLink(req:Request, res:Response, next:NextFunction) {
      try {
        const subscription = await this.subscriptionService.createSubscription(req.body);
       return res.json(subscription); 
      } catch (error) {
        console.log(error);
        next(error) 
       /* /*  return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" }); */
      }
    }
    async getNotification(req:Request, res:Response, _next:NextFunction){
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
  .then(function(response:any) {
    res.status(response.status).json({
      status: response.body.status,
      status_detail: response.body.status_detail,
      id: response.body.id
    });
  })
  .catch(function(error) {
    res.status(error.status).send(error);
  });
    }

    async getPaymentData(req:Request,__res:Response,next:NextFunction){
      try {
        this.subscriptionService.getMPInfo(req.body);
      } catch (error) {
        next(error)
      }
    }
  
  
}

  
export default PaymentController;
