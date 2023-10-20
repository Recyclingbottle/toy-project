-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS Cb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Cb;

-- 기존 테이블 제거
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS qna;
DROP TABLE IF EXISTS project_participation;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS profile_info;
DROP TABLE IF EXISTS user_info;

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
    profile_photo VARCHAR(255),       -- 프로필 사진의 저장 경로나 URL
    address TEXT,                     -- 주소
    phone_number VARCHAR(20),         -- 전화번호
    social_media_links TEXT,          -- JSON 형식의 소셜 미디어 링크 (예: {"facebook": "URL", "twitter": "URL"})
    about_me TEXT,                    -- 자기소개
    PRIMARY KEY(profile_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- post 테이블 생성
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


-- project_participation 테이블 생성
CREATE TABLE project_participation (
    application_id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL, --신청할 게시글 ID 
    user_id INT NOT NULL, --신청하는 유저 IDD 
    application_datetime DATETIME, --신청 시간
    organizer_reaction_datetime DATETIME, --반응 시간
    response_message TEXT, --반응 메세지 
    application_status ENUM('신청중', '수락', '거절'), --신청 현재 상태 
    PRIMARY KEY(application_id),
    FOREIGN KEY(post_id) REFERENCES post(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- qna 테이블 생성
CREATE TABLE qna (
    question_id INT NOT NULL AUTO_INCREMENT, --질문 고유 번호
    post_id INT NOT NULL, -- 질문 할 게시글 번호
    user_id INT NOT NULL, -- 질문한 사람의 유저 번호
    question_content TEXT, -- 어떤 질문인지 내용
    question_datetime DATETIME, --질문한 시간
    answer_datetime DATETIME, -- 답변한 시간
    answer_content TEXT, -- 답변 내용
    answerer_id INT, --답변한 사람의 유저 번호 
    PRIMARY KEY(question_id),
    FOREIGN KEY(post_id) REFERENCES post(post_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id),
    FOREIGN KEY(answerer_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- notification 테이블 생성
CREATE TABLE notification (
    notification_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,--알림을 받는 회원 번호 
    notification_type ENUM('질문요청', '답변알림', '프로젝트참가요청', '참가수락', '참가거절') NOT NULL, --알림 종류
    related_item_type ENUM('QnA', '프로젝트') NULL, -- 추가된 필드
    related_item_id INT NULL,
    notification_message TEXT NOT NULL,
    creation_datetime DATETIME NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY(notification_id),
    FOREIGN KEY(user_id) REFERENCES user_info(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



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
