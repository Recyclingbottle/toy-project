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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'user_id'
        }
    },
    project_title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    post_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    post_datetime: {
        type: DataTypes.DATE,
        allowNull: false
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
        type: DataTypes.ENUM('모집중', '모집완료'),
        allowNull: false
    },
    project_start_date: {
        type: DataTypes.DATE
    },
    project_end_date: {
        type: DataTypes.DATE
    },
    project_image: {
        type: DataTypes.STRING(255)
    },
    team_size: {
        type: DataTypes.INTEGER
    },
    current_member_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'post',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = Post;
