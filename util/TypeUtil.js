/**
 * 是否是方法
 * @param obj
 * @returns {boolean}
 */
export const isFunction = (obj) => {
    return typeof (obj) === "function";
}

/**
 * 是否是字符串
 * @param obj
 * @returns {boolean}
 */
export const isString = (obj) => {
    return typeof (obj) === "string";
}

/**
 * 是否是Boolean
 * @param obj
 * @returns {boolean}
 */
export const isBoolean = (obj) => {
    return typeof (obj) === "boolean";
}

export const isNumber = (obj) => {
    return typeof (obj) === "number";
}

/**
 * 是否是数组
 * @param obj
 * @returns {boolean}
 */
export const isArray = (obj) => {
    return obj instanceof Array;
}

export const isObject = (obj) => {
    return typeof (obj) === "object";
}

/**
 * 对象是否为空
 * @param obj
 * @returns {boolean}
 */
export const isBlank = (obj) => {
    return obj === null || obj === undefined || obj === "";
}

/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObj = (obj) => {
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
}

