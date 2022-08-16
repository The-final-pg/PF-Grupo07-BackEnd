import express, { NextFunction, Request, Response } from "express";
const register = express.Router();
const bcrypt = require("bcrypt");
import { createWorker, createClient } from "../controllers/registerController";
<<<<<<< HEAD
=======
import transporter from "../utils/nodemailer/nodemailerConfig";
const { REWORK_MAIL } = process.env;

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post(
  "/client",
  async (req: Request, res: Response, next: NextFunction) => {
    const newClient = req.body;
<<<<<<< HEAD
=======
    if (newClient.photo === '') delete newClient.photo;
    console.log("newclient", newClient)
    /* const token = jwt.sign({email: newClient.user_mail}, SECRET_KEY) */
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    try {
      // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
      const hashedPassword = await bcrypt.hash(newClient.password, 8);
      // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
<<<<<<< HEAD
      let response: String;
      // guardamos en response todo lo que viene de body y la password hasheada,
      //que la va a recibir la funcion createClient en el controller.
      response = await createClient(newClient, hashedPassword);
      res.send(response);
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    } catch (error) {
      next(error);
    }
  }
);

//y en '/register/worker' la siguiente.
register.post(
  "/worker",
  async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
    const worker = req.body;
    try {
      const hashedPassword = await bcrypt.hash(worker.password, 8);
      let response: String;
      response = await createWorker(worker, hashedPassword);
      res.send(response);
=======
    const newWorker = req.body;
    if (newWorker.photo === '') delete newWorker.photo;
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    } catch (error) {
      next(error);
    }
  }
);

export default register;
