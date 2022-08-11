import express, { NextFunction, Request, Response } from "express";
const register = express.Router();
const bcrypt = require("bcrypt");
import { createWorker, createClient } from "../controllers/registerController";
import transporter from "../utils/nodemailer/nodemailerConfig"
const { REWORK_MAIL } = process.env

//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post(
  "/client",
  async (req: Request, res: Response, next: NextFunction) => {
    const newClient = req.body;
    try {
      // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
      const hashedPassword = await bcrypt.hash(newClient.password, 8);
      // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
      let response: String;
      // guardamos en response todo lo que viene de body y la password hasheada,
      //que la va a recibir la funcion createClient en el controller.
      response = await createClient(newClient, hashedPassword);
      transporter.sendMail({
        from: `"REWork" <${REWORK_MAIL}>`,
        to: newClient.user_mail,
        subject: "Bienvenido a REWork",
        html: `<span>Más de 1000 freelancers disponibles para concretar tus proyectos, ¿qué estás esperando?</span>
              <b>Ir a <a href="http://localhost:3000/login"> REWork </a> </b>`
    })
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

//y en '/register/worker' la siguiente.
register.post(
  "/worker",
  async (req: Request, res: Response, next: NextFunction) => {
    const worker = req.body;
    try {
      const hashedPassword = await bcrypt.hash(worker.password, 8);
      let response: String;
      response = await createWorker(worker, hashedPassword);
      transporter.sendMail({
        from: `"REWork" <${REWORK_MAIL}>`,
        to: worker.user_mail,
        subject: "Bienvenido a REWork",
        text: "Más de 1000 proyectos esperando ser concretados, ¿qué esperás para postularte?",
        html: `<b>Ir a <a href="http://localhost:3000/login"> REWork </a> </b>`
    })
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

export default register;
