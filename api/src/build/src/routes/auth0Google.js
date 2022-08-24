"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { auth } = require('express-openid-connect');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'https://re-work-ten.vercel.app/',
    clientID: 'sSXCQMJihDhmx4EcIculf0lYKyrstmM0',
    issuerBaseURL: 'https://dev-nwcict1k.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// req.isAuthenticated is provided from the auth router
app.get('/authzero', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
const { requiresAuth } = require('express-openid-connect');
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
