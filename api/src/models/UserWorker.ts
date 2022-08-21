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
      googleId: {
        type: DataTypes.STRING,
            allowNull:true
      },
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
        defaultValue: 'https://res.cloudinary.com/luis-tourn/image/upload/v1660523062/b20425da884ef2173895d2f334a44147_fz6xjf.jpg',
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
