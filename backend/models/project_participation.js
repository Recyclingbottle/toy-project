const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UserInfo = require('./user_info');
const Post = require('./post');

const ProjectParticipation = sequelize.define('project_participation', {
    application_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'post_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'user_id'
        }
    },
    application_datetime: {
        type: DataTypes.DATE
    },
    organizer_reaction_datetime: {
        type: DataTypes.DATE
    },
    response_message: {
        type: DataTypes.TEXT
    },
    application_status: {
        type: DataTypes.ENUM('신청중', '수락', '거절')
    }
}, {
    tableName: 'project_participation',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = ProjectParticipation;
