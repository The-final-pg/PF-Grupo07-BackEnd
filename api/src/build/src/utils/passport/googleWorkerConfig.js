"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportGoogleWorker = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
/* import { WorkerType, } from "../../types"; */
const { UserWorker } = require("../../db");
passportGoogleWorker.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/login/google/worker",
    profileFields: ["emails", "name"]
}, function (accessToken, profile, done) {
    UserWorker.findOne(profile.emails[0].value, function (error, user) {
        if (error)
            return done(error);
        else if (user) {
            return done(null, user);
        }
        else {
            const newWorker = new UserWorker();
            newWorker.google_profile_id = profile.id;
            newWorker.access_token = accessToken;
            newWorker.token = UserWorker.Token({ token: accessToken });
            newWorker.name = profile.name.givenName + ' ' + profile.name.familyName;
            newWorker.email = profile.emails[0].value;
            newWorker.save(function (error) {
                if (error)
                    throw error;
                return done(null, newWorker);
            });
        }
    });
}));
/* passportGoogleWorker.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/login/google/worker",
    profileFields: ["email", "name"]
  }, async (accessToken, refreshToken, profile:any, done:any) => {
    try {
        const worker: WorkerType  = await UserWorker.findOrCreate({where : {user_mail : profile.user_mail[0].value}}, (error:any, user:any) => {
            return done(error, user)
        })
        console.log("workergoogle", worker)
        return worker
    } catch(error){
        return error
    }
  }
));
 */
passportGoogleWorker.serializeUser((user, done) => {
    done(null, user);
});
passportGoogleWorker.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passportGoogleWorker;
//ORIGINAL
/* passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "https://rework.up.railway.app/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
        //busca en ambas tablas el usuario
        const worker: WorkerType  = await UserWorker.findOrCreate({googleId: profile.id}, (err, user) => {
            return done(err, user)
        })
        const client: ClientType = await UserClient.findOrCreate({googleId: profile.id }, (err, user) => {
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


passport.serializeUser((user: any, done) => {
    done(null, user);
});


passport.deserializeUser((user: any, done) => {
    done(null, user);
});                */ 
