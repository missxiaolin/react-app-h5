import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise))
// const dispatchOrigin = store.dispatch
// store.dispatch = function(action) {
//     console.log('派发开始')
//     console.log(action)
//     console.log('派发结束')
// }

export default store

/**
 * 中间件；介于dispatch派发和reducer执行中间做的一些事情
 *  重构dispatch
 *  applyMiddleware 使用中间件
 *  redux-logger 输出派发日志
 *  redux-thunk 处理派发中的异步请求
 *  redux-promise 处理派发中的异步请求
 */