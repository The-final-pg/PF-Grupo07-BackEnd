const  passportGoogleClient = require ("passport");
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { ClientType  } from "../../types";
const { UserClient } = require ("../../db"); 

passportGoogleClient.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/google/auth/client/callback",
    passReqToCallback: true
}, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log("refreshToken", refreshToken)
    console.log("accessToken", accessToken)
    const clientFound: ClientType = await UserClient.findOne({where: {googleId: profile.id}})
    if(!clientFound){
        const client = await UserClient.create({
            googleId: profile.id,
            user_mail: profile.emails[0].value,
            name: profile.displayName
        })
        if(client) return done(null, client)
    } else{
        return done(null, clientFound)
    }
    return done(null, profile)
}

    ));
    
    
    passportGoogleClient.serializeUser((user: any, done) => {
        done(null, user);
    });
    
    
    passportGoogleClient.deserializeUser((user: any, done) => {
        done(null, user);
    });               
    
    
    export default passportGoogleClient;





    
    
    /* passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }));




    /* console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
    console.log("auth con google", (JSON.stringify(profile)))
    const client = {...profile};
    return done(null, client) */
    /* const client: ClientType = await UserClient.findOne({where : { user_mail : profile.user_mail[0].value }})
    console.log("entre a strategy google client")
    if(client) {
            done(null, profile)
        } else {
            const clientGoogle = await UserClient.create({
                name: profile.displayName,
                user_mail : profile.user_mail[0].value, 
                id: profile.id,
            })
            UserClient.save(clientGoogle)
            done(null, profile)
        } */
        /* const client: ClientType = await UserClient.findOrCreate({ where: {user_mail : profile.user_mail[0].value }})
        console.log("clientgoogle", client)  
        return client   */
     