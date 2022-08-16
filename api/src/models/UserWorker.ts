<<<<<<< HEAD
const { DataTypes } = require("sequelize");
=======
import { DataTypes } from "sequelize";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

module.exports = (sequelize: any) => {
  sequelize.define(
    "userWorker",
    {
<<<<<<< HEAD
      idWorker: {
=======
      id: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD
=======
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      user_mail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      born_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      rating: {
<<<<<<< HEAD
        type: DataTypes.INTEGER,
=======
        type: DataTypes.FLOAT,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        validate: {
          max: 5,
          min: 1,
        },
      },
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      photo: {
<<<<<<< HEAD
        type: DataTypes.STRING,
        allowNull: true,
=======
        type: DataTypes.TEXT,
        defaultValue: 'https://res.cloudinary.com/luis-tourn/image/upload/v1660523062/b20425da884ef2173895d2f334a44147_fz6xjf.jpg',
      },
      notification: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
<<<<<<< HEAD
=======
      counter_jobs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
<<<<<<< HEAD
        defaultValue: true,
=======
        defaultValue: false,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      },
      isWorker: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
<<<<<<< HEAD
    },
    {
      timestamps: false,
=======
      favorites: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    }
  );
};
