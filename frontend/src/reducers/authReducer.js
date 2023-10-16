// reducers/authReducer.js
import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null, // 토큰 추가
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const { userData, token } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user: userData,
                token, // 토큰 저장
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
export default authReducer; 