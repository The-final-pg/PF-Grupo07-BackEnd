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
const reviewController_1 = require("../controllers/reviewController");
const { UserWorker, UserClient, Offer } = require('../db');
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
const review = express_1.default.Router();
review.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //recibe id del client que es destinatario de la review
    const { id, idOffer, review } = req.body;
    try {
        let response;
        //si la review va dirigida al Client, de ejecuta la funcion de review para clients
        response = yield (0, reviewController_1.postReviewClient)(id, idOffer, review);
        const client = yield UserClient.findByPk(id);
        const clientJson = client.toJSON();
        const offer = yield Offer.findByPk(idOffer);
        const offerJson = offer.toJSON();
        if (response) {
            nodemailerConfig_1.default.sendMail({
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
                    background-color: #F4A261;
                    border: 2px solid #F4A261;
                    border-radius: 5px;
                    color: #ffffff; 
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
                background-color: e76f51;
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
                color: #264653 !important; 
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
                      <h2>Para leerla dirígete a tu perfil en este link (recuerda estar logueado): </h2>
                      <a class="claseBoton" href="https://re-work-ten.vercel.app/myProfile">Click aquí</a>
                      <!-- Gracias -->
      
                      <!-- Botón -->
                      <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${offerJson.idOffer}">Ver oferta</a>
                  </div>
                  <!-- Contenido principal -->
      
                  <!-- Footer -->
                  <div style="background-color: #264653; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: #264653; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                          © 2022 REwork, todos los derechos reservados.
                      </p>
                  </div>
                </div>
          </div>
      </body>
      </html>`
            });
            res.json(response);
        }
    }
    catch (error) {
        next(error);
    }
}));
review.post("/worker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //recibe id del worker qeu es destinatario de la review
    const { id, idOffer, review } = req.body;
    try {
        let response;
        //si la review va dirigida al Worker, de ejecuta la funcion de review para workers
        response = yield (0, reviewController_1.postReviewWorker)(id, idOffer, review);
        const worker = yield UserWorker.findByPk(id);
        const workerJson = worker.toJSON();
        const offer = yield Offer.findByPk(idOffer);
        const offerJson = offer.toJSON();
        if (response) {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: workerJson.user_mail,
                subject: "Tienes una nueva Review",
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
                        background-color: #F4A261;
                        border: 2px solid #F4A261;
                        border-radius: 5px;
                        color: #ffffff; 
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
                    background-color: e76f51;
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
                    color: #264653 !important; 
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
                          <h2>Para leerla dirígete a tu perfil en este link (recuerda estar logueado): </h2>
                          <a class="claseBoton" href="https://re-work-ten.vercel.app/myProfile">Click aquí</a>
                          <!-- Gracias -->
          
                          <!-- Botón -->
                          <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${offerJson.idOffer}">Ver oferta</a>
                      </div>
                      <!-- Contenido principal -->
          
                      <!-- Footer -->
                      <div style="background-color: #264653; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: #264653; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                              © 2022 REwork, todos los derechos reservados.
                          </p>
                      </div>
                    </div>
              </div>
          </body>
          </html>`
            });
            res.json(response);
        }
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = review;
