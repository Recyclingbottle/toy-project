import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        auth: authReducer
        // 다른 리듀서들도 추가할 곳입니다
    },
    // middleware와 다른 환경 설정도 추가 가능하다
});

export default store;
