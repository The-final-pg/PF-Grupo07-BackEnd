"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('offer', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        remuneration: {
            type: sequelize_1.DataTypes.ARRAY,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        post_duration_time: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        work_duration_time: {
            type: sequelize_1.DataTypes.DATE
        },
        photo: {
            type: sequelize_1.DataTypes.BLOB
        },
        tags: {
            type: sequelize_1.DataTypes.ARRAY
        },
        state: {
            type: sequelize_1.DataTypes.ENUM('active', 'cancelled', 'contract started', 'contrato', 'finalized', 'paymentReleased'),
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: 'post_date'
    });
};
