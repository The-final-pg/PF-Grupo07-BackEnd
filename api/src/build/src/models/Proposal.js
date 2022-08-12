"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("proposal", {
        remuneration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        proposal_description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        worked_time: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        state: {
            type: sequelize_1.DataTypes.ENUM("posted", "rejected", "accepted", "contract started", "finalized", "released payment"),
            defaultValue: "posted",
        },
        idProposal: {
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
