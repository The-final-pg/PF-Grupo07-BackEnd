import express, { NextFunction, Request, Response } from "express";
const login = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import session from 'express-session' //middleware
import passport from '../utils/passport/passportConfig'
import passportGoogleClient from "../utils/passport/googleClientConfig"
import passportGoogleWorker from "../utils/passport/googleWorkerConfig"


// inicializamos passport
login.use(passport.initialize())

// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express.urlencoded({ extended: true }))

// usa express session para alojarla en la consola en application Session storage
login.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
//login.use(passport.authenticate("session"))


// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", async (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate(
        "local",
        { session: false },
        async (error, user) => {
            if(error) return next(error);
            else if(!user) return res.json("Inserte un token válido");
            else if(user.isActive !== true){
                return res.status(401).send({message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo."})
            }
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
                        { expiresIn: "10m" }
                    )
                )
            }
        }
    )(req, res, next)
})


login.get("/successClient", (req: any, res: any) => {
    if(req.user){
        return res.status(200).json({
            success: true,
            message: "success",
            client: req.user,
            token: jwt.sign({
                id: req.user.id,
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: false
            }, 
            SECRET_KEY,
            { expiresIn: "10m" })
        })
    }
})

login.get("/successWorker", (req: any, res: any) => {
    if(req.user){
        return res.status(200).json({
            success: true,
            message: "success",
            worker: req.user,
            token: jwt.sign({
                id: req.user.id, 
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: true
            }, 
            SECRET_KEY,
            { expiresIn: "10m" })
        })
    }
})

login.get("/failure", (req: any, res: any) => {
    console.log("failure", req.user)
    res.status(401).json({
        success: false,
        message: "failure"
    })
})

login.post("/google/worker", passportGoogleWorker.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]})
)



login.post("/google/client", passportGoogleClient.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]})
)

login.get("/google/worker/callback", passportGoogleWorker.authenticate("google", {
    successRedirect: "/successWorker",
    failureRedirect: "/failure"
    }
))

login.get("/google/client/callback", passportGoogleClient.authenticate("google", {
    successRedirect: "/successClient",
    failureRedirect: "/failure"
    }
))


export default login

