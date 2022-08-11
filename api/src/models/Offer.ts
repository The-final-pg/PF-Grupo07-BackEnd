import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "offer",
    {
      idOffer: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_remuneration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_remuneration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      offer_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_duration_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      work_duration_time: {
        type: DataTypes.ENUM(
          "Menos de 1 mes",
          "1 a 3 meses",
          "4 a 6 meses",
          "Más de 6 meses",
        ),
      },
      photo: {
        type: DataTypes.TEXT,
      },
      profession: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      state: {
        type: DataTypes.ENUM(
          "active",
          "cancelled",
          "contract started",
          "finalized",
          "released payment"
        ),
        defaultValue: "active",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      createdAt: "post_date",
      updatedAt: false,
    }
  );
};
