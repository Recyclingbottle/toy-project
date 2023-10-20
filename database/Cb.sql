-- 데이터베이스 생성 및 설정
CREATE DATABASE IF NOT EXISTS Cb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Cb;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS qna;
DROP TABLE IF EXISTS project_participation;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS profile_info;
DROP TABLE IF EXISTS user_info;

-- 사용자 정보 테이블 생성
CREATE TABLE user_info (
    user_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    phone_number VARCHAR(15),
    PRIMARY KEY(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 사용자 프로필 정보 테이블 생성
CREATE TABLE profile_info (
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    age INT,
    gender ENUM('남성', '여성', '기타'),
    occupation VARCHAR(255),
    skill_set TEXT,
    experience TEXT,
    portfolio_link VARCHAR(255),
    profile_photo VARCHAR(255),
    address TEXT,
    phone_number VARCHAR(20),
    social_media_links TEXT,
    about_me TEXT,
    PRIMARY KEY(profile_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 게시글 테이블 생성
CREATE TABLE post (
    post_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    post_content TEXT NOT NULL,
    post_datetime DATETIME NOT NULL,
    required_skills VARCHAR(255),
    project_location VARCHAR(255),
    project_field VARCHAR(255),
    project_status ENUM('모집중', '모집완료') NOT NULL,
    project_start_date DATE,
    project_end_date DATE,
    project_image VARCHAR(255),
    team_size INT,
    current_member_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    likes INT DEFAULT 0,
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 프로젝트 참여 신청 테이블 생성
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

-- Q&A 테이블 생성
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

-- 알림 테이블 생성
CREATE TABLE notification (
    notification_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_type ENUM('질문요청', '답변알림', '프로젝트참가요청', '참가수락', '참가거절') NOT NULL,
    related_item_type ENUM('QnA', '프로젝트') NULL,
    related_item_id INT NULL,
    notification_message TEXT NOT NULL,
    creation_datetime DATETIME NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY(notification_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- user_info 테이블의 데이터 조회
SELECT * FROM user_info;

-- profile_info 테이블의 데이터 조회
SELECT * FROM profile_info;

-- post 테이블의 데이터 조회
SELECT * FROM post;

-- project_participation 테이블의 데이터 조회
SELECT * FROM project_participation;

-- qna 테이블의 데이터 조회
SELECT * FROM qna;

-- notification 테이블의 데이터 조회
SELECT * FROM notification;
