import express, { NextFunction, Request, Response } from "express";
import types from "../types"
import {getAllOffers, postOffer, getOfferById} from "../controllers/offerController"

const offer = express.Router();

offer.get('/', async (_req:Request,res:Response,next:NextFunction) =>{
    try {
        const offers:Array<types.offer> = await getAllOffers();
        res.json(offers);
    } catch (error) {
        next(error);
    }
});

offer.post("/", async (req:Request,res:Response,next:NextFunction) => {
    const data = req.body;
    try {
        let newOffer:String;
        newOffer = await postOffer(data);
        res.send(newOffer)
    } catch (error) {
        next(error)
    }
})

offer.get("/:idClient", async (req:Request, res:Response, next:NextFunction) =>{
    const {idOffer} = req.params;
    try {
        if(idOffer){
                const offer:types.offer = await getOfferById(idOffer);
                return res.json(offer);
        }else{
                throw new Error("id was not found")
        }
    } catch (error) {
        next(error)
    }
})

export default offer;
