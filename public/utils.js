/**
 * formatTime 时间字符串的格式化处理
 * @param {*} template 
 */
function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
    let timeAry = this.match(/\d+/g)
    return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
        let time = timeAry[$1] || "00"
        return time.length < 2 ? "0" + time : time
    })
}

String.prototype.formatTime = formatTime

/**
 * queryURLParams 获取url地址问号后面的参数信息（可能也包括HASH值）
 */
function queryURLParams() {
    let obj = {}
    this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => obj[$1] = $2)
    this.replace(/#([^?=&#]+)/g, (...[, $1]) => obj['HASH'] = $1)
    return obj
}

String.prototype.queryURLParams = queryURLParams

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

/**
 * _each 遍历数组、类数组、对象每一项
 * @param {*} obj 
 * @param {*} callback 
 * @param {*} context 
 */
function _each(obj, callback, context = window) {
    let isLikeArray = _type.isArray(obj) || (('length' in obj) && _type.isNumeric(obj.length))
    typeof callback !== 'function' ? callback = Function.prototype : null

    if (isLikeArray) {
        let arr = [...obj]
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i],
                result = callback.call(context, item, i)

            if (result === false) break
            if (typeof result === 'undefined') continue
            arr[i] = result
        }
        return arr
    }

    // 对象的处理
    let opp = {
        ...obj
    }
    for (let key in opp) {
        if (!opp.hasOwnProperty(key)) break
        let value = opp[key],
            result = callback.call(context, value, key)
        
        if (result === false) break
        if (typeof result === 'undefined') continue
        opp[key] = result
        return opp
    }
}

/**
 * 函数的节流
 * @param {*} func 
 * @param {*} wait 
 */
function _throttle(func, wait) {
    let timer = null,
        result = null,
        previous = 0
    return function anonymous(...args) {
        let context = this,
            now = new Date,
            spanTime = wait - (now - previous)
        if (spanTime <= 0) {
            result = func.call(context, ...args)
            clearTimeout(timer)
            timer = null
            previous= now
        } else if(!timer) {
            timer = setTimeout(() => {
                result = func.call(context, ...args)
                timer = null
                previous = new Date
            }, spanTime)
        }
        return result
    }
}

/**
 * 函数防抖
 * @param {*} func 
 * @param {*} wait 
 */
function _debounce(func, wait) {
    let timer = null,
        result = null
    return function anonymous(...args) {
        let context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            result = func.call(context, ...args)
        }, wait)
        return result
    }
}

