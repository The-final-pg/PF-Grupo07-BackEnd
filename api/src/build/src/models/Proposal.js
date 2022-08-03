"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('proposal', {
        remuneration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        proposal_description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        worked_time: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM("rejected", "accepted", "initiated", "finalized", "released payment")),
            allowNull: false,
        },
        idProp: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    });
};
