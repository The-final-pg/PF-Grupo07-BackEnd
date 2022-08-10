import express, { NextFunction, Request, Response } from "express";
const register = express.Router();
const bcrypt = require("bcrypt");
import { createWorker, createClient } from "../controllers/registerController";

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
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

export default register;
