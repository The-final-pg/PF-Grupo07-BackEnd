import { DataTypes } from 'sequelize';
module.exports = (sequelize:any) => {
    sequelize.define('userClient', {
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
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // photo: {
        //     type:DataTypes.BLOB,
        //     allowNull: true,
        // },
        rating:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        notification:{
            type:DataTypes.ARRAY(DataTypes.JSONB),
            allowNull:true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }

    })
}