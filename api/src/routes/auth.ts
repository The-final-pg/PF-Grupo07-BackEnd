import express, { NextFunction, Request, Response } from "express";
const auth = express.Router();
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
const { SECRET_KEY, REWORK_MAIL } = process.env;
const { UserWorker, UserClient } = require("../db");
import transporter from "../utils/nodemailer/nodemailerConfig";

auth.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const googleUser = req.body
    try {
        console.log(googleUser)
        const clientFound = await UserClient.findOne({where: {user_mail: googleUser?.user_mail}})
        const workerFound = await UserWorker.findOne({where: {user_mail: googleUser?.user_mail}})
        console.log("client", clientFound)
        console.log("worker", workerFound)
        if(clientFound){
            return res.send(jwt.sign(
                {
                    id: clientFound.id,
                    user_mail: clientFound.user_mail,
                    isAdmin: clientFound.isAdmin,
                    isWorker: clientFound.isWorker,
                    premium: clientFound.premium
                },
                SECRET_KEY,
                { expiresIn: "8h" }
                ))
            /* res.status(200).json(clientFound)   */
        } else if(workerFound){
            return res.send(jwt.sign(
                {
                    id: workerFound.id,
                    user_mail: workerFound.user_mail,
                    isAdmin: workerFound.isAdmin,
                    isWorker: workerFound.isWorker,
                    premium: workerFound.premium
                },
                SECRET_KEY,
                { expiresIn: "8h" }
                ))
            /* res.status(200).json(workerFound) */
        } else {
            res.send ('usuario no encontrado' )
        }


    } catch(error){
        next(error)
    }
})

auth.post("/client", async(req: Request, res: Response, next: NextFunction) => {
    const newClient = req.body;
    try {
        console.log("newClient", newClient)
        const hashedPassword = await bcrypt.hash(newClient.password, 8)
        const clientGoogle = await UserClient.create({
            name: newClient.name,
            lastName: newClient.lastName,
            user_mail: newClient.user_mail,
            born_date: newClient.born_date,
            password: hashedPassword,         
            rating: newClient.rating,
            notification: newClient.notification,
            photo: newClient.photo,
            isActive: true,
            isWorker: false,
            isAdmin: false,
            premium: false
        })

        transporter.sendMail({
          from: `"REWork" <${REWORK_MAIL}>`,
          to: clientGoogle.user_mail,
          subject: "¡Te damos la bienvenida a REwork!",
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
                          <h1>¡Hola ${clientGoogle.name}!</h1>
                          <h3>Tu cuenta en REwork fue creada con éxito.</h3>
                          <p>Tu contraseña asignada momentáneamente es: ${newClient.password}</p>
          
                          <!-- Gracias -->
                          <p>Te sugerimos cambiar tu contraseña por una que solo tú conozcas. Puedes hacerlo desde</p>
          
                          <!-- Botón -->
                          <a class="claseBoton" href="http://localhost:3000/myProfile">AQUÍ</a>
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
      })
        

        res.send(jwt.sign(
            {
                id: clientGoogle.id,
                user_mail: clientGoogle.user_mail,
                isAdmin: clientGoogle.isAdmin,
                isWorker: clientGoogle.isWorker,
                premium: clientGoogle.premium
            },
            SECRET_KEY,
            { expiresIn: "8h" }
            ))
    } catch(error){
        next(error)
    }
})

auth.post("/worker", async(req: Request, res: Response, next: NextFunction) => {
    const newWorker = req.body;
    try {
        console.log("newWorker", newWorker)
        const hashedPassword = await bcrypt.hash(newWorker.password, 8)
        
        const workerGoogle = await UserWorker.create({
            name: newWorker.name,
            password: hashedPassword,
            lastName: newWorker.lastName,
            user_mail: newWorker.user_mail,
            born_date: newWorker.born_date,
            rating: newWorker.rating,
            notification: newWorker.notification,
            photo: newWorker.photo,
            isActive: true,
            isWorker: true,
            premium: false,
            isAdmin: true
        })

        res.send(workerGoogle)

        return res.send(jwt.sign(
            {
                id: workerGoogle.id,
                user_mail: workerGoogle.user_mail,
                isAdmin: workerGoogle.isAdmin,
                isWorker: workerGoogle.isWorker,
                premium: workerGoogle.premium
            },
            SECRET_KEY,
            { expiresIn: "8h" }
            ))
    } catch(error){
        next(error)
    }
})



export default auth