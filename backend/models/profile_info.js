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
    },
    profile_photo: {      // 프로필 사진의 저장 경로나 URL
        type: DataTypes.STRING(255)
    },
    address: {            // 주소
        type: DataTypes.TEXT
    },
    phone_number: {       // 전화번호
        type: DataTypes.STRING(20)
    },
    social_media_links: { // JSON 형식의 소셜 미디어 링크
        type: DataTypes.TEXT
    },
    about_me: {           // 자기소개
        type: DataTypes.TEXT
    }
}, {
    tableName: 'profile_info',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = ProfileInfo;
