import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS,LOGIN_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, CLEAR_ERROR_REQUEST, CLEAR_ERROR_FAILURE, CLEAR_ERROR_SUCCESS, PASSWORD_EDIT_UPLOADING_SUCCESS, PASSWORD_EDIT_UPLOADING_FAILURE, PASSWORD_EDIT_UPLOADING_REQUEST } from '../types'

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


// REGISTER

const registerUserAPI = (req) => {
    console.log(req, 'req')
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('api/user', req, config)
} 

function* registerUser(action) {
    console.log('registerUser들어옴?')
    try {
        const result = yield call(registerUserAPI, action.payload)
        console.log(result, "REGISTER DATA")
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

// 로그인 리퀘스트가 들어오면 registerUser 함수를 실행.
// 로그인시 3개의 패턴이 유기적으로 작동함.
function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser)
}

// clear Err

function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    } catch(e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        })
    }
}

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
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
    console.log(token);
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    console.log('이거임 ??')
    return axios.get("api/auth/user", config);
  };

function* userLoading(action) {
    console.log('userLoading 들어옴?')
    try {
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
    console.log('watchuserLoading')
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
    console.log('yield 컨트롤 함수 이후')
}

// Edit Password

const EditPasswordAPI = (payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const token = payload.token;
  
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
  };
  
  function* EditPassword(action) {
    try {
      console.log(action, "EditPassword");
      const result = yield call(EditPasswordAPI, action.payload);
      yield put({
        type: PASSWORD_EDIT_UPLOADING_SUCCESS,
        payload: result.data,
      });
    } catch (e) {
      console.log(e, "error Editpassword임");
      yield put({
        type: PASSWORD_EDIT_UPLOADING_FAILURE,
        payload: e.response.data,
      });
    }
  }
  
  function* watchEditPassword() {
    yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
  }

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchregisterUser),
        fork(watchclearError),
        fork(watchuserLoading),
        fork(watchEditPassword),
    ])
}