// actions/authActions.js

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (userData, token) => ({
    type: LOGIN_SUCCESS,
    payload: {
        userData,
        token, // 토큰 추가
    },
});
export const logout = () => ({
    type: LOGOUT
});
