"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginGoogle = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
/* import passportGoogleClient from "../utils/passport/googleClientConfig" */
const googleWorkerConfig_1 = __importDefault(require("../utils/passport/googleWorkerConfig"));
loginGoogle.use(passportConfig_1.default.initialize());
loginGoogle.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
loginGoogle.get("/successClient", (req, res) => {
    const user = req.session.passport.user;
    if (user) {
        const newUser = {
            success: true,
            message: "success",
            worker: user,
            token: jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: false,
                isWorker: true,
                premium: false
            }, SECRET_KEY, { expiresIn: "10m" })
        };
        res.status(200).send(newUser);
    }
});
loginGoogle.get("/successWorker", (req, res) => {
    const user = req.session.passport.user;
    console.log("tengo algo?", user);
    /* console.log("aver esto:", req) */
    if (user) {
        const newUser = {
            success: true,
            message: "success",
            worker: user,
            token: jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: false,
                isWorker: true,
                premium: false
            }, SECRET_KEY, { expiresIn: "10m" })
        };
        res.send(newUser);
    }
});
loginGoogle.get("/failure", (req, res) => {
    console.log("failure", req.user);
    res.status(401).json({
        success: false,
        message: "failure"
    });
});
loginGoogle.post("/worker", googleWorkerConfig_1.default.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] }), (req, _res) => {
    const { code } = req.query;
    console.log("code", code);
    return (code);
});
/*
loginGoogle.post("/client", passportGoogleClient.authenticate("google", {scope: ["profile", "email"]})
)
 */
loginGoogle.get("/worker/callback", googleWorkerConfig_1.default.authenticate("google", {
    successRedirect: "http://localhost:3000/google/success",
    failureRedirect: "/auth/failure"
}));
/* loginGoogle.get("/client/callback", passportGoogleClient.authenticate("google", {
    successRedirect: "/successClient",
    failureRedirect: "/failure"
    }
))
 */
exports.default = loginGoogle;
