import { DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  sequelize.define("userClient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
      type: DataTypes.TEXT,
      defaultValue: 'https://res.cloudinary.com/luis-tourn/image/upload/v1660523062/b20425da884ef2173895d2f334a44147_fz6xjf.jpg',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: 5,
        min: 1,
      },
    },
    notification: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
          allowNull:true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isWorker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
  });
};
