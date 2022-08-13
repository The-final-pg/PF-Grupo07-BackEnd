import express, { Request, Response, NextFunction } from "express";
const tokenVerify = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import passport from '../utils/passport/passportConfig'
import session from 'express-session'

// inicializamos passport
tokenVerify.use(passport.initialize())

// el urlencoded es para que lo que viene por body lo recibamos como string o array
tokenVerify.use(express.urlencoded({ extended: true }))

// usa express session para alojarla en la consola en application Session storage
tokenVerify.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

tokenVerify.get("/:expDate", async (req: Request, res: Response, next: NextFunction) => {
    //expDate recibe la fecha de expiracion del token en segundos
    const expDate: any = req.params.expDate
    try {
        //se genera en date la fecha actual en segundos
        const date = new Date().getTime()/1000
//si la fecha actual es mayor a la de expiracion por mas de 30 minutos O si fecha expiracion mayor a fecha actual por menos de 15 minutos
        if (date >= expDate && (expDate - date ) <= 1800 || expDate >= date && (expDate - date) <= 900 ) {
            //devuelve 'renew' al front para renovar el token
            res.send('renew')
        //si la fecha de expiracion es mayor a la actual por más de 15 minutos
        } else if ( expDate < date && date > (expDate + 900)){
            //devuelve 'destroy' al front para destruir el token
            res.send('destroy')
        //si la fecha de expiracion es menor a la actual por mas de 30 minutos
        } else if ( expDate > (date + 1800)){
            //devuelve 'valid' al front para no modificar el token
            res.send('valid')
        }
    } catch (error) {
        next(error)
    }
})

tokenVerify.post("/renew/", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const newToken: any = req.body.newToken
        console.log('entre a la async funct', newToken)
        const renewedToken = await jwt.sign(
                {
                    id: newToken.id,
                    user_mail: newToken.user_mail,
                    isAdmin: newToken.isAdmin,
                    isWorker: newToken.isWorker,
                    exp: newToken.exp
                },
                SECRET_KEY
            )
        res.send(renewedToken)
    } catch (error){
        next(error);
    }
})



/* tokenVerify.post("/renew/:newToken", async (req: Request, res: Response, next: NextFunction) =>{
    passport.authenticate(
        "local",
        { session: false },
        async (error, token) => {
            const newToken: any = req.params.newToken
            console.log('entre a la async funct', newToken)
            console.log('AAAAAAAAAAAAAA -> ', token)
            if(error) return next(error);
            else if(newToken.isActive !== true){
                return res.status(401).send({message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo."})
            }
            else {
                console.log("me fui al else")
                return res.send(
                    await jwt.sign(
                        {
                            id: newToken.id,
                            user_mail: newToken.user_mail,
                            isAdmin: newToken.isAdmin,
                            isWorker: newToken.isWorker,
                            exp: newToken.exp
                        },
                        SECRET_KEY
                    )
                )
            }
        }
    )(req, res, next)
})
 */

export default tokenVerify