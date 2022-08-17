const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import routes  from "./routes/index";
const cors = require("cors");
const morgan = require("morgan");
const app = express();
import { createProxyMiddleware } from 'http-proxy-middleware';
/* const passport = require("passport")

app.use(passport.initialize()) */
app.use('/google', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use(cors({
  origin: true,
  credentials:true,            //access-control-allow-credentials:true
  methods: "GET,POST,PUT,DELETE,OPTIONS"
}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((_req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

app.use((err: any, _req: any, res: any, _next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
