import express, { NextFunction, Request, Response } from "express";
const login = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import session from 'express-session' //middleware
import passport from '../utils/passport/passportConfig'

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
<<<<<<< HEAD


=======
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
//login.use(passport.authenticate("session"))


// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", async (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate(
        "local",
        { session: false },
        async (error, user) => {
            if(error) return next(error);
<<<<<<< HEAD
            else if(!user) return res.json("Inserte un token válido");
=======
            else if(!user) return res.json("invalid");
            else if(user.isActive !== true){
                return res.status(401).send({message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo."})
            }
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
            else {
                console.log("esto esta en log",user)
                return res.send(
                    await jwt.sign(
                        {
                            id: user.id,
                            user_mail: user.user_mail,
                            isAdmin: user.isAdmin,
<<<<<<< HEAD
                            isWorker: user.isWorker
                        },
                        SECRET_KEY,
                        { expiresIn: "2hr" }
=======
                            isWorker: user.isWorker,
                            premium: user.premium
                        },
                        SECRET_KEY,
                        { expiresIn: "10m" }
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
                    )
                )
            }
        }
    )(req, res, next)
})

<<<<<<< HEAD

=======
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
export default login

