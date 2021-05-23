import axios from 'axios'
import { all, put, takeEvery, fork, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS } from '../types'

// All Posts load

const loadPostAPI = () => {
    return axios.get("/api/post")
}

function* loadPosts() {
    try {
        const result = yield call(loadPostAPI)
        console.log(result, "loadPosts")
        yield put({
            type: POSTS_LOADING_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        yield put({
            type: POSTS_LOADING_FAILURE,
            payload: e,
        })
        yield push("/")
    }
}

function* watchloadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}

export default function* postSaga() {
    yield all([fork(watchloadPosts)]);
}  