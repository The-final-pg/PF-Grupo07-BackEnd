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
        profession: [randomProfession, randomProfession, randomProfession],
        skills: e.Worker.skills,
        rating: ((e.Worker.rating - 1) % 5) + 1,
        photo: e.Worker.photo,
        notification: e.Worker.notification,
        isActive: true,
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
      });
    });
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
        profession: [randomProfession, randomProfession, randomProfession],
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
    let arrayProposalDb = await arrayProposal?.filter((c) => c);
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
    let arrayPortfolioDb = await arrayPortfolio?.filter((c) => c);
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
    let arrayReviewDb = await arrayReview?.filter((c) => c);
    await Review.bulkCreate(arrayReviewDb);
  }
}

let profesiones: string = "Blogger,Marketing de afiliados,Freelancer,Asistente virtual,Redactor de contenidos o Copywriter,YouTuber,Clases en línea,Coach en línea,Consultor en línea,Representante de servicio al cliente,Programador,Traductor,Editor de video,Servicios de consultoría,Data Entry,Administración de E-Commerce,Voice acting,Corrección de textos y estilo,Fotografía de stock,Tester videojuegos,SEO,Diseño gráfico,Diseño web,UX Design,UX Researcher,Diseño de producto,Website testing,QA Tester,Community Manager,Agente de viajes,Venta de dibujos,Venta de artesanías,Servicios de animación,Teleoperador,Cuidador de mascotas,Realizar encuestas,Creación de podcasts,Trading,Venta de libros,Servicios de reclutamiento y selección,Técnico informático,Gestión de canal de YouTube,Anfitrión de Airbnb,Growth Hacking,Digital Project Management,Coordinación de eventos,Servicios de contabilidad,Trabajos de preparación de impuestos para autónomos,Estilista,Producción musical,Guía local,Nutricionista"

let arrayProfesiones: string[]= profesiones.split(",");
const randomProfession: string= arrayProfesiones[Math.floor(Math.random() * arrayProfesiones.length)];
