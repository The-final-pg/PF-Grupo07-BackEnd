import { DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  sequelize.define("proposal", {
    remuneration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proposal_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    worked_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM(
        "posted",
        "rejected",
        "accepted",
        "contract started",
        "finalized",
        "released payment"
      ),
      defaultValue: "posted",
    },
    idProposal: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
