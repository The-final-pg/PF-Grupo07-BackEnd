import express, { NextFunction, Request, Response } from "express";
import { postReviewClient, postReviewWorker } from "../controllers/reviewController";
const {UserWorker, UserClient, Offer} = require ('../db');
import transporter from "../utils/nodemailer/nodemailerConfig";
const { REWORK_MAIL } = process.env;

const review = express.Router();

review.post("/client", async (req: Request, res: Response, next: NextFunction) => {
  //recibe id del client que es destinatario de la review
  const { id, idOffer, review } = req.body;
  try {
    let response: string;
    //si la review va dirigida al Client, de ejecuta la funcion de review para clients
    response = await postReviewClient(id, idOffer, review);
    const client = await UserClient.findByPk(id);
    const clientJson = client.toJSON();
    const offer = await Offer.findByPk(idOffer);
    const offerJson = offer.toJSON();
    if (response){
      transporter.sendMail({
    from: `"REWork" <${REWORK_MAIL}>`,
      to: clientJson.user_mail, 
      subject: "Tenes una nueva Review",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
          <style>
              p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
              h1{ font-size: 30px !important;}
              h2{ font-size: 25px !important;}
              h3{ font-size: 18px !important;}
              h4{ font-size: 16px !important;}
              p{font-size: 15px !important;}
              a{font-size: 30px !important;}
      
              .claseBoton{
                  width: 30%;
                      background-color: #fcae3b;
                      border: 2px solid #fcae3b;
                      color: black; 
                      padding: 16px 32px;
                      text-align: center;
                      text-decoration: none;
                      font-weight: bold;
                      display: inline-block;
                      font-size: 16px;
                      margin: 4px 2px;
                      transition-duration: 0.4s;
                      cursor: pointer;
              }
              .claseBoton:hover{
                  background-color: #000000;
                  color: #ffffff;
              }
              .imag{
                  width: 20px;
                  height: 20px;
              }
              .contA{
                  margin: 0px 5px 0 5px;
              }
              .afooter{
                  color: #ffffff !important; 
                  text-decoration: none;
                  font-size: 13px !important;
              }
          </style>
      </head>
      <body>
          <div style="width: 100%; background-color: #e3e3e3;">
              <div style="padding: 20px 10px 20px 10px;">
                  <!-- Contenido principal -->
                  <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                      <h1>¡Has recibido una nueva review!</h1>
                      <p>Para leerla dirígete a tu perfil en este link (recuerda estar logueado): </p>
                      <a class="claseBoton" href="http://localhost:3000/myProfile">Click aquí</a>
                      <!-- Gracias -->
      
                      <!-- Botón -->
                      <a class="claseBoton" href="http://localhost:3000/detailOffer/${offerJson.idOffer}">Click aquí para ir a la oferta</a>
                  </div>
                  <!-- Contenido principal -->
      
                  <!-- Footer -->
                  <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                      <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                          © 2022 REwork, todos los derechos reservados.
                      </p>
                  </div>
                  <!-- Footer -->
      
              </div>
          </div>
      </body>
      </html>`
    })
    res.json(response);
}
  } catch (error) {
    next(error);
  }
});

review.post("/worker", async (req: Request, res: Response, next: NextFunction) => {
  //recibe id del worker qeu es destinatario de la review
  const { id, idOffer, review } = req.body;

  try {
    let response: string;
    //si la review va dirigida al Worker, de ejecuta la funcion de review para workers
    response = await postReviewWorker(id, idOffer, review);
    const worker = await UserWorker.findByPk(id);
    const workerJson = worker.toJSON();
    const offer = await Offer.findByPk(idOffer);
    const offerJson = offer.toJSON();
    if(response){
      transporter.sendMail({
        from: `"REWork" <${REWORK_MAIL}>`,
          to: workerJson.user_mail, 
          subject: "Tenes una nueva Review",
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
              <style>
                  p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
                  h1{ font-size: 30px !important;}
                  h2{ font-size: 25px !important;}
                  h3{ font-size: 18px !important;}
                  h4{ font-size: 16px !important;}
                  p{font-size: 15px !important;}
                  a{font-size: 30px !important;}
          
                  .claseBoton{
                      width: 30%;
                          background-color: #fcae3b;
                          border: 2px solid #fcae3b;
                          color: black; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          font-weight: bold;
                          display: inline-block;
                          font-size: 16px;
                          margin: 4px 2px;
                          transition-duration: 0.4s;
                          cursor: pointer;
                  }
                  .claseBoton:hover{
                      background-color: #000000;
                      color: #ffffff;
                  }
                  .imag{
                      width: 20px;
                      height: 20px;
                  }
                  .contA{
                      margin: 0px 5px 0 5px;
                  }
                  .afooter{
                      color: #ffffff !important; 
                      text-decoration: none;
                      font-size: 13px !important;
                  }
              </style>
          </head>
          <body>
              <div style="width: 100%; background-color: #e3e3e3;">
                  <div style="padding: 20px 10px 20px 10px;">
                      <!-- Contenido principal -->
                      <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                          <h1>¡Has recibido una nueva review!</h1>
                          <p>Para leerla dirígete a tu perfil en este link (recuerda estar logueado): </p>
                          <a class="claseBoton" href="http://localhost:3000/myProfile">Click aquí</a>
                          <!-- Gracias -->
          
                          <!-- Botón -->
                          <a class="claseBoton" href="http://localhost:3000/detailOffer/${offerJson.idOffer}">Click aquí para ir a la oferta</a>
                      </div>
                      <!-- Contenido principal -->
          
                      <!-- Footer -->
                      <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                              © 2022 REwork, todos los derechos reservados.
                          </p>
                      </div>
                      <!-- Footer -->
          
                  </div>
              </div>
          </body>
          </html>`
        })
        res.json(response);
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default review;