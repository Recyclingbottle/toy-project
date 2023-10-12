const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Post = require('./post');
const UserInfo = require('./user_info');

const QnA = sequelize.define('qna', {
    question_id: {
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
    question_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    question_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    answer_datetime: DataTypes.DATE,
    answer_content: DataTypes.TEXT,
    answerer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserInfo,
            key: 'user_id'
        }
    }
}, {
    tableName: 'qna',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = QnA;
