import { DataTypes } from 'sequelize';
module.exports = (sequelize:any) => {
    sequelize.define('portfolio', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idPortfolio: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }

    })
}