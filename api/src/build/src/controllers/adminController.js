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
exports.deleteSkill = exports.addNewSkills = exports.deleteProfession = exports.addNewProfessions = exports.getOfferFiltered = exports.updateUserAdmin = exports.updateUser = exports.getAllUsers = void 0;
const { UserClient, UserWorker, Offer, Proposal } = require("../db");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
const id = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";
function getAllUsers(isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isActive === "") {
            let allClients = yield UserClient.findAll();
            let getAllWorkers = yield UserWorker.findAll();
            const allUsers = [...allClients, ...getAllWorkers];
            return allUsers;
        }
        else {
            let allClients = yield UserClient.findAll({
                where: { isActive: isActive }
            });
            let getAllWorkers = yield UserWorker.findAll({
                where: { isActive: isActive }
            });
            const usersAdmin = [...allClients, ...getAllWorkers];
            return usersAdmin;
        }
    });
}
exports.getAllUsers = getAllUsers;
function updateUser(isActive, isWorker, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isWorker === false) {
            let client = yield UserClient.findByPk(id);
            if (isActive !== undefined) {
                yield client.set({ isActive: isActive });
                yield client.save();
                console.log("client:", client);
                let clientJson = client.toJSON(client);
                if (client.isActive === false) {
                    nodemailerConfig_1.default.sendMail({
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
                    });
                }
                return "Se actualizo el estado isActive del Client";
            } /* else if(isAdmin !== undefined ) {
              await client.set({isAdmin})
              await client.save()
              return "Se actualizo el estado isAdmin del Client"
            } */
        }
        if (isWorker === true) {
            let worker = yield UserWorker.findByPk(id);
            if (isActive !== undefined) {
                yield worker.set({ isActive: isActive });
                yield worker.save();
                let workerJson = worker.toJSON(worker);
                if (workerJson.isActive === false) {
                    nodemailerConfig_1.default.sendMail({
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
                    });
                    return "Se actualizo el estado isActive del Worker";
                } /* else if(isAdmin !== undefined ) {
                  await worker.set({isAdmin})
                  await worker.save()
                  return "Se actualizo el estado isAdmin del Worker"
                } */
            }
        }
    });
}
exports.updateUser = updateUser;
function updateUserAdmin(isAdmin, isWorker, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isWorker === false) {
            let client = yield UserClient.findByPk(id);
            if (isAdmin !== undefined) {
                yield client.set({ isAdmin: isAdmin });
                yield client.save();
                console.log("client:", client);
                return "El usuario cliente ahora es administrador";
            }
        }
        if (isWorker === true) {
            let worker = yield UserWorker.findByPk(id);
            if (isAdmin !== undefined) {
                yield worker.set({ isAdmin: isAdmin });
                yield worker.save();
                return "El usuario trabajador ahora es administrador";
            }
        }
    });
}
exports.updateUserAdmin = updateUserAdmin;
function getOfferFiltered(isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isActive === "true") {
            const allOffers = yield Offer.findAll({
                where: {
                    isActive: true,
                },
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
        else if (isActive === "false") {
            const allOffers = yield Offer.findAll({
                where: {
                    isActive: false,
                },
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
        else {
            const allOffers = yield Offer.findAll({
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
    });
}
exports.getOfferFiltered = getOfferFiltered;
function addNewProfessions(newProfession) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, {
            attributes: ["profession"],
        });
        const totalProfessions = workerData.toJSON();
        const totalNewProfessions = totalProfessions.profession.concat(newProfession);
        yield UserWorker.update({
            profession: totalNewProfessions,
        }, {
            where: {
                id,
            },
        });
        return "Profesión cargada con éxito!";
    });
}
exports.addNewProfessions = addNewProfessions;
function deleteProfession(array, profession) {
    return __awaiter(this, void 0, void 0, function* () {
        const professions = array.filter((e) => profession !== e);
        yield UserWorker.update({
            profession: professions,
        }, {
            where: {
                id,
            },
        });
        return "Profesión eliminada con éxito";
    });
}
exports.deleteProfession = deleteProfession;
function addNewSkills(skill) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, {
            attributes: ["skills"],
        });
        const totalSkills = workerData.toJSON();
        const totalNewSkills = totalSkills.skills.concat(skill);
        yield UserWorker.update({
            skills: totalNewSkills,
        }, {
            where: {
                id,
            },
        });
        return "Aptitud cargada con éxito!";
    });
}
exports.addNewSkills = addNewSkills;
function deleteSkill(array, skill) {
    return __awaiter(this, void 0, void 0, function* () {
        const skills = array.filter((e) => skill !== e);
        yield UserWorker.update({
            skills: skills,
        }, {
            where: {
                id,
            },
        });
        return "Aptitud eliminada con éxito";
    });
}
exports.deleteSkill = deleteSkill;
