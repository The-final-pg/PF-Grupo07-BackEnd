const { DataTypes } = require("sequelize");

module.exports = (sequelize: any) => {
  sequelize.define(
    "userWorker",
    {
      idWorker: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      rating: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
        allowNull: true,

      },
      notification: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isWorker:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
