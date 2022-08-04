const passport = require("passport");
import { Strategy as LocalStrategy } from 'passport-local'
const bcrypt = require("bcrypt");
require("dotenv").config();
/* const {SECRET_KEY} = process.env; */
const { UserWorker, UserClient } = require ("../../db");

//Verificacion de usuario para log in
passport.use(
    new LocalStrategy(
        {
            //recibe de los input los parametros
            usernameField: "user_mail", //"user_mail" es el input.name del form
            passwordField: "password" //lo que hace passport por atras --> let user_mail = usernameField
        }, async (user_mail, password, done) => { //la function recibe por paramatros al user_mail, password y done es una funcion de resolucion 
            try {
                const worker = await UserWorker.findOne({where: {user_mail: user_mail}})//busca en ambas tablas el usuario
                const client = await UserClient.findOne({where: {user_mail: user_mail}})
                if (worker){ //dependiendo del usuario realiza diferentes acciones
                    bcrypt.compare(password, worker.password, (error, result) => {
                        if (error) return done(error)
                        if (!result) {
                            return done(null, false)//si tiene una discrepancia de pw devuelve null y false para el result.
                        } else {
                            return done (null, worker)//si coincide, devuelve null para el error y el usuario para el result.
                        }
                    })
                } else if (client) {
                    bcrypt.compare(password, client.password, (error, result) => {
                        if (error) return done(error)
                        if (!result) {
                            return done(null, false)
                        } else {
                            return done (null, client)
                        }
                    })
                }
            } catch (e){
                return done(e, false) //si no encontro ningun usuario, devuelve result en false y el error que corresponda
            }
        }
    )
)
