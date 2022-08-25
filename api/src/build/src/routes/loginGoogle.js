"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* import cors from "cors";  */
const express_1 = __importDefault(require("express"));
const loginGoogle = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passport_1 = __importDefault(require("passport"));
const googleClientConfig_1 = __importDefault(require("../utils/passport/googleClientConfig"));
const googleWorkerConfig_1 = __importDefault(require("../utils/passport/googleWorkerConfig"));
loginGoogle.use(passport_1.default.initialize());
// el urlencoded es para que lo que viene por body lo recibamos como string o array
loginGoogle.use(express_1.default.urlencoded({ extended: true }));
loginGoogle.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
loginGoogle.get("/successClient", (req, res) => {
    const user = req.session.passport.user;
    console.log("tengo algo?", res.header);
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
                premium: false,
                isSuper: false
            }, SECRET_KEY, { expiresIn: "8h" })
        };
        res.send(newUser);
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
                premium: false,
                isSuper: false
            }, SECRET_KEY, { expiresIn: "8h" })
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
/* const corsOptions = {
    origin: "http://localhost:3000/google/"
}
loginGoogle.use(cors(corsOptions));  */
loginGoogle.get("/worker", googleWorkerConfig_1.default.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"], session: false }), (req, _res) => {
    const { code } = req.query;
    console.log("code", code);
    return (code);
});
loginGoogle.post("/client", googleClientConfig_1.default.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] }));
loginGoogle.get("/worker/callback", googleWorkerConfig_1.default.authenticate("google", {
    successRedirect: "http://localhost:3000/google/success",
    failureRedirect: "/auth/failure"
}));
loginGoogle.get("/client/callback", googleClientConfig_1.default.authenticate("google", {
    successRedirect: "http://localhost:3000/google/success",
    failureRedirect: "/auth/failure"
}));
exports.default = loginGoogle;
