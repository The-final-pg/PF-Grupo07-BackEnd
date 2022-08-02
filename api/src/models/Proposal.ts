const { DataTypes } = require('sequelize');
module.exports = (sequelize:any) => {
    sequelize.define('proposal', {
        remuneration: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        proposal_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        worked_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.ARRAY(DataTypes.ENUM("rejected", "accepted", "initiated", "finalized", "released payment")),
            allowNull: false,
        },
        photo: {
            type:DataTypes.BLOB,
            allowNull: true,
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        notification:{
            type:DataTypes.ARRAY(DataTypes.JSONB)
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }

    })
}