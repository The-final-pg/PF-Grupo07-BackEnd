import { NextFunction, Request, Response } from "express";

class PaymentController {
    subscriptionService:any
    constructor(subscriptionService:any) {
      this.subscriptionService = subscriptionService;
    }
    
    async getPaymentLink(req:Request, res:Response, _next:NextFunction) {
      try {
        this.subscriptionService.createPayment(req.body)
        .then((payment:any)=>{
            return res.json(payment);
        })
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
  
    async getSubscriptionLink(req:Request, res:Response, _next:NextFunction) {
      try {
        const subscription = await this.subscriptionService.createSubscription(req.body);
        res.json(subscription);
        return subscription;
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }
  
export default PaymentController;
