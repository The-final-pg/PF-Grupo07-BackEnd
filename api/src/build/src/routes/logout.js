"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logout = express_1.default.Router();
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
logout.use(passportConfig_1.default.initialize());
logout.use(passportConfig_1.default.session());
logout.post("/", (req, res) => {
    req.logOut();
    req.session = null;
    res.send("Sesión finalizada");
});
exports.default = logout;
