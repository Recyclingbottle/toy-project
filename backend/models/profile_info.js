const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UserInfo = require('./user_info');

const ProfileInfo = sequelize.define('profile_info', {
    profile_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'user_id'
        }
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.ENUM('남성', '여성', '기타')
    },
    occupation: {
        type: DataTypes.STRING(255)
    },
    skill_set: {
        type: DataTypes.TEXT
    },
    experience: {
        type: DataTypes.TEXT
    },
    portfolio_link: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'profile_info',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = ProfileInfo;
