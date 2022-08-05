import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    sequelize.define('offer', {
        idOffer: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remuneration: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        offer_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_duration_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        work_duration_time: {
            type: DataTypes.INTEGER
        },
        photo: {
            type: DataTypes.STRING
        },
        profession: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        state: {
            type: DataTypes.ENUM('active', 'cancelled', 'contract started', 'finalized', 'released payment'),
            defaultValue: 'active'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        createdAt: 'post_date',
        updatedAt: false
    });
};
