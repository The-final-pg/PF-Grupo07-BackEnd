"use strict";
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('worker', {
        id: {
            type: DataTypes.UUID,
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
        tags: {
            type: DataTypes.ARRAY,
        },
        skills: {
            type: DataTypes.ARRAY,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1
            }
        },
        premium: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: false
    });
};
