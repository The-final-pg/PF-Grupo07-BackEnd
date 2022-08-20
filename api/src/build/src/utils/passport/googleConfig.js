"use strict";
/* import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { WorkerType, ClientType  } from "../../types";
const { UserWorker, UserClient } = require ("../../db");


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "https://rework.up.railway.app/auth/google/callback"
  }, async (token, userGoogle, done) => {
    try {
        //busca en ambas tablas el usuario
        const worker: WorkerType  = await UserWorker.findOrCreate({googleId: userGoogle.id}, (err, user) => {
            return done(err, user)
        })
        const client: ClientType = await UserClient.findOrCreate({googleId: userGoogle.id }, (err, user) => {
            return done(err, user)
        })
        let user: any
        if (worker){
            user = worker//dependiendo del usuario realiza diferentes acciones
        }  else {
            user = client
        }
        
    } catch(error){
        return error
    }
  }
));
 */
