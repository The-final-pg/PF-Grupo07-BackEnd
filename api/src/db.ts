require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });
const basename = path.basename(__filename);

const modelDefiners: any[] = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
  )
  .forEach((file: any) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { UserClient, Offer, Portfolio, Proposal, Review, UserWorker } =
  sequelize.models;

// Aca vendrian las relaciones

//Un cliente tiene muchas ofertas, una oferta pertenece a un cliente
UserClient.hasMany(Offer);
Offer.belongsTo(UserClient);

//Un cliente tiene muchas reviews, una review pertenece a un cliente
UserClient.hasMany(Review);
Review.belongsTo(UserClient);

//Un worker tiene muchas reviews, una review pertenece a un worker
UserWorker.hasMany(Review);
Review.belongsTo(UserWorker);

//Un worker tiene muchas proposal, una propuesta pertenece a un worker
UserWorker.hasMany(Proposal);
Proposal.belongsTo(UserWorker);

//Una offer tiene muchas proposal, una offer pertenece a una proposal
Offer.hasMany(Proposal);
Proposal.belongsTo(Offer);

//Una offer tiene muchas reviews, una review pertenece a una offer
Offer.hasMany(Review);
Review.belongsTo(Offer);

//Un worker tiene muchos protfolios, un portfolio pertenece a un worker
UserWorker.hasMany(Portfolio);
Portfolio.belongsTo(UserWorker);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
