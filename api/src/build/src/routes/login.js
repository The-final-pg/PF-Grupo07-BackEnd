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
const { SECRET_KEY } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
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
