import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//发送异步请求
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducers'
import {IS_DEV} from '../config'


export default createStore(
    reducer,
    IS_DEV? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)