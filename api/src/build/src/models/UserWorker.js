"use strict";
<<<<<<< HEAD
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("userWorker", {
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
        profession: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        rating: {
            type: DataTypes.INTEGER,
=======
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("userWorker", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
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
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        profession: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        },
        skills: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        },
        rating: {
            type: sequelize_1.DataTypes.FLOAT,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
            validate: {
                max: 5,
                min: 1,
            },
        },
        premium: {
<<<<<<< HEAD
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
        isWorker: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: false,
=======
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        photo: {
            type: sequelize_1.DataTypes.TEXT,
            defaultValue: 'https://res.cloudinary.com/luis-tourn/image/upload/v1660523062/b20425da884ef2173895d2f334a44147_fz6xjf.jpg',
        },
        notification: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
        },
        counter_jobs: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
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
            defaultValue: true,
        },
        favorites: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
            defaultValue: [],
        },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    });
};
