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
            //recibe de los input los parametros
            usernameField: "user_mail", //"user_mail" es el input.name del form
            passwordField: "password" //lo que hace passport por atras --> let user_mail = usernameField
        }, async (user_mail, password, done) => { //la function recibe por paramatros al user_mail, password y done es una funcion de resolucion 
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
                /* bcrypt.compare(password, worker.password, (error, result) => {
                    if (error) return done(error)
                    if (!result) {
                        return done(null, false)//si tiene una discrepancia de pw devuelve null y false para el result.
                    } else {
                        return done (null, {id: worker.id})//si coincide, devuelve null para el error y el usuario para el result.
                    } */            
            } catch (e){
                return done(e, false) //si no encontro ningun usuario, devuelve result en false y el error que corresponda
            }
        }
    )
)


// serializacion y deserializacion de worker
passport.serializeUser((user, done) => { // user = client || user = worker
    done(null, user);
});
  
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
 
passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, SECRET_KEY, function (err, user) {
        if (err) return done(err);
        console.log('Estoy ene l verify', token )
        return done(null, user ? user : false);
      });
    })
  ); 


/* // serializacion y deserializacion de client
passport.serializeUser((client: any, done) => {
    done(null, client.id);
});
  
passport.deserializeUser(async (id, done) => {
    try{
        const client = await UserClient.findOne({ where: { id } })
        if (client) done(null, client);
    }catch(e){
        done(e, null);
    }
});
 */

export default passport;
