// backend/models/Placa.js
module.exports = (sequelize, DataTypes) => {
    const Placa = sequelize.define('Placa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'placas',
        timestamps: false
    });

    Placa.associate = (models) => {
        Placa.hasMany(models.Registro, {
            foreignKey: 'placaId',
            as: 'registros'
        });
    };

    return Placa;
};