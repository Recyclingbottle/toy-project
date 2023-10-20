import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import ProjectModal from './ProjectModal';
import '../styles/Notification.css'
function NotificationComponent() {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null); // State to store selected notification
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null); // 선택된 프로젝트의 ID


    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notification`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.status === 200) {
                    setNotifications(data);
                } else {
                    alert('알림을 가져오는 중 오류가 발생했습니다.');
                    navigate(-1);
                }
            } catch (error) {
                alert('알림을 가져오는 중 오류가 발생했습니다.');
                navigate(-1);
            }
        };

        fetchNotificationData();
    }, [token, navigate]);

    const handleDeleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`http://localhost:5000/notification/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setNotifications(notifications.filter(notification => notification.notification_id !== notificationId));
            } else {
                alert('알림을 삭제하는 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('알림을 삭제하는 중 오류가 발생했습니다.');
        }
    };

    const handleViewNotification = (notification) => {
        setSelectedNotification(notification);
    
        if (notification.notification_type === '답변알림' || notification.notification_type === '질문요청') {
            navigate(`/post/${notification.related_item_id}`);
        } else if (notification.notification_type === '프로젝트참가요청') {
            setSelectedProjectId(notification.related_item_id);
            setIsModalOpen(true);
        } else if (notification.notification_type === '참가수락' || notification.notification_type === '참가거절') {
            alert('TEST'); 
        }
    };
    
    const handleCloseModal = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };
    return (
        <div className="notification-container">
            <Navbar />
            <HeaderComponent />
            <h1 id="notification-title">알림 페이지</h1>
            <ul className="notification-list">
                {notifications.map(notification => (
                    <li key={notification.notification_id} className="notification-item">
                        <strong className="notification-message-label">메시지:</strong> <span className="notification-message">{notification.notification_message}</span><br />
                        <strong className="notification-type-label">유형:</strong> <span className="notification-type">{notification.notification_type}</span><br />
                        <button className="notification-view-btn" onClick={() => handleViewNotification(notification)}>확인</button>
                        <button className="notification-delete-btn" onClick={() => handleDeleteNotification(notification.notification_id)}>삭제</button>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <ProjectModal projectId={selectedProjectId} onClose={handleCloseModal} />
            )}
        </div>
    );

}

export default NotificationComponent;
