module.exports = (sequelize, DataTypes) => {
    const attributes = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        district: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        complement: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zip_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        patients_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    };
    const config = {
        underscored: true,
        timestamps: false
    }

    const Address = sequelize.define('tb_addresses', attributes, config);

    Address.associate = models => {
        Address.belongsTo(models.Patients, { foreignKey: 'patients_id' });
    };


    return Address;
};
