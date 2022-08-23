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
exports.setReview = exports.setPortfolios = exports.setProposals = exports.setOffers = exports.setData = void 0;
const axios_1 = __importDefault(require("axios"));
const { UserClient, UserWorker, Offer, Proposal, Portfolio, Review, } = require("./src/db");
const setData = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserClient.findAll();
    if (!users.length) {
        const responseUsers = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Worker");
        let arrayClient = [];
        let arrayWorker = [];
        responseUsers.data.map((e) => {
            arrayWorker.push({
                name: e.Worker.name,
                lastName: e.Worker.lastname,
                user_mail: e.Worker.user_mail,
                born_date: e.Worker.born_date,
                password: e.Worker.password,
                profession: [randomProfession(), randomProfession(), randomProfession()],
                skills: [randomSkills(), randomSkills(), randomSkills(), randomSkills(), randomSkills(), randomSkills()],
                rating: ((e.Worker.rating - 1) % 5) + 1,
                photo: e.Worker.photo,
                notification: e.Worker.notification,
                isActive: true,
                description: e.Worker.description,
            });
            arrayClient.push({
                name: e.Client.name,
                lastName: e.Worker.lastname,
                user_mail: e.Client.user_mail,
                born_date: e.Client.born_date,
                password: e.Client.password,
                rating: ((e.Client.rating - 1) % 5) + 1,
                photo: e.Client.photo,
                notification: e.Client.notification,
                isActive: true,
                description: e.Worker.description,
            });
        });
        yield UserWorker.create({
            name: "Internal",
            lastName: "Data",
            user_mail: "none",
            born_date: "1900/01/01",
            password: "none",
            profession: arrayProfesiones,
            skills: arraySkills,
            isActive: false,
            isAdmin: true,
            premium: true,
            id: "3748eb17-a207-5bc3-aa4f-3113a1b9409d"
        });
        let arrayClientDb = yield (arrayClient === null || arrayClient === void 0 ? void 0 : arrayClient.filter((c) => c));
        yield UserClient.bulkCreate(arrayClientDb);
        let arrayWorkerDb = yield (arrayWorker === null || arrayWorker === void 0 ? void 0 : arrayWorker.filter((c) => c));
        yield UserWorker.bulkCreate(arrayWorkerDb);
        console.log("se cargo la data");
    }
});
exports.setData = setData;
const setOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield Offer.findAll();
    if (!offers.length) {
        let clientsId = yield UserClient.findAll();
        const responseOffers = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer");
        let arrayOffers = [];
        responseOffers.data.map((e) => {
            arrayOffers.push({
                title: e.Offer.title,
                max_remuneration: Math.floor(e.Offer.remuneration),
                min_remuneration: Math.floor(e.Offer.remuneration / 2),
                offer_description: e.Offer.offer_description,
                post_duration_time: e.Offer.post_duration_time,
                work_duration_time: e.Offer.work_duration_time[e.Offer.work_duration_time[4] % 4],
                photo: e.Offer.photo,
                profession: [randomProfession(), randomProfession(), randomProfession()],
            });
        });
        arrayOffers = arrayOffers.map((e) => {
            let x = clientsId.pop();
            return Object.assign(Object.assign({}, e), { userClientId: x.dataValues.id });
        });
        let arrayOffersDb = yield (arrayOffers === null || arrayOffers === void 0 ? void 0 : arrayOffers.filter((c) => c));
        yield Offer.bulkCreate(arrayOffersDb);
    }
});
exports.setOffers = setOffers;
function setProposals() {
    return __awaiter(this, void 0, void 0, function* () {
        const proposals = yield Proposal.findAll();
        if (!proposals.length) {
            let workersId = yield UserWorker.findAll();
            let offersId = yield Offer.findAll();
            const responseProposal = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer");
            let arrayProposal = [];
            responseProposal.data.map((e) => {
                arrayProposal.push({
                    remuneration: parseInt(e.Proposal.remuneration),
                    proposal_description: e.Proposal.proposal_description,
                    worked_time: parseInt(e.Proposal.worked_time),
                });
            });
            arrayProposal = arrayProposal.map((e) => {
                let x = workersId.pop();
                let y = offersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerId: x.dataValues.id, offerIdOffer: y.dataValues.idOffer });
            });
            let arrayProposalDb = arrayProposal === null || arrayProposal === void 0 ? void 0 : arrayProposal.filter((c) => c);
            yield Proposal.bulkCreate(arrayProposalDb);
        }
    });
}
exports.setProposals = setProposals;
function setPortfolios() {
    return __awaiter(this, void 0, void 0, function* () {
        const portfolios = yield Portfolio.findAll();
        if (!portfolios.length) {
            let workersId = yield UserWorker.findAll();
            const responsePortfolio = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Portfolio");
            let arrayPortfolio = [];
            responsePortfolio.data.map((e) => {
                arrayPortfolio.push({
                    title: e.title,
                    photo: e.photo,
                    portfolio_description: e.portfolio_description,
                });
            });
            arrayPortfolio = arrayPortfolio.map((e) => {
                let x = workersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerId: x.dataValues.id });
            });
            let arrayPortfolioDb = arrayPortfolio === null || arrayPortfolio === void 0 ? void 0 : arrayPortfolio.filter((c) => c);
            yield Portfolio.bulkCreate(arrayPortfolioDb);
        }
    });
}
exports.setPortfolios = setPortfolios;
function setReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield Review.findAll();
        if (!reviews.length) {
            let workersId = yield UserWorker.findAll();
            let clientsId = yield UserClient.findAll();
            let offersId = yield Offer.findAll();
            const responseReview = yield axios_1.default.get("https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Review");
            let arrayReview = [];
            responseReview.data.map((e) => {
                arrayReview.push({
                    valoration: ((e.valoration - 1) % 5) + 1,
                    review_description: e.review_description,
                });
            });
            arrayReview = arrayReview.map((e) => {
                let x = workersId.pop();
                let y = clientsId.pop();
                let z = offersId.pop();
                return Object.assign(Object.assign({}, e), { userWorkerId: x.dataValues.id, userClientId: y.dataValues.id, offerIdOffer: z.dataValues.idOffer });
            });
            let arrayReviewDb = arrayReview === null || arrayReview === void 0 ? void 0 : arrayReview.filter((c) => c);
            yield Review.bulkCreate(arrayReviewDb);
        }
    });
}
exports.setReview = setReview;
let profesiones = "Blogger,Marketing de afiliados,Freelancer,Asistente virtual,Redactor de contenidos o Copywriter,YouTuber,Clases en línea,Coach en línea,Consultor en línea,Representante de servicio al cliente,Programador,Traductor,Editor de video,Servicios de consultoría,Data Entry,Administración de E-Commerce,Voice acting,Corrección de textos y estilo,Fotografía de stock,Tester videojuegos,SEO,Diseño gráfico,Diseño web,UX Design,UX Researcher,Diseño de producto,Website testing,QA Tester,Community Manager,Agente de viajes,Venta de dibujos,Venta de artesanías,Servicios de animación,Teleoperador,Cuidador de mascotas,Realizar encuestas,Creación de podcasts,Trading,Venta de libros,Servicios de reclutamiento y selección,Técnico informático,Gestión de canal de YouTube,Anfitrión de Airbnb,Growth Hacking,Digital Project Management,Coordinación de eventos,Servicios de contabilidad,Preparación de impuestos,Estilista,Producción musical,Guía local,Nutricionista";
let arrayProfesiones = profesiones.split(",").sort();
const randomProfession = () => arrayProfesiones[Math.floor(Math.random() * arrayProfesiones.length)];
let skills = "Presentación de datos,Manejo de bases de datos,Diagnóstico,Investigación,Interpretación de datos y métricas,Gestión de bases de datos,HTML,CSS,JavaScript,Typescript,C#,Java,C++,Plataformas CRM,Investigación,Creación de prototipos,Desarrollo de flujos de trabajo,Correos electrónicos,Paquete de Microsoft,Google Drive,Redes sociales,Atención a los detalles,Personalización de la interacción,Conocimiento de prod. y serv.,Investigación,Manejo de datos,Comunicación visual,Análisis de datos,Investigación,Diseño gráfico,Negociación,Finanzas,Conocimiento empresariales,Contratación,Logística,Seguimiento de rendimiento,Manejo de presupuesto,Modelado financiero,Manejo de software,Gestión de SCRUM,SEO,SEM,Redacción,Herramientas de Google Analytics,Search Console,Tag Manager,Email marketing,Gestión de embudos,Redes sociales,PPC,Redacción básica,Storytelling,Edición,Periodismo,Copywriting,Escritura académica,Visualización de datos,Photoshop,Illustrator,InDesign,UX research,Sketching,Data visualization,Curiosidad,Trabajo en equipo,Comunicación,Empatía,Manejo del tiempo,Lenguajes de programación,Paradigmas de programación,Bilingüe,Comunicación efectiva,Pensamiento crítico,Capacidad de negociación,Manejo del tiempo,Dominio del inglés,Inteligencia emocional,Colaboración,Positivismo,Conocimiento del mercado,Capacidad de organización";
let arraySkills = skills.split(",").sort();
const randomSkills = () => arraySkills[Math.floor(Math.random() * arraySkills.length)];
