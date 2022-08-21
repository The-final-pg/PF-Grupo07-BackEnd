import express, { NextFunction, Request, Response } from "express";
const auth = express.Router();
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
const { UserWorker, UserClient } = require("../db");/* 
import { createGoogleClient, createGoogleWorker } from "../controllers/authController";
import { ClientType } from "../types"; */

auth.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const googleUser = req.body
    try {
        console.log(googleUser)
        const clientFound = await UserClient.findOne({where: {user_mail: googleUser?.user_mail}})
        const workerFound = await UserWorker.findOne({where: {user_mail: googleUser?.user_mail}})
        console.log("clien", clientFound)
        console.log("worker", workerFound)
        if(clientFound){
            return res.send(jwt.sign(
                {
                    id: clientFound.id,
                    user_mail: clientFound.user_mail,
                    isAdmin: clientFound.isAdmin,
                    isWorker: clientFound.isWorker,
                    premium: clientFound.premium
                },
                SECRET_KEY,
                { expiresIn: "8h" }
                ))
            /* res.status(200).json(clientFound)   */
        } else if(workerFound){
            return res.send(jwt.sign(
                {
                    id: workerFound.id,
                    user_mail: workerFound.user_mail,
                    isAdmin: workerFound.isAdmin,
                    isWorker: workerFound.isWorker,
                    premium: workerFound.premium
                },
                SECRET_KEY,
                { expiresIn: "8h" }
                ))
            /* res.status(200).json(workerFound) */
        } else {
            res.send ('usuario no encontrado' )
        }


    } catch(error){
        next(error)
    }
})

auth.post("/client", async(req: Request, res: Response, next: NextFunction) => {
    const newClient = req.body;
    try {
        console.log("newClient", newClient)
        const hashedPassword = await bcrypt.hash(newClient.uid, 8)
        
        const clientGoogle = await UserClient.create({
            name: newClient.name,
            password: hashedPassword,
            lastName: newClient.lastName,
            user_mail: newClient.user_mail,
            born_date: newClient.born_date,
            rating: newClient.rating,
            notification: newClient.notification,
            photo: newClient.photo,
            isActive: true,
            isAdmin: false,
            isWorker: false,
            premium: false,
        })

        res.send(clientGoogle)

        return res.send(jwt.sign(
            {
                id: clientGoogle.id,
                user_mail: clientGoogle.user_mail,
                isAdmin: clientGoogle.isAdmin,
                isWorker: clientGoogle.isWorker,
                premium: clientGoogle.premium,
                isActive: clientGoogle.isActive
            },
            SECRET_KEY,
            { expiresIn: "8h" }
            ))
    } catch(error){
        next(error)
    }
})

auth.post("/worker", async(req: Request, res: Response, next: NextFunction) => {
    const newWorker = req.body;
    try {
        console.log("newWorker", newWorker)
        const hashedPassword = await bcrypt.hash(newWorker.uid, 8)
        
        const workerGoogle = await UserWorker.create({
            name: newWorker.name,
            password: hashedPassword,
            lastName: newWorker.lastName,
            user_mail: newWorker.user_mail,
            born_date: newWorker.born_date,
            rating: newWorker.rating,
            notification: newWorker.notification,
            photo: newWorker.photo,
            isActive: true,
            isWorker: true,
            premium: false,
            isAdmin: true
        })

        res.send(workerGoogle)

        return res.send(jwt.sign(
            {
                id: workerGoogle.id,
                user_mail: workerGoogle.user_mail,
                isAdmin: workerGoogle.isAdmin,
                isWorker: workerGoogle.isWorker,
                premium: workerGoogle.premium
            },
            SECRET_KEY,
            { expiresIn: "8h" }
            ))
    } catch(error){
        next(error)
    }
})



export default auth