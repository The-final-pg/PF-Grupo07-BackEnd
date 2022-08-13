import server from "./src/app";
const { conn } = require("./src/db");
/* import {
  setData,
  setOffers,
  setProposals,
  setPortfolios,
  setReview,
} from "./data"; */
/* const setData =require('./data');
const setOffersAndProposals =require('./data'); */

const portRailway = process.env.PORT

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(portRailway || 3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    /* await setData();
    await setOffers();
    await setProposals();
    await setPortfolios();
    await setReview(); */
  });
});