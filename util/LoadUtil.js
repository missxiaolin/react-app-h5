import { isBoolean, isFunction } from "./index";
import { log } from "./AppUtil";

/**
 * 加载状态管理工具
 */

/**
 * 创建一个loading方法
 * @param changeLoadFn function(change) 进入loading则change为1, 取消loading则change为-1
 * @return {Function}
 */
export function createLoadingFn(changeLoadFn) {
    /**
     * 此方法可以接受promise对象或者一个方法, 自动设置state中指定属性(数字, 0为非加载状态, 大于0则代表是加载状态)
     * 在promise执行过程state +1
     * 在promise完成后将state -1
     * @params promise Promise|Function
     * @return 返回promise或function最终返回值
     */
    return async function (promise) {
        // 进入loading状态
        changeLoadFn.call(this, 1);
        let result;
        try {
            if (isFunction(promise)) {
                result = await promise();
            } else {
                result = await promise;
            }
        } catch (e) {
            log(e);
            // 取消loading状态
            changeLoadFn.call(this, -1);
            throw e;
        }
        // 取消loading状态
        changeLoadFn.call(this, -1);
        return result;
    }
}

/**
 * 创建组件内部的加载状态管理方法
 * @param field state中的名字  该属性应该为数字, 如果是空或布尔类型会在计算中置为0
 * @return {Function}
 */
export function createComLoadingFn(field) {
    return createLoadingFn(function (change) {
        // 修改组件state中指定属性
        this.setState(prevState => {
            let loading = prevState[field];
            // 如果不存在 或 类型是布尔型 则认为是初始值 0 用于刚开始就显示加载状态true的情况
            if (!loading || isBoolean(loading)) {
                loading = 0;
            }
            loading += change;
            let nextState = Object.assign({}, prevState);
            nextState[field] = loading;
            return nextState;
        });
    });
}



/**
 * 创建reducer中的加载状态管理方法
 * @param ExReducer render对象
 * @param fnName 设置loading状态方法名
 *                  要求对应的方法接收一个整数类型参数, 1为进入加载状态, -1为取消加载状态
 * @return {Function}
 */
export function createReducerLoadingFn(ExReducer, fnName) {
    return createLoadingFn(function (change) {
        ExReducer[fnName](change);
    });
}
