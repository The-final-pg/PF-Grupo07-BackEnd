import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes  from "./routes/index";
import cors from 'cors'; 
import morgan from "morgan";
const server = express();
import helmet from"helmet";

/* import { createProxyMiddleware } from 'http-proxy-middleware'; */
/* const passport = require("passport")

server.use(passport.initialize()) */
/* server.use('/google', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
*//* {
  origin: "http://localhost:3000",
  credentials:true,            //access-control-allow-credentials:true
  methods: "GET,POST,PUT,DELETE,OPTIONS"
} */ 
const corsOptions =  "http://localhost:3000"

server.use(morgan("dev"));
server.use(helmet());
server.use(cors({ origin: corsOptions, credentials: true }));



server.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('origin','x-requested-with');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers','POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin');
  next();
}); 


server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());

server.use("/", routes);


server.use((err: any, _req: any, res: any, _next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
