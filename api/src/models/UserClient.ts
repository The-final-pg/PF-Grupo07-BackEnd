import { DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  sequelize.define("userClient", {
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
<<<<<<< HEAD
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
=======
      type: DataTypes.TEXT,
      defaultValue: 'https://i.pinimg.com/564x/b2/04/25/b20425da884ef2173895d2f334a44147.jpg',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: 5,
        min: 1,
      },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    },
    notification: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
<<<<<<< HEAD
    idClient: {
=======
    id: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
      defaultValue: false,
    },
<<<<<<< HEAD
=======
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
  });
};
