"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("userClient", {
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
<<<<<<< HEAD
=======
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
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
<<<<<<< HEAD
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
=======
            type: sequelize_1.DataTypes.TEXT,
            defaultValue: 'https://i.pinimg.com/564x/b2/04/25/b20425da884ef2173895d2f334a44147.jpg',
        },
        rating: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true,
            validate: {
                max: 5,
                min: 1,
            },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        },
        notification: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
            allowNull: true,
        },
<<<<<<< HEAD
        idClient: {
=======
        id: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
<<<<<<< HEAD
            defaultValue: true,
=======
            defaultValue: false,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        },
        isWorker: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
<<<<<<< HEAD
=======
        premium: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        favorites: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
            defaultValue: [],
        },
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    });
};
