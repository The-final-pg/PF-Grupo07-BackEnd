const { auth } = require('express-openid-connect');
import express from "express"
const app = express()

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
app.get('/authzero', (req: any, res: any) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req: any, res: any) => {
  res.send(JSON.stringify(req.oidc.user));
});