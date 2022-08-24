"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const server = (0, express_1.default)();
const helmet_1 = __importDefault(require("helmet"));
/* import { createProxyMiddleware } from 'http-proxy-middleware'; */
/* const passport = require("passport")

server.use(passport.initialize()) */
/* server.use('/google', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
*/ /* {
  origin: "http://localhost:3000",
  credentials:true,            //access-control-allow-credentials:true
  methods: "GET,POST,PUT,DELETE,OPTIONS"
} */
const corsOptions = "https://re-work-ten.vercel.app/";
server.use((0, morgan_1.default)("dev"));
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)({ origin: corsOptions, credentials: true }));
server.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('origin', 'x-requested-with');
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Headers', 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin');
    next();
});
server.use(express_1.default.static("public"));
server.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
server.use(body_parser_1.default.json({ limit: "50mb" }));
server.use((0, cookie_parser_1.default)());
server.use("/", index_1.default);
server.use((err, _req, res, _next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
exports.default = server;
