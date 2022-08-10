"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("userWorker", {
        idWorker: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
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
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1,
            },
        },
        premium: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        photo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        notification: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isWorker: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: false,
    });
};
