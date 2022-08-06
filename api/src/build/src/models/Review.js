"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("review", {
        valoration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        review_description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        idReview: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
};
