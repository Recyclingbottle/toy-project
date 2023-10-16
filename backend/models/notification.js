const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UserInfo = require('./user_info');

const Notification = sequelize.define('notification', {
    notification_id: {
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
    notification_type: {
        type: DataTypes.ENUM('질문요청', '답변알림', '프로젝트참가요청', '참가수락', '참가거절'),
        allowNull: false
    },
    related_item_type: {  // 추가된 필드
        type: DataTypes.ENUM('QnA', '프로젝트'),
        allowNull: true
    },
    related_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    notification_message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    creation_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'notification',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = Notification;
