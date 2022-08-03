import { DataTypes } from 'sequelize';
module.exports = (sequelize:any) => {
    sequelize.define('proposal', {
        remuneration: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.ENUM("posted","rejected", "accepted", "initiated", "finalized", "released payment"),
            allowNull: false,
            defaultValue:"posted"
        },
        idProposal: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }

    })
}
