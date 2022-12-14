import axios from "axios";
const { ACCESS_TOKEN } = process.env;
import mercadopago from "mercadopago";
const {UserWorker} = require("../db")

mercadopago.configure({
    access_token: ACCESS_TOKEN
});

class PaymentService {
  async createPayment(form:any) {
    //const url = "https://api.mercadopago.com/checkout/preferences";
    const {name, lastname, Email, cost, currentOffer} = form
    const preference = {
      payer_email: Email,
      items: [
        {
          title: `Pago de ${name} ${lastname}`,
          description: `Pago retenido por trabajo para ${name} ${lastname}`,
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: cost
        }
      ],
      back_urls: {
        failure: "https://re-work-ten.vercel.app/failure",
        pending: "https://re-work-ten.vercel.app/pending",
        success: `https://re-work-ten.vercel.app/success/${currentOffer.idOffer}`
      }
    };


   const response = await mercadopago.preferences.create(preference)
   const preferenceId = response.body.id
   return preferenceId
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

  }

  async createSubscription(form:any) {
    const url = "https://api.mercadopago.com/preapproval";
    const {Email, id} = form
    const body = {
      reason: "REwork Premium",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 1000,
        currency_id: "ARS"
      },
       back_url: "https://re-work-ten.vercel.app/home",
       payer_email: Email,
       payer_name: id
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    //aca me guardo los datos
    await UserWorker.update({
      IdPayment:subscription.data.payer_id.toString()
    }, {
      where:{
        id:id
      }
    })
    return subscription.data;
  }

  async getMPInfo(response:any){
    let information:any
    let id_payment:string

    if(response.action==="created") return "All works"
    if(response.hasOwnProperty("entity")){
      if (response.entity === "preapproval"){
        information = await axios.get(`https://api.mercadopago.com/${response.entity}/${response.data.id}?access_token=${process.env.ACCESS_TOKEN}`)
        id_payment = information.data.payer_id.toString();
      } else return "";
      const worker = await UserWorker.findOne({where:{
        IdPayment:id_payment
      }})
      if(worker){
        worker.set({premium:true})
        await worker.save();
      }
      return worker
    } 
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

export default PaymentService;
