import express, { NextFunction, Request, Response } from "express";
const log = express.Router();
const passport = require("passport");
/* const bcrypt = require("bcrypt"); */
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// el urlencoded es para que lo que viene por body lo recibamos como string o array
log.use(express.urlencoded({ extended: true }))

log.post("/login", async (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate(
        "local",
        { session: false },
        async (error, user) => {
            if(error) return next(error);
            else if(!user) return res.json("Inserte un token válido");
            else {
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

log.get("/logout", (req:any,res:Response) => {
    req.logOut();
    req.session = null;
    res.send("Sesión finalizada")
})

