import axios from "axios";
const { ACCESS_TOKEN } = process.env;
import mercadopago from "mercadopago";

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

  async createSubscription(_form:any) {
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

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

export default PaymentService;
