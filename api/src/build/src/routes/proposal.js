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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proposalController_1 = require("../controllers/proposalController");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
const { UserWorker, Proposal, UserClient, Offer } = require('../db');
const proposal = express_1.default.Router();
proposal.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { idWorker, idOffer } = _a, proposal = __rest(_a, ["idWorker", "idOffer"]);
    try {
        let response;
        response = yield (0, proposalController_1.postNewProposal)(proposal, idOffer, idWorker);
        const offer = yield Offer.findByPk(idOffer, {
            include: [UserClient]
        });
        const offerJson = offer.toJSON();
        nodemailerConfig_1.default.sendMail({
            from: `"REWork" <${REWORK_MAIL}>`,
            to: offerJson.userClient.user_mail,
            subject: "¡Tu oferta de trabajo ha recibido una propuesta!",
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
                        <h1>¡Felicitaciones, tu oferta de trabajo: ${offerJson.title} recibió una nueva propuesta!</h1>
                        <h2>Accede en el detalle de tu oferta o a través del siguiente link.</h2>
                        <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${offerJson.idOffer}">Ver oferta</a>
                        <!-- Gracias -->
        
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
    catch (error) {
        next(error);
    }
}));
proposal.put("/state", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state } = req.body;
    try {
        const proposalState = yield (0, proposalController_1.putProposalState)(id, state);
        const proposal = yield Proposal.findByPk(id, {
            include: [UserWorker, { model: Offer, include: UserClient }]
        });
        const proposalJson = proposal.toJSON();
        console.log("el user client: ", proposalJson);
        if (state === "accepted") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "¡Tu propuesta de trabajo fue aceptada!",
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
                            <h1>¡Felicitaciones, aceptaron tu propuesta en la oferta: ${proposalJson.offer.title}!</h1>
                            <h2>Sólo falta que leas y aceptes el contrato en el siguiente link.</h2>
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/contract/${proposalJson.offer.idOffer}">Contrato</a>
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${proposalJson.offer.idOffer}">Ver oferta</a>
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
            res.send(proposalState);
        }
        else if (state === "rejected") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "La oferta a la que aplicaste se cerró",
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
                            <h1>La oferta: ${proposalJson.offer.title} a la que habías aplicado una propuesta, ha finalizado.</h1>
            
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${proposalJson.offer.idOffer}">Ver oferta</a>
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
            res.send(proposalState);
        }
        else if (state === "cancelled") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "Has cancelado tu propuesta",
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
                            <h1>Lamentamos que hayas cancelado tu propuesta</h1>
                            <h2>¡No te desanimes! Dirígete a nuestra página principal para aplicar a otras fabulosas ofertas</h2>
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/home">Ver ofertas</a>
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
            res.send(proposalState);
        }
        else if (state === "contract accepted") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.offer.userClient.user_mail,
                subject: "Firma de contrato",
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
                            <h1>¡Hola! Solo falta firmar el contrato para que el freelancer pueda comenzar su trabajo, puedes ingresar a través del siguiente link</h1>
            
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/contract/${proposalJson.offer.idOffer}">Click aquí</a>
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
            res.send(proposalState);
        }
        else if (state === "contract started") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "Todo listo para empezar",
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
                            <h1>¡Buenas noticias, ya puedes comenzar el trabajo!</h1>
                              <h3>Te brindamos los datos del cliente para que puedas ponerte en contacto:
                              Nombre: ${proposalJson.offer.userClient.name}
                              Mail: ${proposalJson.offer.userClient.user_mail} </h3>

                              <!-- Detalle de la oferta de empleo en el siguiente link -->
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${proposalJson.offer.idOffer}">Ir a la oferta</a>
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
            res.send(proposalState);
        }
        else if (state === "contract cancelled") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userClient.user_mail,
                subject: "El contrato ha sido rechazado",
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
                            <h1>El freelancer rechazó el contrato.</h1>
                              <h2>¡No te desanimes! Tu publicación sigue visible para los freelancers, puedes aceptar otra propuesta</h2>

                              Chequea tu oferta en el siguiente link
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${proposalJson.offer.idOffer}">Click aquí</a>
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
            res.send(proposalState);
        }
        else if (state === "contract rejected") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "El contrato ha sido rechazado",
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
                              <h1>Lamentamos que el cliente haya rechazado el contrato</h1>
                                <h2>¡No te desanimes! Dirígete a la página principal para buscar nuevas ofertas.</h2>
  
                              <!-- Gracias -->
              
                              <!-- Botón -->
                              <a class="claseBoton" href="https://re-work-ten.vercel.app/home">Ver ofertas</a>
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
            res.send(proposalState);
        }
        else if (state === "finalized") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.offer.userClient.user_mail,
                subject: "¡Trabajo finalizado!",
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
                            <h1>¡Buenas noticias, el freelancer ha marcado el trabajo como finalizado!</h1>
                              <h2>Si estás conforme con el resultado, por favor dirígete a tu oferta para marcarla como finalizada.</h2>

                              <!-- Link para ir a tu oferta, recuerda estar logueado.  -->
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/detailOffer/${proposalJson.offer.idOffer}">Ir a la oferta</a>
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
            res.send(proposalState);
        }
        else if (state === "released payment") {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposalJson.userWorker.user_mail,
                subject: "¡Buenas noticias, tienes un pago disponible!",
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
                            <h1>¡Buenas noticias, el pago ya ha sido transferido a tu cuenta!</h1>
                              
                              <h2>Sigue aplicando a más ofertas.</h2>
                            <!-- Gracias -->
            
                            <!-- Botón -->
                            <a class="claseBoton" href="https://re-work-ten.vercel.app/home">Click aquí</a>
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
            res.send(proposalState);
        }
    }
    catch (error) {
        next(error);
    }
}));
proposal.put("/isActive", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isActive } = req.body;
    try {
        const proposalState = yield (0, proposalController_1.putProposalIsActive)(id, isActive);
        res.send(proposalState);
    }
    catch (error) {
        next(error);
    }
}));
proposal.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { remuneration, proposal_description, worked_time } = req.body;
    try {
        const proposalUpdate = yield (0, proposalController_1.updateProposalWorkerPremium)(id, remuneration, proposal_description, worked_time);
        res.json(proposalUpdate);
    }
    catch (error) {
        next(error);
    }
    ;
}));
proposal.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proposal = yield (0, proposalController_1.getProposalById)(id);
        return res.json(proposal);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = proposal;
