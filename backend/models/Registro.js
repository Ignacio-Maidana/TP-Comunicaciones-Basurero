module.exports = (sequelize, DataTypes) => {
    const Registro = sequelize.define('Registro', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        distancia: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        porcentaje: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        placaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'placas',
                key: 'id'
            }
        }
    }, {
        tableName: 'registros',
        timestamps: false
    });

    Registro.associate = (models) => {
        Registro.belongsTo(models.Placa, {
            foreignKey: 'placaId',
            as: 'placa'
        });
    };

    return Registro;
};