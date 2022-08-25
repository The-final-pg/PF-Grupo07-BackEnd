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
const offerController_1 = require("../controllers/offerController");
const filteredSearchOffer_1 = require("../services/filteredSearchOffer");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
const { UserWorker, Offer, Proposal } = require('../db');
const offer = express_1.default.Router();
offer.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield (0, offerController_1.getAllOffers)();
        res.json(offers);
    }
    catch (error) {
        next(error);
    }
}));
offer.get("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, p, r, max, min, wdt } = req.query;
    try {
        let offers;
        if (q && !p && !r && !max && !min && !wdt) {
            offers = yield (0, offerController_1.getOffersBySearch)(q);
        }
        else if (q && p && !r && !max && !min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByProfession)(q, p);
        }
        else if (!q && p && !r && !max && !min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByProfession)(q, p);
        }
        else if (q && !p && r && !max && !min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRating)(q, r);
        }
        else if (!q && !p && r && !max && !min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRating)(q, r);
        }
        else if (q && !p && !r && max && min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRemuneration)(q, max, min);
        }
        else if (!q && !p && !r && max && min && !wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByRemuneration)(q, max, min);
        }
        else if (q && !p && !r && !max && !min && wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByWorDurationTime)(q, wdt);
        }
        else if (!q && !p && !r && !max && !min && wdt) {
            offers = yield (0, filteredSearchOffer_1.offerFilteredByWorDurationTime)(q, wdt);
        }
        else {
            offers = yield (0, filteredSearchOffer_1.offerAllFiltersOn)(q, p, r, max, min, wdt);
        }
        res.json(offers);
    }
    catch (error) {
        next(error);
    }
}));
offer.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const offer = yield (0, offerController_1.getOfferById)(id);
        let result = Object.assign(Object.assign({}, offer), { offersCount: offer.userClient.offers.length, workerName: (_a = offer.proposals[0]) === null || _a === void 0 ? void 0 : _a.userWorker.name });
        return res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
offer.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        let newOffer;
        newOffer = yield (0, offerController_1.postOffer)(data);
        res.send(newOffer);
    }
    catch (error) {
        next(error);
    }
}));
offer.put("/state", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state } = req.body;
    try {
        const offerState = yield (0, offerController_1.putOfferState)(id, state);
        const offer = yield Offer.findByPk(id, {
            include: [{ model: Proposal, include: UserWorker }]
        });
        const offerJson = offer.toJSON();
        console.log("esto es offerJson: ", offerJson);
        const proposal = offerJson.proposals.find((e) => e.state === 'finalized');
        console.log("esto es proposal: ", proposal);
        if (proposal) {
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: proposal.userWorker.user_mail,
                subject: "¡Buenas noticias!",
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
                            <h1>¡Buenas noticias, el trabajo finalizó exitosamente!</h1>
                            <h2>En un plazo máximo de 30 días verás reflejado el pago en tu cuenta. Recuerda que si cuentas con un usuario Premium este plazo se reduce.</h2>
                        
                            <!-- Gracias -->
                            <h3>¡Bien hecho, sigue así, ve al siguiente link para buscar nuevas ofertas!</h3>
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
            return res.send(offerState);
        }
        res.send(offerState);
    }
    catch (error) {
        next(error);
    }
}));
offer.put("/isActive", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isActive } = req.body;
    try {
        const offerState = yield (0, offerController_1.putOfferIsActive)(id, isActive);
        res.send(offerState);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = offer;
