import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './NavbarComponent';
import HeaderComponent from './HeaderComponent';

function NotificationComponent() {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const [notifications, setNotifications] = useState([]);

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
                    setNotifications(data); // 알림 데이터를 상태에 저장
                } else {
                    alert('알림을 가져오는 중 오류가 발생했습니다.');
                    navigate(-1); // 이전 페이지로 이동
                }
            } catch (error) {
                alert('알림을 가져오는 중 오류가 발생했습니다.');
                navigate(-1); // 이전 페이지로 이동
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
                // 알림 삭제가 성공하면 화면에서도 해당 알림을 삭제
                setNotifications(notifications.filter(notification => notification.notification_id !== notificationId));
                // 알림 삭제 후 알림 페이지로 리다이렉트
                navigate('/notification');
            } else {
                alert('알림을 삭제하는 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('알림을 삭제하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <Navbar />
            <HeaderComponent />
            <h1>알림 페이지</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.notification_id}>
                        <strong>메시지:</strong> {notification.notification_message}<br />
                        <strong>유형:</strong> {notification.notification_type}<br />
                        <button onClick={() => handleDeleteNotification(notification.notification_id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationComponent;
