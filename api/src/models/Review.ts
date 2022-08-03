import { DataTypes } from 'sequelize';
module.exports = (sequelize:any) => {
    sequelize.define('review', {
        valoration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idReview: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    })
}
