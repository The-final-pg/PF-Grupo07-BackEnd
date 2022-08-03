import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    sequelize.define('offer', {
        id: {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_duration_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        work_duration_time: {
            type: DataTypes.DATE
        },
        photo: {
            type: DataTypes.BLOB
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        state: {
            type: DataTypes.ENUM('active', 'cancelled', 'contract started', 'finalized', 'released payment'),
            defaultValue: 'active'
        }
    }, {
        timestamps: true,
        createdAt: 'post_date',
        updatedAt: false
    });
};
