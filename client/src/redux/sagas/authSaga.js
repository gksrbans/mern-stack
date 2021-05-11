import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { LOGIN_FAILURE } from '../types'

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
            
        })
    } catch(e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}