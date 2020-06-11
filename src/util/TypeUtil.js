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


/**
 * 判断数据类型
 */
let _type = (function() {
    let _obj = {
        isNumeric: 'Number',
        isBoolean: 'Boolean',
        isString: 'String',
        isNull: 'Null',
        isUndefined: 'Undefined',
        isSymbol: 'Symbol',
        isPlainObject: 'Object',
        isArray: 'Array',
        isRegExp: 'RegExp',
        isDate: 'Date',
        isfunction: 'Function',
        isWindow: 'Window'
    }

    var _type = {},
        _toString = _type.toString
    
    for (var key in _obj) {
        if (!_obj.hasOwnProperty(key)) break
        _type[key] = (function() {
            var reg = new RegExp("^\\[object " + _obj[key] + "\\]$")
            return function anonymous(val) {
                return reg.test(_toString.call(val))
            }
        })()
    }

    return _type
})()

