const { DataTypes,UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{ timestamps: false }
    )
}