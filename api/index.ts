import server from "./src/app";
const { conn } = require("./src/db");
import {
  setData,
  setOffers,
  setProposals,
  setPortfolios,
  setReview,
} from "./data";
import { cleanDataBase } from './src/services/cleanDataBase'




// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log(`%s listening at 3001`); // eslint-disable-line no-console
    await setData();
    await setOffers();
    await setProposals();
    await setPortfolios();
    await setReview();
    cleanDataBase();
  });
});
