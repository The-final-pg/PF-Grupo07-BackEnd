import { DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  sequelize.define("portfolio", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
<<<<<<< HEAD
      type: DataTypes.STRING,
=======
      type: DataTypes.TEXT,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      allowNull: false,
    },
    portfolio_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idPortfolio: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
