import { getObjAttrFun } from "./ObjUtil";
import { isFunction, isObject } from "./TypeUtil";
/**
 * 字符串
 */

/**
 * 字符串模板格式化工具 支持 ("您好,${a}", {a: "admin"}) => 您好，admin
 * @param str 模板字符串
 * @param obj 模板中需要的值会到该对象中找
 * @param matchRegx 匹配的正则表达式 默认/\$\{([^\}]*)\}/g
 * @returns {String}
 */
export function formatStr(str, obj, matchRegx = /\$\{([^\}]*)\}/g) {
    if (!str || !obj) {
        return str;
    }
    let tmps = str.match(matchRegx);
    if (!tmps) return str;
    tmps.forEach(item => {
        let attrName = item.substring(2, item.length - 1);
        let attrVal = getObjAttrFun(obj, attrName);
        if (isFunction(attrVal)) {
            attrVal = attrVal();
        }
        if (isObject(attrVal)) {
            str = str.replace(item, JSON.stringify(attrVal));
        } else {
            str = str.replace(item, attrVal);
        }
    });
    return str;
}
