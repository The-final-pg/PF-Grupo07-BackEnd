"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("userClient", {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        user_mail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        born_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: sequelize_1.DataTypes.TEXT,
            defaultValue: "https://res.cloudinary.com/luis-tourn/image/upload/v1660523062/b20425da884ef2173895d2f334a44147_fz6xjf.jpg",
        },
        rating: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true,
            validate: {
                max: 5,
                min: 1,
            },
        },
        notification: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
            allowNull: true,
        },
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        googleId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isWorker: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        premium: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        favorites: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
            defaultValue: [],
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    });
};
