const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserInfo = sequelize.define('user_info', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(255)
    },
    phone_number: {
        type: DataTypes.STRING(15)
    }
}, {
    tableName: 'user_info',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = UserInfo;
