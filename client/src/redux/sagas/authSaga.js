import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS,LOGIN_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST } from '../types'

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
    console.log('loginuser들어옴?')
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


// LOGOUT

function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,

        })
    } catch(e) {
        yield put({
            type: LOGOUT_FAILURE,

        })
        console.log(e)
    }
}

// 로그인시 3개의 패턴이 유기적으로 작동함.
function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout)
}


// User Loading

const userLoadingAPI = (token) => {
    console.log('Loading왜 안대')
    console.log(token)
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if(token) {
        config.headers["x-auth-token"] = token
    }
    return axios.get('api/auth/user', config)
} 

function* userLoading(action) {
    console.log('userLoading 들어옴?')
    try {
        console.log('지닙하긴하냐')
        console.log(action,"userLoading action")
        const result = yield call(userLoadingAPI, action.payload)
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        })
    }
}


function* watchuserLoading() {
    console.log('watchuserLoading 들어오나')
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}



export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchuserLoading)
    ])
}