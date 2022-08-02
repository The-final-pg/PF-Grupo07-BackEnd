"use strict";
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('client', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bornDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        notification: {
            type: DataTypes.ARRAY(DataTypes.JSONB)
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    });
};
