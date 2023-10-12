-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS Cb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Cb;

-- user_info 테이블 생성
CREATE TABLE user_info (
    user_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    phone_number VARCHAR(15),
    PRIMARY KEY(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- profile_info 테이블 생성
CREATE TABLE profile_info (
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    age INT,
    gender ENUM('남성', '여성', '기타'),
    occupation VARCHAR(255),
    skill_set TEXT,
    experience TEXT,
    portfolio_link VARCHAR(255),
    PRIMARY KEY(profile_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- post 테이블 생성
CREATE TABLE post (
    post_id INT NOT NULL AUTO_INCREMENT,
    project_title VARCHAR(255),
    user_id INT NOT NULL,
    post_content TEXT,
    post_datetime DATETIME,
    required_skills VARCHAR(255),
    project_location VARCHAR(255),
    project_field VARCHAR(255),
    project_status ENUM('모집중', '모집완료'),
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- project_participation 테이블 생성
CREATE TABLE project_participation (
    application_id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    application_datetime DATETIME,
    organizer_reaction_datetime DATETIME,
    response_message TEXT,
    application_status ENUM('신청중', '수락', '거절'),
    PRIMARY KEY(application_id),
    FOREIGN KEY(post_id) REFERENCES post(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- qna 테이블 생성
CREATE TABLE qna (
    question_id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    question_content TEXT,
    question_datetime DATETIME,
    answer_datetime DATETIME,
    answer_content TEXT,
    answerer_id INT,
    PRIMARY KEY(question_id),
    FOREIGN KEY(post_id) REFERENCES post(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id),
    FOREIGN KEY(answerer_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- notification 테이블 생성
CREATE TABLE notification (
    notification_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_type ENUM('질문요청', '답변알림', '프로젝트참가요청', '참가수락', '참가거절'),
    related_item_id INT,
    notification_message TEXT,
    creation_datetime DATETIME,
    is_read BOOLEAN,
    PRIMARY KEY(notification_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- user_info 테이블에 예시 데이터 추가
INSERT INTO user_info (email, password, full_name, nickname, phone_number)
VALUES ('user@example.com', 'password123', '홍길동', '길동이', '010-1234-5678');

-- profile_info 테이블에 예시 데이터 추가
INSERT INTO profile_info (user_id, age, gender, occupation, skill_set, experience, portfolio_link)
VALUES (1, 28, '남성', '개발자', 'Python, JavaScript', '3년 간의 개발 경험', 'http://portfolio.example.com');

-- post 테이블에 예시 데이터 추가
INSERT INTO post (project_title, user_id, post_content, post_datetime, required_skills, project_location, project_field, project_status)
VALUES ('새 프로젝트', 1, '이것은 새 프로젝트에 대한 게시글입니다.', NOW(), 'Python', '서울', '웹개발', '모집중');

-- project_participation 테이블에 예시 데이터 추가
INSERT INTO project_participation (post_id, user_id, application_datetime, application_status)
VALUES (1, 1, NOW(), '신청중');

-- qna 테이블에 예시 데이터 추가
INSERT INTO qna (post_id, user_id, question_content, question_datetime)
VALUES (1, 1, '이 프로젝트에 관심이 있습니다. 참여할 수 있나요?', NOW());

-- notification 테이블에 예시 데이터 추가
INSERT INTO notification (user_id, notification_type, related_item_id, notification_message, creation_datetime, is_read)
VALUES (1, '질문요청', 1, '새로운 질문이 도착했습니다.', NOW(), FALSE);

-- user_info 테이블에서 데이터 확인
SELECT * FROM user_info;

-- profile_info 테이블에서 데이터 확인
SELECT * FROM profile_info;

-- post 테이블에서 데이터 확인
SELECT * FROM post;

-- project_participation 테이블에서 데이터 확인
SELECT * FROM project_participation;

-- qna 테이블에서 데이터 확인
SELECT * FROM qna;

-- notification 테이블에서 데이터 확인
SELECT * FROM notification;
