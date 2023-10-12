const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UserInfo = require('./user_info');

const Post = sequelize.define('post', {
    post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    project_title: {
        type: DataTypes.STRING(255)
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'user_id'
        }
    },
    post_content: {
        type: DataTypes.TEXT
    },
    post_datetime: {
        type: DataTypes.DATE
    },
    required_skills: {
        type: DataTypes.STRING(255)
    },
    project_location: {
        type: DataTypes.STRING(255)
    },
    project_field: {
        type: DataTypes.STRING(255)
    },
    project_status: {
        type: DataTypes.ENUM('모집중', '모집완료')
    }
}, {
    tableName: 'post',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = Post;
