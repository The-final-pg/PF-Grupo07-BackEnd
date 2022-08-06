import express, { NextFunction, Request, Response } from "express";
const login = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import passport from '../utils/passport/passportConfig'
login.use(passport.initialize())
/* login.use(passport.session()) */
// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express.urlencoded({ extended: true }))

login.post("/", async (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate(
        "local",
        { session: false },
        async (error, user) => {
            if(error) return next(error);
            else if(!user) return res.json("Inserte un token válido");
            else {
                console.log("esto esta en log",user)
                return res.send(
                    await jwt.sign(
                        {
                            id: user.id,
                            user_mail: user.user_mail,
                            isAdmin: user.isAdmin,
                            isWorker: user.isWorker
                        },
                        SECRET_KEY,
                        { expiresIn: "24hr" }
                    )
                )
            }
        }
    )(req, res, next)
})


export default login
