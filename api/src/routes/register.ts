import express, { NextFunction, Request, Response } from "express";
const register = express.Router();
const bcrypt = require("bcrypt");
import { createWorker, createClient } from "../controllers/registerController";
import transporter from "../utils/nodemailer/nodemailerConfig";
const { REWORK_MAIL } = process.env;


//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post(
  "/client",
  async (req: Request, res: Response, next: NextFunction) => {
    const newClient = req.body;
    if (newClient.photo === '') delete newClient.photo;
    console.log("newclient", newClient)
    /* const token = jwt.sign({email: newClient.user_mail}, SECRET_KEY) */
    try {
      const mail = newClient.user_mail
      const clientFound = await UserClient.findOne({where: {user_mail : mail}})
      if(!clientFound){
        // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
        const hashedPassword = await bcrypt.hash(newClient.password, 8);
        // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
        // guardamos en response todo lo que viene de body y la password hasheada,
        //que la va a recibir la funcion createClient en el controller.
        let clientCreated : any
        clientCreated = await createClient(newClient, hashedPassword);
        const id = clientCreated.dataValues.id
        transporter.sendMail({
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
      })
        res.send({message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo."});
      } else {
        res.send({message: "Usuario existente. Por favor inicia sesión."})
      }
      // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
      const hashedPassword = await bcrypt.hash(newClient.password, 8);
      // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
      // guardamos en response todo lo que viene de body y la password hasheada,
      //que la va a recibir la funcion createClient en el controller.
      let clientCreated : any
      clientCreated = await createClient(newClient, hashedPassword);
      const id = clientCreated.dataValues.id
      transporter.sendMail({
        from: `"REWork" <${REWORK_MAIL}>`,
        to: clientCreated.dataValues.user_mail,
        subject: "Bienvenido a REWork",
        html: `<span>Más de 1000 freelancers disponibles para concretar tus proyectos, ¿qué estás esperando?</span>
              <b>Confirma tu cuenta <a href="https://rework-xi.vercel.app/confirm/client/${id}"> AQUÍ </a> </b>`   
    })
      res.send({message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo."});
    } catch (error) {
      next(error);
    }
  }
);

//y en '/register/worker' la siguiente.
register.post(
  "/worker",
  async (req: Request, res: Response, next: NextFunction) => {
    const newWorker = req.body;
    if (newWorker.photo === '') delete newWorker.photo;
    try {const mail = newWorker.user_mail
      const workerFound = await UserClient.findOne({where: {user_mail : mail}})
      if(!workerFound){
        const hashedPassword = await bcrypt.hash(newWorker.password, 8);
        let workerCreated : any
        workerCreated = await createWorker(newWorker, hashedPassword);
        const id = workerCreated.dataValues.id
        transporter.sendMail({
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
          /* `<span>Más de 1000 proyectos esperando ser concretados, ¿qué esperás para postularte?</span>
                <b>Confirma tu cuenta <a href="http://localhost:3000/confirm/worker/${id}"> AQUÍ </a> </b>` */
      })
        res.send({message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo."});
      } else {
        res.send({message: "Usuario existente. Por favor inicia sesión."})
      }
    try {
      const hashedPassword = await bcrypt.hash(newWorker.password, 8);
      let workerCreated : any
      workerCreated = await createWorker(newWorker, hashedPassword);
      const id = workerCreated.dataValues.id
      transporter.sendMail({
        from: `"REWork" <${REWORK_MAIL}>`,
        to: workerCreated.dataValues.user_mail,
        subject: "Bienvenido a REWork",
        html: `<span>Más de 1000 proyectos esperando ser concretados, ¿qué esperás para postularte?</span>
              <b>Confirma tu cuenta <a href="https://rework-xi.vercel.app/confirm/worker/${id}"> AQUÍ </a> </b>`
    })
      res.send({message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo."});
    } catch (error) {
      next(error);
    }
  }
);

export default register;
