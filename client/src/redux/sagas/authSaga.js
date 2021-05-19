import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS,LOGIN_REQUEST,  } from '../types'

// Login

const loginUserAPI = (loginData) => {
    console.log(loginData, 'logindata')
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('api/auth', loginData, config)
} 

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

// 로그인 리퀘스트가 들어오면 loginUser 함수를 실행.
// 로그인시 3개의 패턴이 유기적으로 작동함.
function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser)
    ])
}