
/* import cors from "cors";  */
import express from "express";
const loginGoogle = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import session from 'express-session' //middleware
import passport from 'passport'
import passportGoogleClient from "../utils/passport/googleClientConfig" 
import passportGoogleWorker from "../utils/passport/googleWorkerConfig" 

loginGoogle.use(passport.initialize())

// el urlencoded es para que lo que viene por body lo recibamos como string o array
loginGoogle.use(express.urlencoded({ extended: true }))

loginGoogle.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

loginGoogle.get("/successClient", (req: any, res: any) => {
    const user = req.session.passport.user
    console.log("tengo algo?", res.header)
    if(user){
        const newUser = {
            success: true,
            message: "success",
            worker: user,
            token: jwt.sign({
                id: user.id, 
                user_mail: user.user_mail,
                isAdmin: false,
                isWorker: true,
                premium: false,
                superAdmin: user.superAdmin
            }, SECRET_KEY,
            { expiresIn: "8h" })
        }
        res.send(newUser)
    }
})

loginGoogle.get("/successWorker", (req: any, res: any) => {
    const user = req.session.passport.user
    console.log("tengo algo?", user)
    /* console.log("aver esto:", req) */
    if(user){
        const newUser = {
            success: true,
            message: "success",
            worker: user,
            token: jwt.sign({
                id: user.id, 
                user_mail: user.user_mail,
                isAdmin: false,
                isWorker: true,
                premium: false,
                superAdmin: user.superAdmin
            }, SECRET_KEY,
            { expiresIn: "8h" })
        }
        res.send(newUser)
    }
})



loginGoogle.get("/failure", (req: any, res: any) => {
    console.log("failure", req.user)
    res.status(401).json({
        success: false,
        message: "failure"
    })
})

/* const corsOptions = {
    origin: "http://localhost:3000/google/"
}
loginGoogle.use(cors(corsOptions));  */
loginGoogle.get("/worker", passportGoogleWorker.authenticate("google", {scope: 
    ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"], session:false}), (req: any, _res: any) => {
    const {code} = req.query
    console.log("code", code)
    return (code)  
})



loginGoogle.post("/client", passportGoogleClient.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]})
)


loginGoogle.get("/worker/callback", passportGoogleWorker.authenticate("google", {
    successRedirect: "http://localhost:3000/google/success",
    failureRedirect: "/auth/failure"
    }
))

loginGoogle.get("/client/callback", passportGoogleClient.authenticate("google", {
    successRedirect: "http://localhost:3000/google/success",
    failureRedirect: "/auth/failure"
    }
))


export default loginGoogle