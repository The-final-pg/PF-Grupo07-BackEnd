"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = __importDefault(require("./routes/index"));
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const http_proxy_middleware_1 = require("http-proxy-middleware");
/* const passport = require("passport")

app.use(passport.initialize()) */
app.use('/google', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://localhost:3000', changeOrigin: true }));
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS"
}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
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
