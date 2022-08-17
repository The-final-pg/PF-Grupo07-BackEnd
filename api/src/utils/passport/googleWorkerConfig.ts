const passportGoogleWorker = require ("passport");
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { WorkerType } from "../../types";
const { UserWorker } = require ("../../db");

passportGoogleWorker.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/google/auth/worker/callback",
    passReqToCallback: true
    /* response_type: "code" */
}, async (accessToken: any, refreshToken: any, profile: any, done) => {
    console.log("refreshToken", refreshToken)
    console.log("accessToken", accessToken)
    const workerFound: WorkerType = await UserWorker.findOne({where: {googleId: profile.id}})
    if(!workerFound){
        const worker = await UserWorker.create({
            googleId: profile.id,
            user_mail: profile.emails[0].value,
            name: profile.displayName
        })
        if(worker) return done(null, worker)
    } else{
        return done(null, workerFound)
    }
    return done(null, profile)
}))











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

passportGoogleWorker.serializeUser((user: any, done) => {
    done(null, user);
});


passportGoogleWorker.deserializeUser((user: any, done) => {
    done(null, user);
});               


export default passportGoogleWorker

























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