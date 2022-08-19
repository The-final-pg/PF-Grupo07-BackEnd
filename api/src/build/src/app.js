"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = __importDefault(require("./routes/index"));
const cors = require("cors");
const morgan = require("morgan");
const app = (0, express_1.default)();
/* import { createProxyMiddleware } from 'http-proxy-middleware'; */
/* const passport = require("passport")

app.use(passport.initialize()) */
/* app.use('/google', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
 */ app.use(cors( /* {
 origin: "http://localhost:3000",
 credentials:true,            //access-control-allow-credentials:true
 methods: "GET,POST,PUT,DELETE,OPTIONS"
} */));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use("/", index_1.default);
app.use((err, _req, res, _next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
exports.default = app;
