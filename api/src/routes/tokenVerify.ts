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
        if (date < expDate && (expDate - date ) < 570 || expDate < date && (date - expDate) < 900 ) {
            //devuelve 'renew' al front para renovar el token
            res.send('renew')
        //si la fecha de expiracion es mayor    a la actual por más de 15 minutos
        } else if ( expDate < date && date - expDate > 900){
            //devuelve 'destroy' al front para destruir el token
            res.send('destroy')
        //si la fecha de expiracion es menor a la actual por mas de 30 minutos
        } else if ( date < expDate && (expDate - date ) > 570){
            //devuelve 'valid' al front para no modificar el token
            res.send('valid')
        }
    } catch (error) {
        next(error)
    }
})

tokenVerify.post("/renew", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const newToken = req.body
        const renewedToken = await jwt.sign(
                {
                    id: newToken.id,
                    user_mail: newToken.user_mail,
                    isAdmin: newToken.isAdmin,
                    isWorker: newToken.isWorker,
                    premium: newToken.premium,
                    superAdmin: newToken.superAdmin,
                    exp: newToken.exp
                },
                SECRET_KEY
            )
        res.send(renewedToken)
    } catch (error){
        next(error);
    }
})

export default tokenVerify