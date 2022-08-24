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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcrypt");
const { SECRET_KEY, REWORK_MAIL } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
const { UserWorker, UserClient } = require("../db");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
/* import passportGoogleClient from "../utils/passport/googleClientConfig"
import passportGoogleWorker from "../utils/passport/googleWorkerConfig" */
// inicializamos passport
login.use(passportConfig_1.default.initialize());
// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express_1.default.urlencoded({ extended: true }));
// usa express session para alojarla en la consola en application Session storage
login.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
//login.use(passport.authenticate("session"))
// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passportConfig_1.default.authenticate("local", { session: false }, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return next(error);
        else if (!user)
            return res.json("invalid");
        else if (user.isActive !== true) {
            return res.status(401).send({ message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo." });
        }
        else {
            console.log("esto esta en log", user);
            return res.send(yield jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: user.isAdmin,
                isWorker: user.isWorker,
                premium: user.premium
            }, SECRET_KEY, { expiresIn: "8h" }));
        }
    }))(req, res, next);
}));
/* login.get("/forgot-password", async (_req:Request, res: Response) => {
    res.send({message: "Se ha enviado un enlace para restablecer tu contraseña. Por favor, revisa tu casilla de correo electrónico."})
}) */
login.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_mail, type } = req.body;
    console.log("email", user_mail);
    try {
        const worker = yield UserWorker.findOne({ where: { user_mail: user_mail } });
        const client = yield UserClient.findOne({ where: { user_mail: user_mail } });
        //si no existe en la db
        if (!worker && !client) {
            res.send("Usuario inválido");
        }
        else {
            console.log("entre al post del forgot");
            // si existe, le mandamos por mail un token que expira en 15 m que lo lleva a reset password para que pueda cambiar la contraseña
            let user;
            if (worker) {
                user = worker;
            }
            else {
                user = client;
            }
            console.log("user del forgot", user);
            //hacer un token, devolverlo al front, agarrarlo y decodificarlo, 
            const token = jsonwebtoken_1.default.sign({
                /* id: user.id, */
                user_mail: user.user_mail
            }, SECRET_KEY, { expiresIn: "15m" });
            const link = `http://localhost:3000/resetPassword?token=${token}`;
            /* const link = `http://localhost:3000/resetPassword/${user.id}` */
            console.log("link forgot password", link);
            if (type === "passwordreset") {
                nodemailerConfig_1.default.sendMail({
                    from: `"REWork" <${REWORK_MAIL}>`,
                    to: user.user_mail,
                    subject: "Completa tu solicitud de restablecimiento de contraseña",
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                        <style>
                            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
                            h1{ font-size: 30px !important;}
                            h2{ font-size: 25px !important;}
                            h3{ font-size: 18px !important;}
                            h4{ font-size: 16px !important;}
                            p{font-size: 15px !important;}
                            a{font-size: 30px !important;}
                    
                            .claseBoton{
                                width: 30%;
                                    background-color: #fcae3b;
                                    border: 2px solid #fcae3b;
                                    color: black; 
                                    padding: 16px 32px;
                                    text-align: center;
                                    text-decoration: none;
                                    font-weight: bold;
                                    display: inline-block;
                                    font-size: 16px;
                                    margin: 4px 2px;
                                    transition-duration: 0.4s;
                                    cursor: pointer;
                            }
                            .claseBoton:hover{
                                background-color: #000000;
                                color: #ffffff;
                            }
                            .imag{
                                width: 20px;
                                height: 20px;
                            }
                            .contA{
                                margin: 0px 5px 0 5px;
                            }
                            .afooter{
                                color: #ffffff !important; 
                                text-decoration: none;
                                font-size: 13px !important;
                            }
                        </style>
                    </head>
                    <body>
                        <div style="width: 100%; background-color: #e3e3e3;">
                            <div style="padding: 20px 10px 20px 10px;">
                                <!-- Contenido principal -->
                                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                                    <h1>¡Hola ${user.dataValues.name}!</h1>
                                    <h3>Has solicitado cambiar tu contraseña.</h3>
                                    <p>Haz click en el siguiente botón e ingresa una nueva contraseña.</p>
                                    
                                    <!-- Botón -->
                                    <a class="claseBoton" href="${link}">Restablecer contraseña</a>
                                    <br>
                                    <p>Si no has solicitado el cambio de tu contraseña, por favor comunícate con nosotros envíandonos un mensaje a ${REWORK_MAIL}.</p>
                                </div>
                    
                                <!-- Footer -->
                                <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                                    <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                        © 2022 REwork, todos los derechos reservados.
                                    </p>
                                </div>
                                <!-- Footer -->
                            </div>
                        </div>
                    </body>
                    </html>`
                });
                res.send("Correo enviado");
            }
        }
    }
    catch (error) {
        res.send(error);
    }
}));
login.post("/reset-password", passportConfig_1.default.authenticate("bearer", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    console.log("token reset password", token);
    console.log("password reset password", password);
    try {
        const email = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log("email reset", email.user_mail);
        //const worker = await UserWorker.findOne({where: {id: id}})
        const worker = yield UserWorker.findOne({ where: { user_mail: email.user_mail } });
        //const client = await UserClient.findOne({where: {id: id}})
        const client = yield UserClient.findOne({ where: { user_mail: email.user_mail } });
        console.log("client", client);
        let user;
        if (!worker && !client) {
            res.send("Usuario inválido");
        }
        else {
            if (worker) {
                user = worker;
            }
            else {
                user = client;
            }
            /* const verifyToken = jwt.verify(token, SECRET_KEY)
            console.log("verifyTokenpost", verifyToken) */
            const newPassword = yield bcrypt.hash(password, 8);
            yield user.set({ password: newPassword } /* , {where: {user_mail : verifyToken.user_mail }} */);
            yield user.save();
            res.send("Contraseña reestablecida");
        }
    }
    catch (error) {
        return error;
    }
}));
/* login.get("/reset-password/:id", async(req: Request, res: Response) => {
    const { id */ /* , token */ /*  } = req.params */
/* console.log("token del get reset", token) */
/*     console.log("en reset password")
    console.log("id reset", id)
    // buscamos por id al user
    const worker = await UserWorker.findOne({where: {id: id}})
    const client = await UserClient.findOne({where: {id: id}})

    let user: any
    if(!worker && !client){
        res.send("Id inválida.")
        } else {
        if(worker){
        user = worker
        } else {
        user = client
        }

    try { */
/* const verifyToken = jwt.verify(token, SECRET_KEY)
console.log("verifyTokenpost", verifyToken) */
/*  console.log(user)
 
 res.send("restablecer contraseña") */ /* .json(token) */
/*
    } catch (error){
        return error
        }
    }
}) */
exports.default = login;
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
/*

login.post("/forgot-password", async (req:Request, res: Response) => {
    const user = req.body
    console.log("email", user.user_mail)
    try {
        const worker = await UserWorker.findOne({ where: {user_mail: user.user_mail}})
        const client = await UserClient.findOne({ where: {user_mail: user.user_mail}})
        //si no existe en la db
        if(!worker && !client){
            res.send("invalid")
        } else {
            console.log("entre al post del forgot")
            // si existe, le mandamos por mail un token que expira en 15 m que lo lleva a reset password para que pueda cambiar la contraseña
            let user: any
            if(worker){
                user = worker
            } else{
                user = client
            }
            console.log("user del forgot", user) */
//hacer un token, devolverlo al front, agarrarlo y decodificarlo, 
/*     const token = jwt.sign({
                id: user.id,
                user_mail: user.user_mail
            },
            SECRET_KEY,
            { expiresIn: "15m" }
        ) */
/*  const link = `http://localhost:3000/resetPassword/${user.id}`  */
/* const link = `http://localhost:3000/resetPassword/${user.id}` */
/* , token */ /* = req.params */
/* console.log("token del get reset", token) */
/*   console.log("en reset password")
  console.log("id reset", id)
  // buscamos por id al user
  const worker = await UserWorker.findOne({where: {id: id}})
  const client = await UserClient.findOne({where: {id: id}})

  let user: any
  if(!worker && !client){
      res.send("Id inválida.")
      } else {
      if(worker){
      user = worker
      } else {
      user = client
      }

  try { */
/* const verifyToken = jwt.verify(token, SECRET_KEY)
console.log("verifyTokenpost", verifyToken) */
/* console.log(user)

res.send("restablecer contraseña") */ /* .json(token) */
/*     } catch (error){
        return error
        }
    }
})

login.put("/reset-password/:id", async(req: Request, res: Response) => {
    const { id, token } = req.params
    const {password, confirmedPassword} = req.body // validar en el front
    console.log("confirmedPassword", confirmedPassword)

    //const worker = await UserWorker.findOne({where: {id: id}})
    const worker = await UserWorker.findByPk(id)
    //const client = await UserClient.findOne({where: {id: id}})
    const client = await UserClient.findByPk(id)

    let user: any
    if(!worker && !client){
        res.send({message: "Id inválida"})
        } else {
        if(worker){
        user = worker
        } else {
        user = client
        }
    try {
        const verifyToken = jwt.verify(token, SECRET_KEY)
        console.log("verifyTokenpost", verifyToken)
        const newPassword = await bcrypt.hash(password, 8)
        await user.set({password : newPassword});
        await user.save()
        
        res.render("restablecer contraseña", {email: user.user_mail})
    } catch (error){
        return error
    
    }
}
}) */ 
