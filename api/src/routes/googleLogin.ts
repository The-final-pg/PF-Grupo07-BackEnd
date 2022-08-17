import express from "express";
const loginGoogle = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import session from 'express-session' //middleware
import passport from '../utils/passport/passportConfig'
import passportGoogleClient from "../utils/passport/googleClientConfig"
import passportGoogleWorker from "../utils/passport/googleWorkerConfig"

loginGoogle.use(passport.initialize())

loginGoogle.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

loginGoogle.get("/successClient", (req: any, res: any) => {
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

loginGoogle.get("/successWorker", (req: any, res: any) => {
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

loginGoogle.get("/failure", (req: any, res: any) => {
    console.log("failure", req.user)
    res.status(401).json({
        success: false,
        message: "failure"
    })
})

/* loginGoogle.post("/worker", passportGoogleWorker.authenticate("google", {scope: ["profile", "email"]})
)
 */


loginGoogle.post("/client", passportGoogleClient.authenticate("google", {scope: ["profile", "email"]})
)

loginGoogle.get("/worker/callback", passportGoogleWorker.authenticate("google", {
    successRedirect: "/successWorker",
    failureRedirect: "/failure"
    }
))

loginGoogle.get("/client/callback", passportGoogleClient.authenticate("google", {
    successRedirect: "/successClient",
    failureRedirect: "/failure"
    }
))


export default loginGoogle