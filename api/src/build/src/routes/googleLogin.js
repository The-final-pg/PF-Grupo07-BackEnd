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
const googleClientConfig_1 = __importDefault(require("../utils/passport/googleClientConfig"));
const googleWorkerConfig_1 = __importDefault(require("../utils/passport/googleWorkerConfig"));
loginGoogle.use(passportConfig_1.default.initialize());
loginGoogle.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
loginGoogle.get("/successClient", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "success",
            client: req.user,
            token: jsonwebtoken_1.default.sign({
                id: req.user.id,
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: false
            }, SECRET_KEY, { expiresIn: "10m" })
        });
    }
});
loginGoogle.get("/successWorker", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "success",
            worker: req.user,
            token: jsonwebtoken_1.default.sign({
                id: req.user.id,
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: true
            }, SECRET_KEY, { expiresIn: "10m" })
        });
    }
});
loginGoogle.get("/failure", (req, res) => {
    console.log("failure", req.user);
    res.status(401).json({
        success: false,
        message: "failure"
    });
});
/* loginGoogle.post("/worker", passportGoogleWorker.authenticate("google", {scope: ["profile", "email"]})
)
 */
loginGoogle.post("/client", googleClientConfig_1.default.authenticate("google", { scope: ["profile", "email"] }));
loginGoogle.get("/worker/callback", googleWorkerConfig_1.default.authenticate("google", {
    successRedirect: "/successWorker",
    failureRedirect: "/failure"
}));
loginGoogle.get("/client/callback", googleClientConfig_1.default.authenticate("google", {
    successRedirect: "/successClient",
    failureRedirect: "/failure"
}));
exports.default = loginGoogle;
