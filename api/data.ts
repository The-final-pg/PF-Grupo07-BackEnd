import axios from "axios";
const {
  UserClient,
  UserWorker,
  Offer,
  Proposal,
  Portfolio,
  Review,
} = require("./src/db");

export const setData = async () => {
  const users = await UserClient.findAll();
  if (!users.length) {
    const responseUsers = await axios.get(
      "https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Worker"
    );
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
    await UserWorker.create({
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
    })
    let arrayClientDb = await arrayClient?.filter((c) => c);
    await UserClient.bulkCreate(arrayClientDb);
    let arrayWorkerDb = await arrayWorker?.filter((c) => c);
    await UserWorker.bulkCreate(arrayWorkerDb);
    console.log("se cargo la data");
  }
};

export const setOffers = async () => {
  const offers = await Offer.findAll();
  if (!offers.length) {
    let clientsId = await UserClient.findAll();
    const responseOffers = await axios.get(
      "https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer"
    );
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
      return {
        ...e,
        userClientId: x.dataValues.id,
      };
    });
    let arrayOffersDb = await arrayOffers?.filter((c) => c);
    await Offer.bulkCreate(arrayOffersDb);
  }
};

export async function setProposals() {
  const proposals = await Proposal.findAll();
  if (!proposals.length) {
    let workersId = await UserWorker.findAll();
    let offersId = await Offer.findAll();
    const responseProposal = await axios.get(
      "https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Offer"
    );
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
      return {
        ...e,
        userWorkerId: x.dataValues.id,
        offerIdOffer: y.dataValues.idOffer,
      };
    });
    let arrayProposalDb = arrayProposal?.filter((c) => c);
    await Proposal.bulkCreate(arrayProposalDb);
  }
}

export async function setPortfolios() {
  const portfolios = await Portfolio.findAll();
  if (!portfolios.length) {
    let workersId = await UserWorker.findAll();
    const responsePortfolio = await axios.get(
      "https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Portfolio"
    );
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
      return {
        ...e,
        userWorkerId: x.dataValues.id,
      };
    });
    let arrayPortfolioDb = arrayPortfolio?.filter((c) => c);
    await Portfolio.bulkCreate(arrayPortfolioDb);
  }
}

export async function setReview() {
  const reviews = await Review.findAll();
  if (!reviews.length) {
    let workersId = await UserWorker.findAll();
    let clientsId = await UserClient.findAll();
    let offersId = await Offer.findAll();
    const responseReview = await axios.get(
      "https://62ec493c818ab252b6fa39a4.mockapi.io/api/v1/Review"
    );
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
      return {
        ...e,
        userWorkerId: x.dataValues.id,
        userClientId: y.dataValues.id,
        offerIdOffer: z.dataValues.idOffer,
      };
    });
    let arrayReviewDb = arrayReview?.filter((c) => c);
    await Review.bulkCreate(arrayReviewDb);
  }
}

let profesiones: string = "Blogger,Marketing de afiliados,Freelancer,Asistente virtual,Redactor de contenidos o Copywriter,YouTuber,Clases en l??nea,Coach en l??nea,Consultor en l??nea,Representante de servicio al cliente,Programador,Traductor,Editor de video,Servicios de consultor??a,Data Entry,Administraci??n de E-Commerce,Voice acting,Correcci??n de textos y estilo,Fotograf??a de stock,Tester videojuegos,SEO,Dise??o gr??fico,Dise??o web,UX Design,UX Researcher,Dise??o de producto,Website testing,QA Tester,Community Manager,Agente de viajes,Venta de dibujos,Venta de artesan??as,Servicios de animaci??n,Teleoperador,Cuidador de mascotas,Realizar encuestas,Creaci??n de podcasts,Trading,Venta de libros,Servicios de reclutamiento y selecci??n,T??cnico inform??tico,Gesti??n de canal de YouTube,Anfitri??n de Airbnb,Growth Hacking,Digital Project Management,Coordinaci??n de eventos,Servicios de contabilidad,Preparaci??n de impuestos,Estilista,Producci??n musical,Gu??a local,Nutricionista"

let arrayProfesiones: string[]= profesiones.split(",").sort();

const randomProfession = () => arrayProfesiones[Math.floor(Math.random() * arrayProfesiones.length)]


let skills:string = "Presentaci??n de datos,Manejo de bases de datos,Diagn??stico,Investigaci??n,Interpretaci??n de datos y m??tricas,Gesti??n de bases de datos,HTML,CSS,JavaScript,Typescript,C#,Java,C++,Plataformas CRM,Investigaci??n,Creaci??n de prototipos,Desarrollo de flujos de trabajo,Correos electr??nicos,Paquete de Microsoft,Google Drive,Atenci??n a los detalles,Personalizaci??n de la interacci??n,Conocimiento de prod. y serv.,Investigaci??n,Manejo de datos,Comunicaci??n visual,An??lisis de datos,Investigaci??n,Negociaci??n,Finanzas,Conocimiento empresariales,Contrataci??n,Log??stica,Seguimiento de rendimiento,Manejo de presupuesto,Modelado financiero,Manejo de software,Gesti??n de SCRUM,SEO,SEM,Redacci??n,Herramientas de Google Analytics,Search Console,Tag Manager,Email marketing,Gesti??n de embudos,Redes sociales,PPC,Redacci??n b??sica,Storytelling,Edici??n,Periodismo,Copywriting,Escritura acad??mica,Visualizaci??n de datos,Photoshop,Illustrator,InDesign,UX research,Sketching,Data visualization,Curiosidad,Trabajo en equipo,Comunicaci??n,Empat??a,Manejo del tiempo,Lenguajes de programaci??n,Paradigmas de programaci??n,Biling??e,Comunicaci??n efectiva,Pensamiento cr??tico,Capacidad de negociaci??n,Manejo del tiempo,Dominio del ingl??s,Inteligencia emocional,Colaboraci??n,Positivismo,Conocimiento del mercado,Capacidad de organizaci??n";

let arraySkills: string[]= skills.split(",").sort();

const randomSkills = () => arraySkills[Math.floor(Math.random() * arraySkills.length)]
