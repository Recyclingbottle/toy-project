// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import MainPageComponent from './MainPageComponent';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/" element={isAuthenticated ? <MainPageComponent /> : <LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
