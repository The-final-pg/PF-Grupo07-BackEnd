const  passportGoogleClient = require ("passport");
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { ClientType  } from "../../types";
const { UserClient } = require ("../../db");

passportGoogleClient.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/login/google/client"
  }, async (/* accessToken, refreshToken, */ profile, done) => {
    try {
        const client: ClientType = await UserClient.findOne({where : { user_mail : profile.user_mail[0].value }})
        if(client) {
            done(null, profile)
        } else {
            await UserClient.create({user_mail : profile.user_mail[0].value})
            done(null, profile)
        }
        /* const client: ClientType = await UserClient.findOrCreate({ where: {user_mail : profile.user_mail[0].value }})
        console.log("clientgoogle", client)  
        return client   */
    } catch(error){
        return error
    }
  }
));


passportGoogleClient.serializeUser((user: any, done) => {
    done(null, user);
});


passportGoogleClient.deserializeUser((user: any, done) => {
    done(null, user);
});               


export default passportGoogleClient;