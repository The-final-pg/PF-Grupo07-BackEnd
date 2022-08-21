import express, { NextFunction, Request, Response } from "express";
const login = express.Router();
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
import session from 'express-session' //middleware
import passport from '../utils/passport/passportConfig'
/* import passportGoogleClient from "../utils/passport/googleClientConfig"
import passportGoogleWorker from "../utils/passport/googleWorkerConfig" */


// inicializamos passport
login.use(passport.initialize())

// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express.urlencoded({ extended: true }))

// usa express session para alojarla en la consola en application Session storage
login.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
//login.use(passport.authenticate("session"))


// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", async (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate(
        "local",
        { session: false },
        async (error, user) => {
            if(error) return next(error);
            else if(!user) return res.json("invalid");
            else if(user.isActive !== true){
                return res.status(401).send({message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo."})
            }
            else {
                console.log("esto esta en log",user)
                return res.send(
                    await jwt.sign(
                        {
                            id: user.id,
                            user_mail: user.user_mail,
                            isAdmin: user.isAdmin,
                            isWorker: user.isWorker,
                            premium: user.premium
                        },
                        SECRET_KEY,
                        { expiresIn: "8h" }
                    )
                )
            }
        }
    )(req, res, next)
})





export default login

/* router.post("/email", async (req, res, next) => {
    var { email, type } = req.body;
    email = email.toLowerCase();
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ error: "Non-existent User" });
    let token = await jwt.sign({ email }, SECRET_KEY, { expiresIn: "1000hr" });
    if (type === "passwordreset") {
        transporter.sendMail({
            from: `"On The Rocks" <${GMAIL_APP_EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: "Recover password", // Subject line
            text: "click on the link to reset your password ", // plain text body
            html: `<b>click on the link to reset your password: <a href="${FRONT}/verify/password?token=${token}"> HERE </a> </b>`, // html body
        });
        res.json({ success: "Email sent" });
    }
    if (type === "verifyadmin") {
        let token = await jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                isDeleted: user.isDeleted,
                Authenticated: true,
            },
            SECRET_KEY,
        //    { expiresIn: 60 * 10 } // 10 min
           { expiresIn: 60 * 60 } // 1hr
        );
        await transporter.sendMail({
            from: `"On The Rocks" <${GMAIL_APP_EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: "Two steps verification", // Subject line
            text: "Click on the link to verify your identity: ", // plain text body
            html: `<b>Click on the link to verify your identity: <a href="${FRONT}/verify/admin?token=${token}"> HERE </a> </b>`, // html body
        });
        res.json({ success: "Email sent" });
    }
});

router.post(
    "/passwordreset",
    passport.authenticate("bearer", { session: false }),
    async (req, res, next) => {
        let { token, newPassword } = req.body;
        try {
            let email = jwt.verify(token, SECRET_KEY).email.toLowerCase();
            let isRegistered = await User.findOne({ where: { email: email } });
            if (isRegistered) {
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                await User.update(
                    { password: hashedPassword },
                    { where: { email: email } }
                );
                return res.json({ success: "Updated user" });
            } else {
                return res.json({ error: "Non-existent User" });
            }
        } catch (e) {
            return res.json({ error: e.message });
        }
    }
);

router.post("/admin", async (req, res, next) => {
    let token = req.body;
    try {
        let email = jwt.verify(token, SECRET_KEY).email.toLowerCase();
        let isAdmin = await User.findOne({
            where: { email: email, isAdmin: true },
        });
        isAdmin ? res.json(true) : res.json(false);
    } catch (e) {
        return res.json({ error: e.message });
    }
}); */
