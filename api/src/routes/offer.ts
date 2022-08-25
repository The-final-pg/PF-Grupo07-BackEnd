import express, { NextFunction, Request, Response } from "express";
import { OfferType } from "../types";
import {
  getAllOffers,
  postOffer,
  getOfferById,
  getOffersBySearch,
  putOfferState,
  putOfferIsActive,
} from "../controllers/offerController";
import {
  offerFilteredByProfession,
  offerAllFiltersOn,
  offerFilteredByRating,
  offerFilteredByRemuneration,
  offerFilteredByWorDurationTime
} from "../services/filteredSearchOffer";
import transporter from "../utils/nodemailer/nodemailerConfig";
const { REWORK_MAIL } = process.env;
const { UserWorker, Offer, Proposal }  = require ('../db');

const offer = express.Router();

offer.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const offers: Array<OfferType> = await getAllOffers();
    res.json(offers);
  } catch (error) {
    next(error);
  }
});

offer.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const { q, p, r, max, min, wdt } = req.query;
    try {
      let offers: OfferType[];
      if (q && !p && !r && !max && !min && !wdt) {
        offers = await getOffersBySearch(q as string);
      } else if (q && p && !r && !max && !min && !wdt) {
        offers = await offerFilteredByProfession(q as string, p as string);
      } else if (!q && p && !r && !max && !min && !wdt) {
        offers = await offerFilteredByProfession(q as string, p as string);
      } else if (q && !p && r && !max && !min && !wdt) {
        offers = await offerFilteredByRating(q as string, r as string);
      } else if (!q && !p && r && !max && !min && !wdt) {
        offers = await offerFilteredByRating(q as string, r as string);
      } else if (q && !p && !r && max && min && !wdt) {
        offers = await offerFilteredByRemuneration(
          q as string,
          max as string,
          min as string
        );
      } else if (!q && !p && !r && max && min && !wdt) {
        offers = await offerFilteredByRemuneration(
          q as string,
          max as string,
          min as string
        );
      } else if (q && !p && !r && !max && !min && wdt) {
        offers = await offerFilteredByWorDurationTime(q as string, wdt as string);
      } else if (!q && !p && !r && !max && !min && wdt) {
        offers = await offerFilteredByWorDurationTime(q as string, wdt as string);
      } else {
        offers = await offerAllFiltersOn(q as string, p as string, r as string, max as string, min as string, wdt as string);
      }
      res.json(offers);
    } catch (error) {
      next(error);
    }
  }
);

offer.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const offer: any = await getOfferById(id);
    let result = {
      ...offer,
      offersCount: offer.userClient.offers.length,
      workerName: offer.proposals[0]?.userWorker.name, //trae el nombre del trabajador de la primer proposal, no es util asi
    };
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

offer.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const data: OfferType = req.body;
  try {
    let newOffer: String;
    newOffer = await postOffer(data);
    res.send(newOffer);
  } catch (error) {
    next(error);
  }
});

offer.put("/state", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
      const offerState: String = await putOfferState(id, state);
      const offer:any = await Offer.findByPk(id, {
        include: [{model: Proposal, include: UserWorker}]
      })
      const offerJson = offer.toJSON()
      console.log("esto es offerJson: ", offerJson)
      const proposal = offerJson.proposals.find((e:any) => e.state === 'finalized')
      console.log("esto es proposal: ", proposal) 
      if (proposal){
        transporter.sendMail({
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
                      width: 220px;
                      height: 60px
                          background-color: #F4A261;
                          border: 2px solid #F4A261;
                          border-radius: 5px;
                          color: #ffffff; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          display: inline-block;
                          font-size: 15px;
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
        })
       return res.send(offerState);
      }
      res.send(offerState);
  } catch (error) {
    next(error);
  }
});

offer.put(
  "/isActive",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, isActive } = req.body;
    try {
        const offerState: string = await putOfferIsActive(id, isActive);
        res.send(offerState);  
    } catch (error) {
      next(error);
    }
  }
);

export default offer;
