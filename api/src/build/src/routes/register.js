"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register = express_1.default.Router();
const bcrypt = require("bcrypt");
const registerController_1 = require("../controllers/registerController");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
const { UserWorker, UserClient } = require("../db");
//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    if (newClient.photo === '')
        delete newClient.photo;
    console.log("newclient", newClient);
    /* const token = jwt.sign({email: newClient.user_mail}, SECRET_KEY) */
    try {
        const mail = newClient.user_mail;
        const clientFound = yield UserClient.findOne({ where: { user_mail: mail } });
        const workerFound = yield UserWorker.findOne({ where: { user_mail: mail } });
        if (workerFound) {
            res.send({ message: "El correo electrónico ya pertenece a una cuenta de freelancer. Por favor, utiliza otra cuenta de correo o inicia sesión como freelancer." });
        }
        else if (!clientFound && !workerFound) {
            // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
            const hashedPassword = yield bcrypt.hash(newClient.password, 8);
            // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
            // guardamos en response todo lo que viene de body y la password hasheada,
            //que la va a recibir la funcion createClient en el controller.
            let clientCreated;
            clientCreated = yield (0, registerController_1.createClient)(newClient, hashedPassword);
            const id = clientCreated.dataValues.id;
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: clientCreated.dataValues.user_mail,
                subject: "Verifica tu cuenta de REWork",
                html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
              <style>
                  p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
                  h1{ font-size: 30px !important;}
                  h2{ font-size: 25px !important;}
                  h3{ font-size: 18px !important;}
                  h4{ font-size: 16px !important;}
                  p{font-size: 15px !important;}
                  a{font-size: 30px !important;}
          
                  .claseBoton{
                      width: 30%;
                          background-color: #fcae3b;
                          border: 2px solid #fcae3b;
                          color: black; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          font-weight: bold;
                          display: inline-block;
                          font-size: 16px;
                          margin: 4px 2px;
                          transition-duration: 0.4s;
                          cursor: pointer;
                  }
                  .claseBoton:hover{
                      background-color: #000000;
                      color: #ffffff;
                  }
                  .imag{
                      width: 20px;
                      height: 20px;
                  }
                  .contA{
                      margin: 0px 5px 0 5px;
                  }
                  .afooter{
                      color: #ffffff !important; 
                      text-decoration: none;
                      font-size: 13px !important;
                  }
              </style>
          </head>
          <body>
              <div style="width: 100%; background-color: #e3e3e3;">
                  <div style="padding: 20px 10px 20px 10px;">
                      <!-- Contenido principal -->
                      <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                          <h1>¡Comienza a utilizar REwork!</h1>
                          <p>Sólo falta que verifiques tu cuenta.</p>
          
                          <!-- Gracias -->
                          <p>Confirma tu correo electrónico</p>
          
                          <!-- Botón -->
                          <a class="claseBoton" href="http://localhost:3000/confirm/client/${id}">AQUÍ</a>
                      </div>
                      <!-- Contenido principal -->
          
                      <!-- Footer -->
                      <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                              © 2022 REwork, todos los derechos reservados.
                          </p>
                      </div>
                      <!-- Footer -->
          
          
          
                  </div>
              </div>
          </body>
          </html>`
                /* `<span>Más de 1000 freelancers disponibles para concretar tus proyectos, ¿qué estás esperando?</span>
                      <b>Confirma tu cuenta <a href="http://localhost:3000/confirm/client/${id}"> AQUÍ </a> </b>` */
            });
            res.send({ message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo." });
        }
        else if (clientFound) {
            res.send({ message: "Usuario existente. Por favor inicia sesión." });
        }
    }
    catch (error) {
        next(error);
    }
}));
//y en '/register/worker' la siguiente.
register.post("/worker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorker = req.body;
    if (newWorker.photo === '')
        delete newWorker.photo;
    try {
        const mail = newWorker.user_mail;
        const workerFound = yield UserWorker.findOne({ where: { user_mail: mail } });
        const clientFound = yield UserClient.findOne({ where: { user_mail: mail } });
        if (clientFound) {
            res.send({ message: "El correo electrónico ya pertenece a una cuenta de cliente. Por favor, utiliza otra cuenta de correo o inicia sesión como cliente." });
        }
        else if (!workerFound && !clientFound) {
            const hashedPassword = yield bcrypt.hash(newWorker.password, 8);
            let workerCreated;
            workerCreated = yield (0, registerController_1.createWorker)(newWorker, hashedPassword);
            const id = workerCreated.dataValues.id;
            nodemailerConfig_1.default.sendMail({
                from: `"REWork" <${REWORK_MAIL}>`,
                to: workerCreated.dataValues.user_mail,
                subject: "Verifica tu cuenta de REWork",
                html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
              <style>
                  p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
                  h1{ font-size: 30px !important;}
                  h2{ font-size: 25px !important;}
                  h3{ font-size: 18px !important;}
                  h4{ font-size: 16px !important;}
                  p{font-size: 15px !important;}
                  a{font-size: 30px !important;}
          
                  .claseBoton{
                      width: 30%;
                          background-color: #fcae3b;
                          border: 2px solid #fcae3b;
                          color: black; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          font-weight: bold;
                          display: inline-block;
                          font-size: 16px;
                          margin: 4px 2px;
                          transition-duration: 0.4s;
                          cursor: pointer;
                  }
                  .claseBoton:hover{
                      background-color: #000000;
                      color: #ffffff;
                  }
                  .imag{
                      width: 20px;
                      height: 20px;
                  }
                  .contA{
                      margin: 0px 5px 0 5px;
                  }
                  .afooter{
                      color: #ffffff !important; 
                      text-decoration: none;
                      font-size: 13px !important;
                  }
              </style>
          </head>
          <body>
              <div style="width: 100%; background-color: #e3e3e3;">
                  <div style="padding: 20px 10px 20px 10px;">
                      <!-- Contenido principal -->
                      <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                          <h1>¡Comienza a utilizar REwork!</h1>
                          <p>Sólo falta que verifiques tu cuenta.</p>
          
                          <!-- Gracias -->
                          <p>Confirma tu correo electrónico</p>
          
                          <!-- Botón -->
                          <a class="claseBoton" href="http://localhost:3000/confirm/worker/${id}">AQUÍ</a>
                      </div>
                      <!-- Contenido principal -->
          
                      <!-- Footer -->
                      <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                              © 2022 REwork, todos los derechos reservados.
                          </p>
                      </div>
                      <!-- Footer -->
          
          
          
                  </div>
              </div>
          </body>
          </html>`
            });
            res.send({ message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo." });
        }
        else if (workerFound) {
            res.send({ message: "Usuario existente. Por favor inicia sesión." });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = register;
/* || "https://rework-xi.vercel.app/confirm/worker/${id}" */
/* || https://rework-xi.vercel.app/confirm/client/${id} */ 
