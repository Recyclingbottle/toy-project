// actions/authActions.js

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (userData, token) => {
    // 로컬 스토리지에 토큰을 저장합니다 
    localStorage.setItem('token', token);

    return {
        type: LOGIN_SUCCESS,
        payload: {
            userData,
            token,
        },
    };
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: LOGOUT,
    };
};
