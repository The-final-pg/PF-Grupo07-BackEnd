import { DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  sequelize.define("userClient", {
    name: {
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
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notification: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    idClient: {
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
      defaultValue: true,
    },
    isWorker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
