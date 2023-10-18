// App.js
//2023-10-17
//메인 페이지에 게시글 등록 버튼, 게시판 등록하기, 수정, 삭제  
//post id 하나의 게시글 자세히 보는 페이지 + Q & A 
//Q&A 등록, 답변하기 
//참가 신청 & 반응하기
//참가 신청 - 알람에서 다이얼로그로 확인 -> 게시글 제목, 프로필, 메시지, 승인 or 거절
//알림 페이지 구현 - 알람 테이블 에서 얻어오기 알람 읽기 -> 자세히 보기, 삭제 기능 넣기 
//
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import MainPageComponent from './MainPageComponent';
import Profile from './ProfileComponent';
import RegisterProfile from './RegisterProfileComponent';
import EditProfile from './EditProfileComponent';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register_profile" element={<RegisterProfile />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/" element={isAuthenticated ? <MainPageComponent /> : <LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
