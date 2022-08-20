import express, { NextFunction, Request, Response } from "express";
const auth = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
const { UserWorker, UserClient } = require("../db");

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
            // llevar a la ruta que lo hace elegir entre worker y client y despues crearlo
            res.send ('usuario no encontrado' )
        }


    } catch(error){
        next(error)
    }
})

auth.post("/client")

auth.post("/worker")



export default auth