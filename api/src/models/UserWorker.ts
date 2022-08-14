import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "userWorker",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
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
      profession: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      rating: {
        type: DataTypes.FLOAT,
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
        type: DataTypes.TEXT,
        defaultValue: 'https://i.pinimg.com/564x/b2/04/25/b20425da884ef2173895d2f334a44147.jpg',
      },
      notification: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      counter_jobs: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
        defaultValue: true,
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
    }
  );
};
