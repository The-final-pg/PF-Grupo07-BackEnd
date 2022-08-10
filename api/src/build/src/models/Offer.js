"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("offer", {
        idOffer: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        max_remuneration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        min_remuneration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        offer_description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        post_duration_time: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        work_duration_time: {
            type: sequelize_1.DataTypes.STRING,
        },
        photo: {
            type: sequelize_1.DataTypes.TEXT,
        },
        profession: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        },
        state: {
            type: sequelize_1.DataTypes.ENUM("active", "cancelled", "contract started", "finalized", "released payment"),
            defaultValue: "active",
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        createdAt: "post_date",
        updatedAt: false,
    });
};
