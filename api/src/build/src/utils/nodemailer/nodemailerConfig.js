"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const { REWORK_MAIL, REWORK_PASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: REWORK_MAIL,
        pass: REWORK_PASSWORD,
    },
    debug: false,
    tls: {
        rejectUnauthorized: false
    }
});
exports.default = transporter;
