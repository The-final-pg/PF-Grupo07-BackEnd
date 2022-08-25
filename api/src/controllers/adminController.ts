import { ClientType, OfferType, WorkerType } from "../types";
const { UserClient, UserWorker, Offer, Proposal } = require("../db");
import transporter from "../utils/nodemailer/nodemailerConfig";
const { REWORK_MAIL } = process.env;

const id: string = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";

export async function getAllUsers(isActive: string): Promise<(ClientType | WorkerType)[]> {
  if(isActive === "") {
    let allClients: ClientType[] = await UserClient.findAll();
    let getAllWorkers: WorkerType[] = await UserWorker.findAll();
    const allUsers : (ClientType | WorkerType)[] = [...allClients, ...getAllWorkers];
    return allUsers;
  } else {
    let allClients: ClientType[] = await UserClient.findAll({
      where: {isActive: isActive}
    });
    let getAllWorkers: WorkerType[] = await UserWorker.findAll({
      where: {isActive: isActive}
    });
    const usersAdmin : (ClientType | WorkerType)[] = [...allClients, ...getAllWorkers];
    return usersAdmin;
  }
}

export async function updateUser(isActive: string, isWorker: boolean, id: string, /* isAdmin: string */) {
  if(isWorker === false) {
    let client = await UserClient.findByPk(id)
    if(isActive !== undefined) {
      await client.set({isActive: isActive})
      await client.save()
      console.log("client:" , client)
      let clientJson = client.toJSON(client)
      if (client.isActive === false){
        transporter.sendMail({
          from: `"REWork" <${REWORK_MAIL}>`,
            to: clientJson.user_mail, 
            subject: "Cuenta baneada",
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
                      width: 220px;
                      height: 60px
                          background-color: #F4A261;
                          border: 2px solid #F4A261;
                          border-radius: 5px;
                          color: #ffffff; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          display: inline-block;
                          font-size: 15px;
                          margin: 4px 2px;
                          transition-duration: 0.4s;
                          cursor: pointer;
                  }
                  .claseBoton:hover{
                      background-color: e76f51;
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
                      color: #264653 !important; 
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
                            <h1>Su cuenta ha sido baneada</h1>
                            <h2>Si considera que es un error, por favor comuníquese con el soporte de REwork via mail:</h2>
                            <h3>${REWORK_MAIL}</h3>
                            
                        </div>
                        <!-- Contenido principal -->
            
                        <!-- Footer -->
                        <div style="background-color: #264653; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: #264653; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                © 2022 REwork, todos los derechos reservados.
                            </p>
                        </div>
                      </div>
                </div>
            </body>
            </html>`
        })
      }

      return "Se actualizo el estado isActive del Client"
    } /* else if(isAdmin !== undefined ) {
      await client.set({isAdmin})
      await client.save()
      return "Se actualizo el estado isAdmin del Client"
    } */
  } 
  
  if(isWorker === true) {
    let worker = await UserWorker.findByPk(id)
    if(isActive !== undefined) {
      await worker.set({isActive: isActive})
      await worker.save()
      let workerJson = worker.toJSON(worker)
      if (workerJson.isActive === false){
        transporter.sendMail({
          from: `"REWork" <${REWORK_MAIL}>`,
            to: workerJson.user_mail, 
            subject: "Cuenta baneada",
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
                      width: 220px;
                      height: 60px
                          background-color: #F4A261;
                          border: 2px solid #F4A261;
                          border-radius: 5px;
                          color: #ffffff; 
                          padding: 16px 32px;
                          text-align: center;
                          text-decoration: none;
                          display: inline-block;
                          font-size: 15px;
                          margin: 4px 2px;
                          transition-duration: 0.4s;
                          cursor: pointer;
                  }
                  .claseBoton:hover{
                      background-color: e76f51;
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
                      color: #264653 !important; 
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
                            <h1>Su cuenta ha sido baneada</h1>
                            <h2>Si considera que es un error, por favor comuníquese con el soporte de REwork via mail:</h2>
                            <h3>${REWORK_MAIL}</h3>
                            
                        </div>
                        <!-- Contenido principal -->
            
                        <!-- Footer -->
                        <div style="background-color: #264653; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                          <p style="background-color: #264653; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                © 2022 REwork, todos los derechos reservados.
                            </p>
                        </div>
                      </div>
                </div>
            </body>
            </html>`
                })
      return "Se actualizo el estado isActive del Worker"
    } /* else if(isAdmin !== undefined ) {
      await worker.set({isAdmin})
      await worker.save()
      return "Se actualizo el estado isAdmin del Worker"
    } */
    }
  }
}

export async function  updateUserAdmin(isAdmin: string, isWorker: boolean, id: string, /* isAdmin: string */) {
  if(isWorker === false) {
    let client = await UserClient.findByPk(id)
    if(isAdmin !== undefined) {
      await client.set({isAdmin: isAdmin})
      await client.save()
      console.log("client:" , client)
      return "El usuario cliente ahora es administrador"
    }
  } 
  
  if(isWorker === true) {
    let worker = await UserWorker.findByPk(id)
    if(isAdmin !== undefined) {
      await worker.set({isAdmin: isAdmin})
      await worker.save()
      return "El usuario trabajador ahora es administrador"
    }
  }
}

export async function getOfferFiltered(
  isActive: string,
): Promise<OfferType[]> {
  if (isActive === "true") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: true,
      },
      include: [UserClient, {model: Proposal, include:UserWorker}],
    });
    return allOffers;
  } else if (isActive === "false") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: false,
      },
      include: [UserClient, {model: Proposal, include:UserWorker}],
    });
    return allOffers;
  } else {
    const allOffers: OfferType[] = await Offer.findAll({
      include: [UserClient, {model: Proposal, include:UserWorker}],
    });
    return allOffers;
  }
}

export async function addNewProfessions(
  newProfession: string
): Promise<string> {
  const workerData: any = await UserWorker.findByPk(id, {
    attributes: ["profession"],
  });
  const totalProfessions: any = workerData.toJSON();
  const totalNewProfessions: string[] = totalProfessions.profession.concat(newProfession);
  await UserWorker.update(
    {
      profession: totalNewProfessions,
    },
    {
      where: {
        id,
      },
    }
  );
  return "Profesión cargada con éxito!";
}

export async function deleteProfession(array: string[], profession: string) {
  const professions = array.filter((e: string) => profession !== e)
  await UserWorker.update(
    {
      profession: professions,
    },
    {
      where: {
        id,
      },
    }
  );
  return "Profesión eliminada con éxito";
}

export async function addNewSkills(skill: string): Promise<string> {
  const workerData: any = await UserWorker.findByPk(id, {
    attributes: ["skills"],
  });
  const totalSkills: any = workerData.toJSON();
  const totalNewSkills: string[] = totalSkills.skills.concat(skill);
  await UserWorker.update(
    {
      skills: totalNewSkills,
    },
    {
      where: {
        id,
      },
    }
  );
  return "Aptitud cargada con éxito!";
}

export async function deleteSkill(array: string[], skill: string) {
  const skills = array.filter((e: string) => skill !== e);
  await UserWorker.update(
    {
      skills: skills,
    },
    {
      where: {
        id,
      },
    }
  );
  return "Aptitud eliminada con éxito";
}