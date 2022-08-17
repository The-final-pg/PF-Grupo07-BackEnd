"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passportGoogleWorker = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
const { UserWorker } = require("../../db");
passportGoogleWorker.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/google/auth/worker/callback",
    passReqToCallback: true
    /* response_type: "code" */
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("refreshToken", refreshToken);
    console.log("accessToken", accessToken);
    const workerFound = yield UserWorker.findOne({ where: { googleId: profile.id } });
    if (!workerFound) {
        const worker = yield UserWorker.create({
            googleId: profile.id,
            user_mail: profile.emails[0].value,
            name: profile.displayName
        });
        if (worker)
            return done(null, worker);
    }
    else {
        return done(null, workerFound);
    }
    return done(null, profile);
})));
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
