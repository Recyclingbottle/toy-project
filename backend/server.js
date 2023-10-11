// 1. 필요한 모듈 불러오기
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// 2. 앱 초기화
const app = express();
const PORT = 5000;

// 3. 미들웨어 설정

// 요청 본문을 파싱하기 위한 body-parser 설정. req.body 속성 아래에서 사용 가능.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 모든 라우트에 대해 CORS (Cross-Origin Resource Sharing) 활성화. 다른 출처에서 프론트엔드와 백엔드를 연결할 때 유용.
app.use(cors());

// 4. 샘플 라우트
app.get('/', (req, res) => {
    res.send('Express에서의 환영 메시지!');
});

// 5. Sequelize를 사용한 데이터베이스 연결 설정
const sequelize = new Sequelize('your_database_name', 'your_mysql_username', 'your_mysql_password', {
    host: 'localhost',
    dialect: 'mysql'
});

// 데이터베이스 연결 테스트
sequelize.authenticate()
    .then(() => {
        console.log('데이터베이스 연결이 성공적으로 이루어졌습니다.');
    })
    .catch(error => {
        console.error('데이터베이스 연결에 실패했습니다:', error);
    });

// 6. 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
