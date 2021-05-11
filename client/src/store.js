import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    // 부모에서부터 자식 즉 바로 아래로 상태전이
    // redux는 store에 모든 상태값을 저장해서 꺼내씀.
    // reducers에 상태값 관리원칙(?) 선언함
    composeEnhancer(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

export default store