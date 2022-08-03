"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('portfolio', {
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        idPortfolio: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    });
};
