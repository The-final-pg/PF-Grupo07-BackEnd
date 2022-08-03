import express from 'express';
import { getAllOffer, postOffer } from '../controllers/offerController';
import types from "../types"

const offer = express.Router();

offer.post('/', async (req:any,res:any,next:any) => {
    const data = req.body;
    try {
        let newOffer:String;
        newOffer = await postOffer(data);
        res.send(newOffer)
    } catch (error) {
        next(error)
    }
});

offer.get('/', async (_req:any,res:any,next:any) =>{
    try {
        const offers:Array<types.offer> = await getAllOffer();
        res.json(offers);
    } catch (error) {
        next(error);
    }
});

module.exports = offer;


