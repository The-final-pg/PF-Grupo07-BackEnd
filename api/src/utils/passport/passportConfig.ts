import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy} from 'passport-http-bearer'
import bcrypt from "bcrypt";
require("dotenv").config();
import { WorkerType, ClientType  } from "../../types";
const { UserWorker, UserClient } = require ("../../db");
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

//Verificacion de usuario para log in
passport.use(
    new LocalStrategy(
        {
            //recibe de los input los parámetros
            usernameField: "user_mail", //"user_mail" es el input.name del form
            passwordField: "password", //lo que hace passport por atrás --> let user_mail = usernameField
        }, async (user_mail, password, done) => { //la function recibe por paramatros al user_mail, password y done es una función de resolución 
            try {
                const worker: WorkerType  = await UserWorker.findOne({where: {user_mail: user_mail}})//busca en ambas tablas el usuario
                const client: ClientType = await UserClient.findOne({where: {user_mail: user_mail}})
                let user: any
                if (worker){ 
                    user = worker//dependiendo del usuario realiza diferentes acciones
                }  else {
                    user = client
                } 
                console.log("estos en config", user.dataValues)
                console.log("esto es el worker", worker)
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) return done(error)
                    if (!result) {
                        return done(null, false)
                    } else {
                        return done (null, user.dataValues)
                    }
                })        
            } catch (e){
                return done(e, false) //si no encontró ningún usuario, devuelve result en false y el error que corresponda
            }
        }
    )
)


// serialización: toma el id y lo almacena en la session (para requerirla: req.session.passport.user)
passport.serializeUser((user: any, done) => { // user = client || user = worker
    done(null, user._id);
});


// deserialización: a partir del id serializado, cierra la session 
passport.deserializeUser(async (id, done) => {
    try{
        const worker = await UserWorker.findOne({ where: { id } })
        const client = await UserClient.findOne({ where: { id } })
        if (worker) {
            done(null, worker)
        } else if (client){
            done(null, client);
        };
    }catch(e){
        done(e, null);
    }
});


// estrategia para verificar el token con la sesión ya iniciada
passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, SECRET_KEY, function (err, user) {
        if (err) return done(err);
        console.log('Estoy ene l verify', token )
        return done(null, user ? user : false);
      });
    })
  ); 


export default passport;
